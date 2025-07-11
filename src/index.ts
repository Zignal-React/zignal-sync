import { useEffect, useRef } from 'react';
import type { ZignalStore } from '@zignal/core';

export type SyncStrategy = 'broadcast' | 'storage';

let syncId = 0;

export function syncZignal<T>(
	zignal: { store: ZignalStore<T> },
	options?: { key?: string; strategy?: SyncStrategy }
) {
	// Generate the sync key
	let key: string;
	if (options?.key) {
		key = options.key.startsWith('z_sync_') ? options.key : `z_sync_${options.key}`;
	} else {
		syncId += 1;
		key = `z_sync_${syncId}`;
	}
	const strategy = options?.strategy || 'storage';

	const isRemoteUpdate = useRef(false);

	useEffect(() => {
		if (strategy === 'broadcast' && typeof window !== 'undefined' && 'BroadcastChannel' in window) {
			const channel = new BroadcastChannel(key);
			// Listen for messages from other tabs
			channel.onmessage = (event) => {
				isRemoteUpdate.current = true;
				zignal.store.set(event.data);
			};
			// Broadcast on local change
			const unsubscribe = zignal.store.subscribe(() => {
				if (isRemoteUpdate.current) {
					isRemoteUpdate.current = false;
					return; // Don't broadcast if this update came from another tab
				}
				channel.postMessage(zignal.store.get());
			});
			return () => {
				channel.close();
				unsubscribe();
			};
		} else {
			// Fallback to localStorage
			const stored = localStorage.getItem(key);
			if (stored !== null) {
				try {
					zignal.store.set(JSON.parse(stored));
				} catch {
					// ignore
				}
			}
			// Listen for storage events from other tabs
			const onStorage = (e: StorageEvent) => {
				if (e.key === key && e.newValue !== null) {
					try {
						zignal.store.set(JSON.parse(e.newValue));
					} catch {
						// ignore
					}
				}
			};
			window.addEventListener('storage', onStorage);
			const unsubscribe = zignal.store.subscribe(() => {
				localStorage.setItem(key, JSON.stringify(zignal.store.get()));
			});
			return () => {
				window.removeEventListener('storage', onStorage);
				unsubscribe();
			};
		}
	}, [key, strategy]);
} 
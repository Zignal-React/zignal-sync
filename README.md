# @zignal/sync

[![npm version](https://img.shields.io/npm/v/@zignal/sync.svg)](https://www.npmjs.com/package/@zignal/sync)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zignal/sync)](https://bundlephobia.com/result?p=@zignal/sync)
[![npm downloads](https://img.shields.io/npm/dm/@zignal/sync.svg)](https://www.npmjs.com/package/@zignal/sync)

Sync plugin for [@zignal/core](https://github.com/Zignal-React/zignal-core) signal stores. Adds cross-tab sync via BroadcastChannel or localStorage to your state.

## Features
- Keeps your zignal store in sync across all open tabs/windows
- Choose between real-time sync (BroadcastChannel) or storage-based sync (localStorage)
- Simple API, works with any zignal store
- Lightweight and dependency-free (except React)

## Installation

```sh
pnpm add @zignal/core
pnpm add @zignal/sync
# or
npm install @zignal/core
npm install @zignal/sync
```

## Usage

```tsx
import { createZignal } from '@zignal/core';
import { syncZignal } from '@zignal/sync';

const counter = createZignal(0);

export function Counter() {
  // Use BroadcastChannel for real-time sync (if supported)
  syncZignal(counter, 'counter', { strategy: 'broadcast' });
  // Or use localStorage (default)
  // syncZignal(counter, 'counter');
  const [count, setCount] = counter();
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

## API

### `syncZignal<T>(zignal, key, options?)`
- `zignal`: A zignal store (from `createZignal`)
- `key`: The sync key (used for BroadcastChannel or localStorage)
- `options.strategy`: `'broadcast' | 'storage'` (default: `'storage'`)
  - `'broadcast'`: Uses [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) for real-time tab sync (falls back to localStorage if not supported)
  - `'storage'`: Uses localStorage and the storage event for sync

## Fallback Behavior
If you choose `'broadcast'` but the browser does not support it, `syncZignal` will automatically fall back to using localStorage.

## License
MIT 
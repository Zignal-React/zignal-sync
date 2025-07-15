# @zignal/sync

[![npm version](https://img.shields.io/npm/v/@zignal/sync.svg)](https://www.npmjs.com/package/@zignal/sync)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zignal/sync)](https://bundlephobia.com/result?p=@zignal/sync)
[![npm downloads](https://img.shields.io/npm/dm/@zignal/sync.svg)](https://www.npmjs.com/package/@zignal/sync)

Sync plugin for [@zignal/core](https://github.com/Zignal-React/zignal-core) signal stores. Adds cross-tab sync via BroadcastChannel or localStorage to your state.

## Features
- Keeps your zignal store in sync across all open tabs/windows
- Uses real-time sync (BroadcastChannel) by default, or storage-based sync (localStorage) as a fallback
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
import { broadcast } from '@zignal/sync';

const useCounter = broadcast(createZignal(0), { key: 'counter' });

export function Counter() {
  const [count, setCount] = useCounter();
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

## API

### `broadcast<T>(zignal, options?)`
- `zignal`: A zignal store (from `createZignal`)
- `options.key`: The sync key (used for BroadcastChannel or localStorage)
- `options.strategy`: `'broadcast' | 'storage'` (default: `'broadcast'`)
  - `'broadcast'`: Uses [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) for real-time tab sync (falls back to localStorage if not supported)
  - `'storage'`: Uses localStorage and the storage event for sync

## Fallback Behavior
If you choose `'broadcast'` but the browser does not support it, `broadcast` will automatically fall back to using localStorage.

## License
MIT 
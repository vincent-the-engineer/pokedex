import { afterEach, expect, test, vi } from "vitest";

import { Cache } from "./pokecache.js";


let cache: Cache;

afterEach(() => {
  // Ensure the cache is always stopped after each test
  if (cache) {
    cache.stopReapLoop();
  }
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    timeToLive: 500,  // 0.5 second
    reapInterval: 250,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    timeToLive: 1000, // 1 second
    reapInterval: 500,
  },
])("Test Caching $timeToLive ms", async ({ key, val, timeToLive, reapInterval }) => {
  // Use fake timers to control the flow of time
  vi.useFakeTimers();

  cache = new Cache(timeToLive, reapInterval);

  cache.startReapLoop();

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Advance timers by the full TTL to make the item old
  vi.advanceTimersByTime(timeToLive);

  // Advance timers by one reap interval to trigger a reap cycle
  vi.advanceTimersByTime(reapInterval);

  // The item should now be reaped
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);
});


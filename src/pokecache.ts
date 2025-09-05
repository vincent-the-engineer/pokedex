export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};


export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapInterval: number;
  #reapIntervalID: NodeJS.Timeout | undefined = undefined;
  #timeToLive: number;

  #reap = () => {
    const cutoffTime = Date.now() - this.#timeToLive;
    const keys = Array.from(this.#cache.keys());
    for (const key of keys) {
      const entry = this.#cache.get(key);
      if (entry && entry.createdAt < cutoffTime) {
        this.#cache.delete(key);
      }
    }
  };

  constructor(timeToLive: number, reapInterval: number = 1000) {
    this.#timeToLive = timeToLive;
    this.#reapInterval = reapInterval;
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (entry) {
      return entry.val;
    }
    return;
  }

  startReapLoop() {
    this.#reapIntervalID = setInterval(this.#reap, this.#reapInterval);
  }

  stopReapLoop() {
    if (this.#reapIntervalID) {
      clearInterval(this.#reapIntervalID);
      this.#reapIntervalID = undefined;
    }
  }
}



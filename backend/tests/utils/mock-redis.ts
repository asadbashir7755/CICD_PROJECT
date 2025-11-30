/**
 * Mock Redis client for integration tests
 * This eliminates the need for a real Redis connection during testing
 */

class MockRedisClient {
    private store: Map<string, string> = new Map();

    async get(key: string): Promise<string | null> {
        return this.store.get(key) || null;
    }

    async set(key: string, value: string, options?: any): Promise<void> {
        this.store.set(key, value);
    }

    async del(key: string): Promise<void> {
        this.store.delete(key);
    }

    async flushAll(): Promise<void> {
        this.store.clear();
    }

    async quit(): Promise<void> {
        this.store.clear();
    }

    async connect(): Promise<void> {
        // No-op for mock
    }

    async disconnect(): Promise<void> {
        this.store.clear();
    }
}

export const mockRedisClient = new MockRedisClient();

/**
 * Mock connectToRedis function for tests
 */
export const connectToRedis = async () => {
    // Return mock client instead of real Redis connection
    return mockRedisClient;
};

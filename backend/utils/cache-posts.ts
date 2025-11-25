import { getRedisClient } from '../services/redis.js';
import { REDIS_PREFIX } from './constants.js';

// Helper function to check if Redis is available
function isRedisEnabled() {
  return getRedisClient() !== null;
}

export async function retrieveDataFromCache(key: any) {
  if (!isRedisEnabled()) return null;

  try {
    const client = getRedisClient();
    if (!client) return null;

    const data = await client.get(`${REDIS_PREFIX}:${key}`);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    return null;
  }
  return null;
}

export async function storeDataInCache(key: any, data: any) {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await getRedisClient().set(cacheKey, JSON.stringify(data));
}

export async function deleteDataFromCache(key: any): Promise<void> {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available
  const cacheKey = `${REDIS_PREFIX}:${key}`;
  if (getRedisClient().exists(cacheKey)) {
    await getRedisClient().del(cacheKey);
  }
}

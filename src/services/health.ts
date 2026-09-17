import { API_URL } from '../config.js';

let cachedStatus: { isHealthy: boolean; lastChecked: number } = {
  isHealthy: true,
  lastChecked: 0,
};

const CACHE_TTL_MS = 4000; // 4 seconds cache to avoid overloading backend on rapid user queries

/**
 * Checks whether the backend server is reachable and healthy.
 * Uses a short timeout (2.5s) and a short TTL cache.
 */
export async function checkBackendHealth(forceCheck = false): Promise<boolean> {
  const now = Date.now();
  if (!forceCheck && now - cachedStatus.lastChecked < CACHE_TTL_MS) {
    return cachedStatus.isHealthy;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(`${API_URL}/api/health`, {
      signal: controller.signal,
    }).catch(async () => {
      // Fallback check on /health without /api prefix
      return await fetch(`${API_URL}/health`, { signal: controller.signal });
    });

    clearTimeout(timeoutId);

    const isOk = !!res && res.ok;
    cachedStatus = {
      isHealthy: isOk,
      lastChecked: Date.now(),
    };
    return isOk;
  } catch (error) {
    clearTimeout(timeoutId);
    cachedStatus = {
      isHealthy: false,
      lastChecked: Date.now(),
    };
    return false;
  }
}

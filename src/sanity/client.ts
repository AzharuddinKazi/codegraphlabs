import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from './env';

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // fine for published content; draft/preview mode overrides this per-request
    })
  : null;

/**
 * Use this instead of calling client.fetch directly from pages — it's the
 * single place that handles "Sanity isn't configured yet" and "the query
 * failed" without either case being able to crash a build or a request.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.error('[sanity] query failed:', err);
    return null;
  }
}

import { createClient, type SanityClient } from '@sanity/client';

function createSanityClient(): SanityClient {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error('SANITY_PROJECT_ID not configured');
  }
  return createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    token: import.meta.env.SANITY_API_TOKEN,
  });
}

let _client: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!_client) {
    _client = createSanityClient();
  }
  return _client;
}

export const client = new Proxy({} as SanityClient, {
  get(_, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

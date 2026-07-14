import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = client ? imageUrlBuilder(client) : null;

/**
 * Generates an image URL builder for a Sanity image asset source.
 * Handles cases where Sanity client is not configured gracefully.
 */
export function urlFor(source: any) {
  if (!builder) {
    return {
      url: () => '',
      width: () => ({ url: () => '' }),
      height: () => ({ url: () => '' }),
      fit: () => ({ url: () => '' }),
    };
  }
  return builder.image(source);
}

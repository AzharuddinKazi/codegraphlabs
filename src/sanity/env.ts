export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// A missing project ID/dataset should degrade a page to "no content yet,"
// not take down the entire build with an opaque "Failed to collect page
// data" error — that's what throwing here caused the first time around.
export const isSanityConfigured = Boolean(projectId && dataset);

if (!isSanityConfigured) {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID and/or NEXT_PUBLIC_SANITY_DATASET are not set. ' +
      'Pages will render without content until these are configured (see SETUP.md).'
  );
}

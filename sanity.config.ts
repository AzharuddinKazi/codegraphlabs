import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  // Sanity's config validation rejects undefined/malformed values, which
  // would crash the /studio route's build the same way the homepage broke —
  // fall back to placeholders that pass validation; the Studio will show
  // its own "can't connect" state in the browser instead of failing the build.
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // GROQ query playground inside the Studio — handy while wiring up page queries.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // GROQ query playground inside the Studio — handy while wiring up page queries.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

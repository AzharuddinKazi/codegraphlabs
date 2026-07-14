'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// Catch-all route mounts the entire embedded Studio at /studio.
// See: https://www.sanity.io/docs/next-js-app-router-quickstart
export default function StudioPage() {
  return <NextStudio config={config} />;
}

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('/three/') || id.includes('@react-three/')) return 'vendor-three';
          if (id.includes('gsap'))           return 'vendor-gsap';
          if (id.includes('framer-motion'))  return 'vendor-fm';
          if (id.includes('lenis'))          return 'vendor-lenis';
        },
      },
    },
  },
});

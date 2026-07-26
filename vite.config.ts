import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [
      TanStackRouterVite({
        routesDirectory: './app/routes',
        generatedRouteTree: './app/routeTree.gen.ts',
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    define: {
      'process.env.NEXT_PUBLIC_FIREBASE_API_KEY': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_API_KEY || env.VITE_FIREBASE_API_KEY || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || env.VITE_FIREBASE_AUTH_DOMAIN || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || env.VITE_FIREBASE_STORAGE_BUCKET || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_APP_ID': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_APP_ID || env.VITE_FIREBASE_APP_ID || ''),
      'process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': JSON.stringify(env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || env.VITE_FIREBASE_MEASUREMENT_ID || ''),
      'process.env.NEXT_PUBLIC_GITHUB_USERNAME': JSON.stringify(env.NEXT_PUBLIC_GITHUB_USERNAME || env.VITE_GITHUB_USERNAME || 'WarunaUdara'),
    },
    build: {
      chunkSizeWarningLimit: 1500,
    },
  };
});

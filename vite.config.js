import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work on Vercel, Netlify AND GitHub Pages
// (including project pages like https://user.github.io/repo-name/).
export default defineConfig({
  base: './',
  plugins: [react()],
});

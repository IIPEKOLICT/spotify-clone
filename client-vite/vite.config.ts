import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  define: {
    'process.env': {},
  },
  plugins: [react(), svgr({ svgrOptions: { icon: true } })],
});

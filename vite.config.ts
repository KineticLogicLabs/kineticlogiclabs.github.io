import {execFileSync} from 'node:child_process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function lastUpdatedMonth() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs'], {encoding: 'utf8'})
      .trim()
      .slice(0, 7)
      .replace('-', '.');
  } catch {
    return new Date().toISOString().slice(0, 7).replace('-', '.');
  }
}

export default defineConfig(() => {
  return {
    base: './',
    define: {
      __LAST_UPDATED__: JSON.stringify(lastUpdatedMonth()),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

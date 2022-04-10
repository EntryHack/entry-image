const { build } = require('esbuild');
const { copyFileSync } = require('fs');
const { join } = require('path');

build({
  entryPoints: ['./src/appendElements/inject.ts', './src/index.ts'],
  outdir: 'dist',
  sourcemap: false,
  bundle: true,
  target: ['ES2022'],
  watch: process.env.NODE_ENV !== 'production',
  plugins: [
    {
      name: 'copy',
      setup() {
        copyFileSync(join(process.cwd(), './manifest.json'), join(process.cwd(), './dist/manifest.json'));
      },
    },
  ],
});

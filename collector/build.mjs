import * as esbuild from 'esbuild'
import fs from 'fs';
import { execSync } from 'child_process'

if (fs.existsSync('./dist')) fs.rmSync('./dist', { recursive: true });
await esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'esm',
  packages: 'external',
})
fs.cpSync('./package.json', 'dist/package.json');
fs.cpSync('./yarn.lock', 'dist/yarn.lock');
execSync('cd dist && yarn install --prod=true', { stdio: 'inherit' });
execSync('cp ../prune.sh dist/prune.sh && cd dist && bash prune.sh', { stdio: 'inherit' });
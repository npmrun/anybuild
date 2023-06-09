import { build } from 'tsup'

const pkg = require(`../packages/anybuild/package.json`)
const isDev = false
const dependencies = pkg['dependencies'] ?? {}
let externals = Array.from(new Set([...Object.keys(dependencies)]))
externals = externals.concat([
    'commander',
    'chalk',
    'fs-extra',
    '@niu-tools/core',
    'anybuild',
    '@anybuild/build-lib',
    '@anybuild/build-docs',
    '@noderun/loadconfig',
])

build({
    entry: {
        bin: 'packages/anybuild/src/index.ts',
    },
    outDir: "packages/anybuild/dist",
    watch: isDev,
    format: 'esm', //isDev ? 'esm' : ['esm', 'cjs'],
    dts: true,
    splitting: !isDev,
    sourcemap: true,
    clean: true,
    outExtension({ format }) {
        return {
          js: `.js`,
        }
    },
    define: {
        __DEV__: `${isDev}`,
        __NAME__: `"${pkg.name}"`,
        __VERSION__: `"${pkg.version}"`,
    },
    replaceNodeEnv: true,
    treeshake: true,
    banner: { js: '#!/usr/bin/env node' },
    external: externals,
    minify: !isDev,
})

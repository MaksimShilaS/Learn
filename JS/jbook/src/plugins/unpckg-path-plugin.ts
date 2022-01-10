import * as esbuild from 'esbuild-wasm';

const REPOSITORY_URL = 'https://unpkg.com';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /^index\.js$/ }, () => ({
        path: 'index.js',
        namespace: 'a',
      }));
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args) => ({
        namespace: 'a',
        path: new URL(args.path, `${REPOSITORY_URL}${args.resolveDir}/`).href,
      }));
      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args) => ({
        namespace: 'a',
        path: `${REPOSITORY_URL}/${args.path}`,
      }));
    },
  };
};

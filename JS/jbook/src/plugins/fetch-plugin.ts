import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const useCache = false;
const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js$/ }, () => ({
        loader: 'jsx',
        contents: inputCode,
      }));

      build.onLoad({ filter: /.*/ }, (args) => {
        if (!useCache) {
          return null;
        }
        return fileCache.getItem<esbuild.OnLoadResult>(args.path);
      });

      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const { data, request } = await axios.get<string>(args.path);
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        if (useCache) {
          await fileCache.setItem(args.path, result);
        }
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get<string>(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        if (useCache) {
          await fileCache.setItem(args.path, result);
        }
        return result;
      });
    },
  };
};

import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpckg-path-plugin';

const App = () => {
  const esBuildServiceRef = useRef<esbuild.Service>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    (async () => {
      esBuildServiceRef.current = await esbuild.startService({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
      });
    })();
  }, []);

  const onClick = async () => {
    const esBuildService = esBuildServiceRef.current;
    if (!esBuildService) {
      return;
    }

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = html;
    }
    const result = await esBuildService.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    const code = result.outputFiles[0].text;
    iframe?.contentWindow?.postMessage(code, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        rows={10}
        cols={40}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title='preview'
        ref={iframeRef}
        srcDoc={html}
        sandbox='allow-scripts'
        // style={{ display: 'none' }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

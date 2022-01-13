import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpckg-path-plugin';
import CodeEditor from './components/code-editor';

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

  const initialValue = `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div>
    <h1>asdfasdf</h1>
    <button onClick={() => console.log('click')}>Click me</button>
  </div>
}

ReactDOM.render(<App />, document.querySelector('#root'));
  `;

  return (
    <div>
      <CodeEditor
        initialValue={initialValue}
        onChange={(value) => setInput(value)}
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

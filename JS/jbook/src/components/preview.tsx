import './preview.css';
import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  bundleError: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: aliceblue }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundleError }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current.srcdoc = html; // Reset iframe to initial value
    setTimeout(() => {
      iframeRef?.current?.contentWindow?.postMessage(code, '*');
    }, 50); // Give time to reset html
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframeRef}
        srcDoc={html}
        sandbox='allow-scripts'
      />
      {bundleError && <div className='preview-error'>{bundleError}</div>}
    </div>
  );
};

export default Preview;

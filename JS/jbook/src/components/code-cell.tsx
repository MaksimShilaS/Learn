import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [bundleError, setBundleError] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setBundleError(output.error);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className='card'>
      <div className='card-content'>
        <Resizable direction='vertical'>
          <div
            style={{ height: '100%', display: 'flex', flexDirection: 'row' }}
          >
            <Resizable direction='horizontal'>
              <CodeEditor
                initialValue='// Put some code here'
                onChange={(value) => setInput(value)}
              />
            </Resizable>
            <Preview code={code} bundleError={bundleError} />
          </div>
        </Resizable>
      </div>
    </div>
  );
};

export default CodeCell;

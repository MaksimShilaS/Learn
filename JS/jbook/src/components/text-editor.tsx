import './text-editor.css';
import MDEditor, { ContextStore } from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';

interface TextEditorProps {}
const TextEditor: React.FC<TextEditorProps> = () => {
  const ref = useRef<ContextStore | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState<string>('# Header');

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const editorDiv = ref.current?.container;
      if (event.target && editorDiv?.contains(event.target as Node)) {
        // Do not switch mode if click is outside editor
        return;
      }
      setEditMode(false);
    };

    const options = { capture: true };
    document.addEventListener('click', clickListener, options);

    return () => {
      document.removeEventListener('click', clickListener, options);
    };
  }, []);

  if (editMode) {
    return (
      <div className='text-editor'>
        <MDEditor ref={ref} value={value} onChange={(v) => setValue(v ?? '')} />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditMode(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;

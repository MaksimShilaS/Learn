import './code-editor.css';
import './code-editor.jsx-highlighter.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const babelParse = (code: string) =>
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      0, // debounceTime
      (ast: any) => ast, // afterHightlight
      () => {}, // onHighlightError
      null, // getAstPromise
      () => {} // onParseAstError
    );
    highlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, ''); // Remove empty line on end added by prettier
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language='javascript'
        theme='dark'
        height='300px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

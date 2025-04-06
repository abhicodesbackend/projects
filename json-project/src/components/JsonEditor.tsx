import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, FileJson, Copy, Download, Check } from 'lucide-react';

interface JsonEditorProps {
  onValidJson: (json: any) => void;
}

export function JsonEditor({ onValidJson }: JsonEditorProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [lastValidJson, setLastValidJson] = useState<any>(null);

  const validateAndFormatJson = useCallback((text: string) => {
    try {
      if (!text.trim()) {
        setError(null);
        return null;
      }
      const parsed = JSON.parse(text);
      setError(null);
      
      // Only update valid JSON if it's different from the last one
      if (JSON.stringify(parsed) !== JSON.stringify(lastValidJson)) {
        setLastValidJson(parsed);
        onValidJson(parsed);
      }
      return parsed;
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  }, [onValidJson, lastValidJson]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateAndFormatJson(input);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, validateAndFormatJson]);

  const formatJson = useCallback(() => {
    const parsed = validateAndFormatJson(input);
    if (parsed) {
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
    }
  }, [input, validateAndFormatJson]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
      validateAndFormatJson(text);
    };
    reader.readAsText(file);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const syntaxHighlight = (json: string) => {
    if (!json) return '';
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'text-purple-600 dark:text-purple-400';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-gray-800 dark:text-gray-200';
        } else {
          cls = 'text-green-600 dark:text-green-400';
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-blue-600 dark:text-blue-400';
      } else if (/null/.test(match)) {
        cls = 'text-red-600 dark:text-red-400';
      } else if (/^-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$/.test(match)) {
        cls = 'text-orange-600 dark:text-orange-400';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
          <FileJson size={20} />
          Import JSON
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
        >
          Format JSON
        </button>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          {copySuccess ? <Check size={20} /> : <Copy size={20} />}
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={downloadJson}
          className="px-4 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Download size={20} />
          Download
        </button>
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
          className="w-full h-[400px] p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste your JSON here..."
        />
        {input && !error && (
          <div
            className="absolute inset-0 pointer-events-none p-4 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(input) }}
          />
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-500 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { JsonEditor } from './components/JsonEditor';
import { History } from './components/History';
import { Footer } from './components/Footer';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

function AppContent() {
  const [history, setHistory] = useState<any[]>([]);

  const handleValidJson = (json: any) => {
    setHistory((prev) => {
      const jsonStr = JSON.stringify(json);
      if (!prev.some((item) => JSON.stringify(item) === jsonStr)) {
        return [json, ...prev];
      }
      return prev;
    });
  };

  const handleHistorySelect = (json: any) => {
    const formatted = JSON.stringify(json, null, 2);
    const textArea = document.querySelector('textarea');
    if (textArea) {
      textArea.value = formatted;
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">JSON Check</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <JsonEditor onValidJson={handleValidJson} />
          </div>
          <History
            items={history}
            onSelect={handleHistorySelect}
            onClear={() => setHistory([])}
          />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Learn About JSON</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">JSON Syntax</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Data is in name/value pairs</li>
                <li>Data is separated by commas</li>
                <li>Curly braces hold objects</li>
                <li>Square brackets hold arrays</li>
              </ul>
              <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>{`{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "hobbies": ["reading", "music"],
  "address": {
    "city": "New York",
    "country": "USA"
  }
}`}</code>
                </pre>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">JSON Data Types</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">String:</strong>
                  <pre className="mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">{"\"Hello, World!\""}</pre>
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Number:</strong>
                  <pre className="mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">42, 3.14, -1, 1.23e-4</pre>
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Boolean:</strong>
                  <pre className="mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">true, false</pre>
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Null:</strong>
                  <pre className="mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">null</pre>
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Array:</strong>
                  <pre className="mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">[1, "two", true, null]</pre>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">API Response</h4>
                  <pre className="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John"
      }
    ],
    "total": 1
  }
}`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Configuration File</h4>
                  <pre className="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code>{`{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "url": "mongodb://localhost",
    "name": "myapp"
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
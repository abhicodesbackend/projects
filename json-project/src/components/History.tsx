import React from 'react';
import { History as HistoryIcon, Trash2, Clock } from 'lucide-react';

interface HistoryProps {
  items: any[];
  onSelect: (item: any) => void;
  onClear: () => void;
}

export function History({ items, onSelect, onClear }: HistoryProps) {
  const getPreviewText = (json: any) => {
    const str = JSON.stringify(json);
    if (str.length <= 50) return str;
    
    const preview = str.slice(0, 47) + '...';
    const type = Array.isArray(json) ? 'Array' : 'Object';
    const length = Array.isArray(json) ? json.length : Object.keys(json).length;
    
    return `${preview} (${type}, ${length} items)`;
  };

  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <HistoryIcon size={20} />
          History
        </h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            title="Clear history"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Clock size={40} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No history yet</p>
          <p className="text-xs mt-1">Format some JSON to see it here</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelect(item)}
              className="w-full p-3 text-left text-sm bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors overflow-hidden group"
            >
              <div className="font-mono truncate text-xs">
                {getPreviewText(item)}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                Click to restore
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
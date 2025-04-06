import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About JSON Formatter</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A powerful tool for developers to format, validate, and analyze JSON data.
              Built with modern web technologies to provide a seamless experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.json.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  JSON Specification
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Github size={20} />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Learn JSON</h3>
            <p className="text-gray-600 dark:text-gray-400">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format.
              It's easy for humans to read and write, and easy for machines to parse and generate.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} JSON Formatter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
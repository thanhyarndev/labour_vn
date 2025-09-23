"use client";

import { useState, useRef, useEffect } from 'react';

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function SimpleRichTextEditor({
  value,
  onChange,
  placeholder = "Enter citation detail...",
  className = "",
  disabled = false
}: SimpleRichTextEditorProps) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Update toolbar state based on current selection
  const updateToolbarState = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        
        // Check if we're in a bold or italic element
        const isInBold = container.nodeType === Node.ELEMENT_NODE 
          ? (container as Element).closest('strong, b') !== null
          : container.parentElement?.closest('strong, b') !== null;
          
        const isInItalic = container.nodeType === Node.ELEMENT_NODE
          ? (container as Element).closest('em, i') !== null
          : container.parentElement?.closest('em, i') !== null;
          
        setIsBold(isInBold);
        setIsItalic(isInItalic);
      }
    }
  };

  // Handle toolbar button clicks
  const handleBold = () => {
    document.execCommand('bold', false);
    updateToolbarState();
  };

  const handleItalic = () => {
    document.execCommand('italic', false);
    updateToolbarState();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') {
        e.preventDefault();
        handleBold();
      } else if (e.key === 'i') {
        e.preventDefault();
        handleItalic();
      }
    }
  };

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Handle paste to clean up formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current) {
      const currentContent = editorRef.current.innerHTML;
      // Only update if content is different and not just empty tags
      if (currentContent !== value && (value || currentContent !== '<br>' && currentContent !== '<div><br></div>')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  return (
    <div className={`simple-rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg">
        <button
          type="button"
          onClick={handleBold}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            isBold ? 'bg-blue-500 text-white' : 'text-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Bold (Ctrl+B)"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a1 1 0 011-1h5.5a3.5 3.5 0 013.5 3.5v.5a3 3 0 01-1.5 2.6A3.5 3.5 0 0115 13.5v.5a3.5 3.5 0 01-3.5 3.5H6a1 1 0 01-1-1V4zm2 1v4h4.5a1.5 1.5 0 001.5-1.5v-.5a1.5 1.5 0 00-1.5-1.5H7zm0 6v4h5.5a1.5 1.5 0 001.5-1.5v-.5a1.5 1.5 0 00-1.5-1.5H7z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={handleItalic}
          disabled={disabled}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            isItalic ? 'bg-blue-500 text-white' : 'text-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Italic (Ctrl+I)"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9v2h4a1 1 0 110 2H9v6h2a1 1 0 110 2H9a1 1 0 01-1-1V3z"/>
          </svg>
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onMouseUp={updateToolbarState}
        onKeyUp={updateToolbarState}
        className="min-h-[100px] p-3 border border-gray-200 border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{
          backgroundColor: disabled ? '#f9fafb' : 'white',
          color: disabled ? '#6b7280' : '#111827'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      {/* Placeholder - only show when editor is empty */}
      {(!value || value === '' || value === '<br>' || value === '<div><br></div>') && (
        <div className="absolute top-12 left-3 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
      
      {/* Custom CSS */}
      <style jsx global>{`
        .simple-rich-text-editor {
          position: relative;
        }
        
        .simple-rich-text-editor [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .simple-rich-text-editor [contenteditable]:focus:before {
          content: none;
        }
        
        .simple-rich-text-editor [contenteditable]:not(:empty):before {
          content: none;
        }
        
        /* Dark mode support */
        .dark .simple-rich-text-editor [contenteditable] {
          background-color: #1f2937;
          color: #f9fafb;
        }
        
        .dark .simple-rich-text-editor .toolbar {
          background-color: #374151;
          border-color: #4b5563;
        }
      `}</style>
    </div>
  );
}

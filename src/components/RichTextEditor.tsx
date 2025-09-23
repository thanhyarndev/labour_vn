"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter citation detail...",
  className = "",
  disabled = false
}: RichTextEditorProps) {
  // Customize toolbar to only show Bold and Italic
  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic'],
    ]
  }), []);

  const formats = ['bold', 'italic'];

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb'
        }}
      />
      
      {/* Custom CSS for better styling */}
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: 100px;
          font-size: 14px;
          line-height: 1.5;
          padding: 12px 15px;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        
        .rich-text-editor .ql-toolbar {
          border: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 0.75rem 0.75rem 0 0;
          padding: 8px 12px;
          background-color: #f9fafb;
        }
        
        .rich-text-editor .ql-toolbar .ql-formats {
          margin-right: 15px;
        }
        
        .rich-text-editor .ql-toolbar button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          margin: 0 2px;
        }
        
        .rich-text-editor .ql-toolbar button:hover {
          background-color: #e5e7eb;
        }
        
        .rich-text-editor .ql-toolbar button.ql-active {
          background-color: #3b82f6;
          color: white;
        }
        
        .rich-text-editor .ql-container {
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        
        .rich-text-editor .ql-editor:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Dark mode support */
        .dark .rich-text-editor .ql-editor {
          background-color: #1f2937;
          color: #f9fafb;
        }
        
        .dark .rich-text-editor .ql-toolbar {
          background-color: #374151;
          border-color: #4b5563;
        }
        
        .dark .rich-text-editor .ql-container {
          border-color: #4b5563;
        }
        
        .dark .rich-text-editor .ql-toolbar button {
          color: #d1d5db;
        }
        
        .dark .rich-text-editor .ql-toolbar button:hover {
          background-color: #4b5563;
        }
        
        .dark .rich-text-editor .ql-toolbar button.ql-active {
          background-color: #3b82f6;
          color: white;
        }
      `}</style>
    </div>
  );
}

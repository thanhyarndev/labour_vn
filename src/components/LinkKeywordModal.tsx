"use client";

import { useState, useEffect } from "react";

import { IKeyword } from "@/models";

interface Keyword extends Omit<IKeyword, '_id'> {
  _id: string;
}

interface LinkKeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (keywordIds: string[]) => void;
  scholarName: string;
  loading?: boolean;
}

export default function LinkKeywordModal({ 
  isOpen, 
  onClose, 
  onLink, 
  scholarName,
  loading = false 
}: LinkKeywordModalProps) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingKeywords, setLoadingKeywords] = useState(false);

  // Fetch keywords when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchKeywords();
    }
  }, [isOpen]);

  const fetchKeywords = async () => {
    try {
      setLoadingKeywords(true);
      const response = await fetch('/api/admin/keywords');
      if (response.ok) {
        const result = await response.json();
        setKeywords(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch keywords:', error);
    } finally {
      setLoadingKeywords(false);
    }
  };

  const handleToggleKeyword = (keywordId: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keywordId) 
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedKeywords.length === filteredKeywords.length) {
      setSelectedKeywords([]);
    } else {
      setSelectedKeywords(filteredKeywords.map(k => k._id));
    }
  };

  const handleLink = () => {
    onLink(selectedKeywords);
  };

  const handleClose = () => {
    setSelectedKeywords([]);
    setSearchTerm("");
    onClose();
  };

  const filteredKeywords = keywords?.filter(keyword =>
    keyword.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    keyword.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    keyword.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 10000 }}
        onClick={handleClose}
      />
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 border-2 border-blue-500"
        style={{ zIndex: 10001 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Link Keywords to {scholarName}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Selection Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {selectedKeywords.length === filteredKeywords.length ? 'Deselect All' : 'Select All'}
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedKeywords.length} of {filteredKeywords.length} selected
              </span>
            </div>
          </div>

          {/* Keywords List */}
          <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
            {loadingKeywords ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Loading keywords...
              </div>
            ) : filteredKeywords.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No keywords found matching your search' : 'No keywords available'}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredKeywords.map((keyword) => (
                  <div
                    key={keyword._id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleToggleKeyword(keyword._id)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedKeywords.includes(keyword._id)}
                        onChange={() => handleToggleKeyword(keyword._id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {keyword.displayName}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({keyword.name})
                          </span>
                        </div>
                        {keyword.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {keyword.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLink}
              disabled={selectedKeywords.length === 0 || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? "Linking..." : `Link ${selectedKeywords.length} Keyword${selectedKeywords.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

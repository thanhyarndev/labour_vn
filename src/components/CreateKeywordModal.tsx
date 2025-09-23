"use client";

import { useState } from "react";
import { CreateKeywordInput } from "@/models";

interface CreateKeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (keywordData: CreateKeywordInput) => void;
  loading?: boolean;
  existingKeywords?: Array<{ name: string; displayName: string; slug: string }>; // Existing keywords to check duplicates
}

export default function CreateKeywordModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loading = false,
  existingKeywords = []
}: CreateKeywordModalProps) {
  const [formData, setFormData] = useState<CreateKeywordInput>({
    name: "",
    displayName: "",
    aliases: [],
    description: "",
    isApproved: true
  });

  const [aliasInput, setAliasInput] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Check for duplicates when name or displayName changes
    if (name === 'name' || name === 'displayName') {
      checkForDuplicates(name === 'name' ? value : formData.name, name === 'displayName' ? value : formData.displayName);
    }
  };

  const checkForDuplicates = (name: string, displayName: string) => {
    const nameLower = name.toLowerCase().trim();
    const displayNameLower = displayName.toLowerCase().trim();
    
    const duplicate = existingKeywords.find(keyword => 
      keyword.name.toLowerCase() === nameLower || 
      keyword.displayName.toLowerCase() === displayNameLower ||
      keyword.name.toLowerCase() === displayNameLower ||
      keyword.displayName.toLowerCase() === nameLower
    );
    
    if (duplicate) {
      setDuplicateWarning(`Warning: A keyword with similar name already exists: "${duplicate.displayName}" (${duplicate.name})`);
    } else {
      setDuplicateWarning("");
    }
  };

  const handleAddAlias = () => {
    if (aliasInput.trim()) {
      setFormData(prev => ({
        ...prev,
        aliases: [...(prev.aliases || []), aliasInput.trim()]
      }));
      setAliasInput("");
    }
  };

  const handleRemoveAlias = (index: number) => {
    setFormData(prev => ({
      ...prev,
      aliases: (prev.aliases || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (duplicateWarning) {
      return; // Don't submit if there's a duplicate warning
    }
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      displayName: "",
      aliases: [],
      description: "",
      isApproved: true
    });
    setAliasInput("");
    setDuplicateWarning("");
    onClose();
  };

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
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 border-2 border-green-500"
        style={{ zIndex: 10001 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Create New Keyword
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Keyword Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., labour law"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name *
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Labour Law"
              />
            </div>

            {/* Duplicate Warning */}
            {duplicateWarning && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {duplicateWarning}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aliases
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={aliasInput}
                  onChange={(e) => setAliasInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., labour law"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAlias())}
                />
                <button
                  type="button"
                  onClick={handleAddAlias}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.aliases && formData.aliases.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.aliases.map((alias, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                    >
                      {alias}
                      <button
                        type="button"
                        onClick={() => handleRemoveAlias(index)}
                        className="ml-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the keyword..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isApproved"
                checked={formData.isApproved}
                onChange={(e) => setFormData(prev => ({ ...prev, isApproved: e.target.checked }))}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Approve keyword immediately
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !!duplicateWarning}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? "Creating..." : duplicateWarning ? "Cannot Create (Duplicate)" : "Create Keyword"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

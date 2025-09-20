"use client";

import { useState, useEffect } from "react";
import { IPublication } from "@/models";

interface Publication extends Omit<IPublication, '_id'> {
  _id: string;
}

interface LinkPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (publicationIds: string[]) => void;
  scholarName: string;
  loading?: boolean;
}

export default function LinkPublicationModal({
  isOpen,
  onClose,
  onLink,
  scholarName,
  loading = false
}: LinkPublicationModalProps) {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingPublications, setLoadingPublications] = useState(false);
  const [selectedPublications, setSelectedPublications] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchPublications();
    }
  }, [isOpen]);

  const fetchPublications = async () => {
    try {
      setLoadingPublications(true);
      const response = await fetch('/api/admin/publications?limit=50');
      const data = await response.json();
      
      console.log('Publications API response:', data);
      
      if (data.success) {
        console.log('Setting publications:', data.data);
        setPublications(data.data);
      } else {
        console.error('API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch publications:', error);
    } finally {
      setLoadingPublications(false);
    }
  };

  const filteredPublications = publications?.filter(pub =>
    pub.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.authors?.some(author => author?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    pub.venue?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleTogglePublication = (publicationId: string) => {
    setSelectedPublications(prev => 
      prev.includes(publicationId) 
        ? prev.filter(id => id !== publicationId)
        : [...prev, publicationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPublications.length === filteredPublications.length) {
      setSelectedPublications([]);
    } else {
      setSelectedPublications(filteredPublications.map(pub => pub._id));
    }
  };

  const handleLink = () => {
    if (selectedPublications.length > 0) {
      onLink(selectedPublications);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedPublications([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={handleClose}
          style={{ zIndex: 10000 }}
        ></div>

        <div 
          className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border-4 border-blue-500"
          style={{ zIndex: 10001 }}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Link Publications to {scholarName}
                  </h3>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Search and Select All */}
                <div className="mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Search publications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {filteredPublications.length > 0 && (
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {selectedPublications.length === filteredPublications.length ? 'Deselect All' : 'Select All'}
                      </button>
                      <span className="text-sm text-gray-500">
                        {selectedPublications.length} of {filteredPublications.length} selected
                      </span>
                    </div>
                  )}
                </div>

                {/* Publications List */}
                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
                  {loadingPublications ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-sm text-gray-500">Loading publications...</p>
                    </div>
                  ) : filteredPublications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No publications found
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredPublications.map((publication) => (
                        <div
                          key={publication._id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            selectedPublications.includes(publication._id) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                          }`}
                          onClick={() => handleTogglePublication(publication._id)}
                        >
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedPublications.includes(publication._id)}
                              onChange={() => handleTogglePublication(publication._id)}
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900">
                                {publication.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {publication.authors?.join(', ')}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {publication.venue} ({publication.year})
                              </p>
                              {publication.doi && (
                                <p className="text-xs text-gray-400 mt-1">
                                  DOI: {publication.doi}
                                </p>
                              )}
                              {publication.abstract && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                  {publication.abstract}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedPublications.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Selected Publications ({selectedPublications.length}):
                    </p>
                    <div className="space-y-1">
                      {selectedPublications.map(id => {
                        const pub = publications.find(p => p._id === id);
                        return pub ? (
                          <p key={id} className="text-xs text-blue-700">
                            • {pub.title}
                          </p>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleLink}
              disabled={selectedPublications.length === 0 || loading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {loading ? "Linking..." : `Link ${selectedPublications.length} Publication${selectedPublications.length !== 1 ? 's' : ''}`}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

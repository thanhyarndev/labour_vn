"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

interface Scholar {
  _id: string;
  fullName: string;
  familyName?: string;
  givenName?: string;
  normalizedName?: string;
  slug: string;
  title?: string;
  affiliation?: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  website?: string;
  orcidId?: string;
  googleScholarUrl?: string;
  institutionalProfileUrl?: string;
  homepageUrl?: string;
  bio?: string;
  researchInterests?: string;
  expertiseAreas?: string;
  keywordIds: Array<{
    _id: string;
    name: string;
    displayName: string;
    slug: string;
  }>;
  publicationIds: Array<{
    _id: string;
    title: string;
    year?: number;
    type?: string;
    authors: string[];
    venue?: string;
    abstract?: string;
    doi?: string;
    url?: string;
    isVietnamLaborRelated?: boolean;
  }>;
  publicationCount: number;
  relatedPublicationCount: number;
  frequentContributor: boolean;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Scholar[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for initial query from URL
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Get keyword suggestions from API
      fetch(`/api/admin/keywords?search=${encodeURIComponent(searchQuery)}&limit=5`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const keywordNames = data.data.map((keyword: { displayName: string }) => keyword.displayName);
            setSuggestions(keywordNames);
            setShowSuggestions(true);
          }
        })
        .catch(err => {
          console.error('Error fetching suggestions:', err);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
        setHasSearched(true);
      } else {
        console.error('Search error:', data.error);
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="search" />

      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Search Scholars
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-300">
              Find researchers and experts in Vietnam labor studies
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search by name, institution, or keywords..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
              />
              <button 
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasSearched && (
            <div className="mb-6">
              <p className="text-slate-600 dark:text-gray-300">
                {loading 
                  ? `Searching for "${searchQuery}"...`
                  : searchResults.length > 0 
                    ? `Found ${searchResults.length} scholar${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : `No scholars found for "${searchQuery}"`
                }
              </p>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {/* Frequent Contributors */}
              {searchResults.filter(scholar => scholar.frequentContributor).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Frequent Contributors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.filter(scholar => scholar.frequentContributor).map((scholar) => (
                      <div
                        key={scholar._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {scholar.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                              {scholar.fullName}
                            </h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                              {scholar.position}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-gray-300 mb-3">
                              {scholar.affiliation}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {scholar.keywordIds.slice(0, 3).map((keyword, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                                >
                                  {keyword.displayName}
                                </span>
                              ))}
                              {scholar.keywordIds.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                  +{scholar.keywordIds.length - 3} more
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-500 dark:text-gray-400">
                                {scholar.publicationCount} publications
                              </span>
                              <Link
                                href={`/scholars/${scholar.slug}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                              >
                                View Profile →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Occasional Contributors */}
              {searchResults.filter(scholar => !scholar.frequentContributor).length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Occasional Contributors
                    </h3>
                    <Link
                      href="/occasional-contributors"
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
                    >
                      View All Occasional Contributors →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {searchResults.filter(scholar => !scholar.frequentContributor).map((scholar) => (
                      <div
                        key={scholar._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 p-4"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {scholar.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                  {scholar.fullName}
                                </h4>
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  {scholar.position}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-gray-300">
                                  {scholar.affiliation}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                                  Occasional
                                </span>
                                <Link
                                  href={`/scholars/${scholar.slug}`}
                                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
                                >
                                  View Profile →
                                </Link>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {scholar.keywordIds.slice(0, 4).map((keyword, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                                >
                                  {keyword.displayName}
                                </span>
                              ))}
                              {scholar.keywordIds.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                  +{scholar.keywordIds.length - 4} more
                                </span>
                              )}
                            </div>
                            {scholar.publicationIds.length > 0 && (
                              <div className="text-sm text-slate-600 dark:text-gray-300">
                                <span className="font-medium">Key work:</span> {scholar.publicationIds[0].title}
                                {scholar.publicationIds[0].abstract && (
                                  <span className="block italic mt-1">
                                    &ldquo;{scholar.publicationIds[0].abstract.substring(0, 100)}...&rdquo;
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No scholars found
              </h3>
              <p className="text-slate-600 dark:text-gray-300 mb-6">
                Try searching with different keywords or check our{" "}
                <Link href="/occasional-contributors" className="text-blue-600 dark:text-blue-400 hover:underline">
                  occasional contributors
                </Link>
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Start Your Search
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Enter keywords to find scholars and researchers
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-slate-600 dark:text-gray-300">Loading...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

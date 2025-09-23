"use client";

import { useState, useEffect } from "react";
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
  scholarUrl?: string;
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
    citationDetail?: string;
    abstract?: string;
    doi?: string;
    url?: string;
    isVietnamLabourRelated?: boolean;
  }>;
  publicationCount: number;
  relatedPublicationCount: number;
  frequentContributor: boolean;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OccasionalContributorsPage() {
  const [, setScholars] = useState<Scholar[]>([]);
  const [filteredScholars, setFilteredScholars] = useState<Scholar[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "publications" | "affiliation">("name");
  const [loading, setLoading] = useState(true);
  const [highlightedScholar, setHighlightedScholar] = useState<string | null>(null);

  useEffect(() => {
    const fetchOccasionalContributors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/occasional-contributors');
        const data = await response.json();
        
        if (data.success) {
          setScholars(data.data);
          setFilteredScholars(data.data);
        } else {
          console.error('Error fetching occasional contributors:', data.error);
          setScholars([]);
          setFilteredScholars([]);
        }
      } catch (error) {
        console.error('Error fetching occasional contributors:', error);
        setScholars([]);
        setFilteredScholars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOccasionalContributors();
  }, []);

  // Handle anchor scrolling when page loads
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add a small offset to account for fixed header
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Add highlight effect to the target element
          const scholarSlug = hash.substring(1); // Remove # from hash
          setHighlightedScholar(scholarSlug);
          setTimeout(() => {
            setHighlightedScholar(null);
          }, 3000);
        }
      }
    };

    // Wait for content to load, then scroll to the element
    if (filteredScholars.length > 0) {
      const timer = setTimeout(handleScrollToHash, 100);
      return () => clearTimeout(timer);
    }
  }, [filteredScholars]);

  // Also handle hash changes when navigating within the page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
          params.append('search', searchQuery);
        }
        params.append('sortBy', sortBy);
        
        const response = await fetch(`/api/occasional-contributors?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) {
          setFilteredScholars(data.data);
        } else {
          console.error('Error filtering occasional contributors:', data.error);
          setFilteredScholars([]);
        }
      } catch (error) {
        console.error('Error filtering occasional contributors:', error);
        setFilteredScholars([]);
      }
    };

    fetchFilteredData();
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="occasional-contributors" />

      {/* Page Header */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Occasional contributors
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-300 max-w-4xl mx-auto">
              This section features scholars who have made valuable contributions with one or two publications on Vietnam labour as part of their broader research.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contributors..."
                  className="w-full px-4 py-2 pl-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "publications" | "affiliation")}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
              >
                <option value="name">Name</option>
                <option value="publications">Publications</option>
                <option value="affiliation">Institution</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-slate-600 dark:text-gray-300">
              {loading 
                ? "Loading contributors..." 
                : `${filteredScholars.length} contributor${filteredScholars.length !== 1 ? 's' : ''} found`
              }
            </p>
          </div>

          {filteredScholars.length > 0 ? (
            <div className="space-y-8">
              {filteredScholars.map((scholar) => (
                <div
                  key={scholar._id}
                  id={scholar.slug}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6 transition-all duration-300 scroll-mt-20 ${
                    highlightedScholar === scholar.slug 
                      ? 'ring-2 ring-green-500 ring-opacity-50 shadow-lg' 
                      : ''
                  }`}
                >
                  {/* Scholar Name */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {scholar.fullName}
                  </h3>

                  {/* Website Links */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      {scholar.scholarUrl && (
                        <a
                          href={scholar.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline"
                        >
                          Google Scholar
                        </a>
                      )}
                      {scholar.institutionalProfileUrl && (
                        <a
                          href={scholar.institutionalProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline"
                        >
                          Institutional Profile
                        </a>
                      )}
                      {scholar.homepageUrl && (
                        <a
                          href={scholar.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Keywords: </span>
                    <div className="inline-flex flex-wrap gap-1">
                      {scholar.keywordIds.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                        >
                          {keyword.displayName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selected Publications */}
                  {scholar.publicationIds.length > 0 && (
                    <div className="space-y-3">
                      {scholar.publicationIds.slice(0, 2).map((publication) => (
                        <div key={publication._id} className="text-sm text-slate-600 dark:text-gray-300">
                          <div className="flex items-start">
                            <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white mb-1">
                                {publication.title}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-gray-400" dangerouslySetInnerHTML={{ 
                                __html: publication.citationDetail || '' 
                              }} />
                              {publication.year && (
                                <span className="text-xs text-slate-500 dark:text-gray-400">
                                  {publication.year}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No contributors found
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

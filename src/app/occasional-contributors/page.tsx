"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

export default function OccasionalContributorsPage() {
  const [, setScholars] = useState<Scholar[]>([]);
  const [filteredScholars, setFilteredScholars] = useState<Scholar[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "publications" | "affiliation">("name");
  const [loading, setLoading] = useState(true);

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
              Occasional Contributors
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover researchers who contribute valuable insights to Vietnam labor studies. 
              These scholars may not publish as frequently but provide important perspectives and expertise.
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
            <div className="space-y-6">
              {filteredScholars.map((scholar) => (
                <div
                  key={scholar._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {scholar.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                            {scholar.fullName}
                          </h3>
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                            {scholar.position}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            {scholar.affiliation}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Occasional Contributor
                          </span>
                          <Link
                            href={`/scholars/${scholar.slug}`}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
                          >
                            View Profile →
                          </Link>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {scholar.keywordIds.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                          >
                            {keyword.displayName}
                          </span>
                        ))}
                      </div>

                      {/* Selected Publications with Quotes */}
                      {scholar.publicationIds.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Key Publications:
                          </h4>
                          {scholar.publicationIds.slice(0, 2).map((publication) => (
                            <div key={publication._id} className="border-l-4 border-green-500 pl-4 py-2">
                              <h5 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
                                {publication.title}
                              </h5>
                              <div className="text-xs text-slate-500 dark:text-gray-400 mb-2">
                                <span>{publication.venue}</span>
                                {publication.year && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{publication.year}</span>
                                  </>
                                )}
                              </div>
                              {publication.abstract && (
                                <blockquote className="text-sm text-slate-600 dark:text-gray-300 italic border-l-2 border-gray-200 dark:border-gray-600 pl-3">
                                  &ldquo;{publication.abstract.substring(0, 150)}...&rdquo;
                                </blockquote>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bio excerpt */}
                      {scholar.bio && (
                        <p className="text-sm text-slate-600 dark:text-gray-300 mt-4 line-clamp-2">
                          {scholar.bio}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="text-sm text-slate-500 dark:text-gray-400">
                          {scholar.publicationCount} publication{scholar.publicationCount !== 1 ? 's' : ''}
                        </div>
                        <div className="flex space-x-4">
                          {scholar.scholarUrl && (
                            <a
                              href={scholar.scholarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
                            >
                              Google Scholar
                            </a>
                          )}
                          {scholar.institutionalProfileUrl && (
                            <a
                              href={scholar.institutionalProfileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
                            >
                              Institutional Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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

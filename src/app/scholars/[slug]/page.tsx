"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

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

export default function ScholarProfilePage() {
  const params = useParams();
  const [scholar, setScholar] = useState<Scholar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholar = async () => {
      if (params.slug) {
        try {
          const response = await fetch(`/api/admin/scholars?slug=${params.slug}`);
          const data = await response.json();
          
          if (data.success && data.data.length > 0) {
            setScholar(data.data[0]);
          } else {
            setScholar(null);
          }
        } catch (error) {
          console.error('Error fetching scholar:', error);
          setScholar(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchScholar();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-slate-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!scholar) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
                Vietnam Labour Research Portal
              </Link>
              <nav className="flex space-x-6">
                <Link href="/" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">
                  Home
                </Link>
                <Link href="/" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">
                  Search
                </Link>
                <Link href="/occasional-contributors" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">
                  Occasional Contributors
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Scholar Not Found
          </h1>
          <p className="text-slate-600 dark:text-gray-300 mb-8">
            The scholar you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Scholars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="scholar" />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300">
                  Search
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-slate-900 dark:text-white font-medium">{scholar.fullName}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Scholar Profile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                  {scholar.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {scholar.fullName}
                </h1>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {scholar.position}
                </p>
                <p className="text-slate-600 dark:text-gray-300">
                  {scholar.affiliation}
                </p>
              </div>

              {/* Contact Info */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                  Contact & Links
                </h3>
                <div className="space-y-3">
                  {scholar.email && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${scholar.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {scholar.email}
                      </a>
                    </div>
                  )}
                  {scholar.googleScholarUrl && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                      </svg>
                      <a href={scholar.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Google Scholar
                      </a>
                    </div>
                  )}
                  {scholar.institutionalProfileUrl && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <a href={scholar.institutionalProfileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Institutional Profile
                      </a>
                    </div>
                  )}
                  {scholar.homepageUrl && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <a href={scholar.homepageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Personal Homepage
                      </a>
                    </div>
                  )}
                  {scholar.orcidId && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.568 8.16c-.169 0-.327.067-.445.189l-5.123 5.123-2.123-2.123c-.118-.122-.276-.189-.445-.189s-.327.067-.445.189c-.244.244-.244.646 0 .89l2.568 2.568c.122.122.276.189.445.189s.327-.067.445-.189l5.568-5.568c.244-.244.244-.646 0-.89-.118-.122-.276-.189-.445-.189z"/>
                      </svg>
                      <a href={`https://orcid.org/${scholar.orcidId}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                        ORCID: {scholar.orcidId}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                  Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-gray-300">Publications</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {scholar.publicationCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-gray-300">Contributor Type</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      scholar.frequentContributor 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {scholar.frequentContributor ? 'Frequent' : 'Occasional'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Research Areas */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                  Research Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {scholar.keywordIds.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {keyword.displayName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            {scholar.bio && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Biography
                </h2>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                  {scholar.bio}
                </p>
              </div>
            )}

            {/* Selected Publications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Selected Publications
              </h2>
              <div className="space-y-6">
                {scholar.publicationIds.length > 0 ? (
                  scholar.publicationIds.map((publication) => (
                    <div key={publication._id} className="border-l-4 border-blue-500 pl-4 py-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                        {publication.title}
                      </h3>
                      <div className="text-sm text-slate-600 dark:text-gray-300 mb-2">
                        <p className="font-medium">{publication.authors.join(", ")}</p>
                        {publication.citationDetail && (
                          <p className="italic" dangerouslySetInnerHTML={{ 
                            __html: publication.citationDetail
                          }} />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-gray-400 mb-2">
                        {publication.year && <span>{publication.year}</span>}
                        {publication.type && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{publication.type.replace('_', ' ')}</span>
                          </>
                        )}
                        {publication.doi && (
                          <>
                            <span>•</span>
                            <a 
                              href={`https://doi.org/${publication.doi}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              DOI
                            </a>
                          </>
                        )}
                      </div>
                      {publication.url && (
                        <a 
                          href={publication.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          View Publication →
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300">
                      Publication details will be available soon
                    </p>
                  </div>
                )}
                {scholar.publicationCount > scholar.publicationIds.length && (
                  <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                      View All {scholar.publicationCount} Publications →
                    </button>
                  </div>
                )}
              </div>
            </div>


            {/* Research Interests */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Research Interests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholar.keywordIds.map((keyword, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-slate-700 dark:text-gray-300">{keyword.displayName}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Contact Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <div className="flex flex-wrap gap-4">
                {scholar.email && (
                  <a
                    href={`mailto:${scholar.email}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                )}
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search More Scholars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="search-guide" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Search Guide
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn how to effectively use our platform to discover labour research in Vietnam
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Our Platform
                </h2>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                  Each scholar&apos;s entry on this platform is manually compiled. We draw on their public or institutional profiles where available, and develop keywords based on featured publications and our own understanding of their work. This often involves linking these scholars&apos; research to real-world issues or commonly studied topics in labour studies.
                </p>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                  We have read and/or cited many of the scholars listed here in our research projects. This familiarity helps us ensure that the keywords and topics are meaningful and relevant.
                </p>
              </div>
            </div>

            {/* Search Steps */}
            <div className="space-y-12">
              
              {/* Step 1: Basic Search */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Basic Search</h3>
                </div>
                <div className="pl-16">
                  <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                    Start by typing a topic* such as <strong>industrial relations</strong>, <strong>labour law</strong>, <strong>labour dispute resolution</strong>, into the search bar. A drop-down menu will suggest available keywords. Please select one from the list.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      <strong>Please note:</strong> We use British English spelling (e.g. labour, organisation)
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: Understanding Results */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Understanding Search Results</h3>
                </div>
                <div className="pl-16">
                  <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                    When you choose a keyword and click the search icon, you&apos;ll see a list of scholars whose work relates to that topic. Click on a scholar&apos;s name to view their entry. Each entry includes:
                  </p>
                  <ul className="text-slate-700 dark:text-gray-300 space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Links to their public or institutional profile (if available)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Keywords relevant to their publication record
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Bibliographic details of selected publications on Vietnam labour
                    </li>
                  </ul>
                  <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                    For some topics, results may also include names listed under <strong>Occasional Contributors</strong>. These are scholars who have one or two publications on Vietnam labour as part of their broader research outputs. Clicking their name will take you to the &quot;Occasional Contributors&quot; page, where their publications and keywords are listed in mini-entries.
                  </p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Please Note
                </h3>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                      <strong>* Not every topic is covered yet.</strong> We develop keywords based on practical topics, or legal and policy issues (such as industrial relations, trade union, labour reforms) rather than conceptual or analytical terms. This platform is a work in progress, and we will update topics and keywords as they emerge.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                      <strong>* The keywords in each scholar&apos;s entry</strong> reflect the main themes we identify in their selected publications on Vietnam labour. They do not cover all of a scholar&apos;s research outputs. Many scholars publish in different fields and/or countries. To explore their broader body of work, you are encouraged to follow the links to their Google Scholar or institutional profile pages.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                      <strong>* We don&apos;t host full-texts,</strong> but we guide you to the people behind the research.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Start Searching
                  </Link>
                  <Link 
                    href="/keywords" 
                    className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    List of Keywords
                  </Link>
                  <Link 
                    href="/occasional-contributors" 
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Occasional Contributors
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
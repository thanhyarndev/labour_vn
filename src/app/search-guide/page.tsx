"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

export default function SearchGuidePage() {
  const [activeTab, setActiveTab] = useState("basics");

  const searchExamples = [
    {
      query: "labour law",
      description: "Tìm kiếm cơ bản về luật lao động",
      results: "Hiển thị các học giả chuyên về luật lao động Việt Nam"
    },
    {
      query: "minimum wage policy",
      description: "Tìm kiếm cụ thể về chính sách tiền lương tối thiểu",
      results: "Tìm thấy các chuyên gia về chính sách tiền lương và kinh tế lao động"
    },
    {
      query: "migrant workers",
      description: "Tìm kiếm về lao động di cư",
      results: "Hiển thị các nhà nghiên cứu về lao động di cư và thị trường lao động"
    },
    {
      query: "trade unions",
      description: "Tìm kiếm về công đoàn và tổ chức lao động",
      results: "Tìm thấy các chuyên gia về quan hệ lao động và đối thoại xã hội"
    }
  ];

  const keywordCategories = [
    {
      category: "Labour Law & Policy",
      keywords: ["labour law", "employment law", "labour policy", "labour rights", "social insurance"],
      description: "Các từ khóa liên quan đến pháp luật và chính sách lao động"
    },
    {
      category: "Labour Relations",
      keywords: ["labour relations", "trade unions", "collective bargaining", "social dialogue", "industrial relations"],
      description: "Từ khóa về quan hệ lao động và đối thoại xã hội"
    },
    {
      category: "Labour Market",
      keywords: ["labour market", "employment", "unemployment", "labour migration", "rural labour"],
      description: "Các khái niệm về thị trường lao động và việc làm"
    },
    {
      category: "Workplace Issues",
      keywords: ["occupational safety", "workplace safety", "child labour", "women workers", "labour protection"],
      description: "Vấn đề tại nơi làm việc và bảo vệ người lao động"
    },
    {
      category: "Economic Aspects",
      keywords: ["minimum wage", "labour economics", "wage policy", "labour productivity", "economic impact"],
      description: "Khía cạnh kinh tế của lao động và việc làm"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="search-guide" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Search Guide
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn how to effectively search for scholars and research in Vietnam labour studies
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center space-x-1">
            {[
              { id: "basics", label: "Search Basics" },
              { id: "keywords", label: "Keywords Guide" },
              { id: "results", label: "Understanding Results" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Basics */}
          {activeTab === "basics" && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  How to Use the Search Bar
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Enter Your Search Terms
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300">
                        Type keywords related to your research interest in the search bar. 
                        You can search by research area, institution, or scholar name.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Review Suggestions
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300">
                        As you type, the system will show keyword suggestions. 
                        Click on a suggestion to use it in your search.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Press Enter or Click Search
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300">
                        Press Enter or click the search button to see results. 
                        The system will show scholars whose research matches your keywords.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Search Examples
                </h2>
                <div className="space-y-4">
                  {searchExamples.map((example, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <code className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded font-mono">
                              &ldquo;{example.query}&rdquo;
                            </code>
                            <span className="text-sm text-slate-500 dark:text-gray-400">
                              {example.description}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            {example.results}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Keywords Guide */}
          {activeTab === "keywords" && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Understanding Keywords
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      Why Keywords Matter
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 mb-4">
                      Keywords are the research areas and topics that scholars specialise in. 
                      Our system matches your search terms with scholars&apos; research keywords to find the most relevant experts.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300">
                      <strong>Note:</strong> We use British English spelling (labour, not labor) to maintain consistency with international academic standards.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Why We Show Scholars Instead of Full-Text Search
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          ✓ Scholar-Based Approach
                        </h4>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          <li>• Find experts who can provide ongoing support</li>
                          <li>• Connect with researchers for collaboration</li>
                          <li>• Access current and future research</li>
                          <li>• Get context and interpretation of findings</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                          ✗ Full-Text Search Limitations
                        </h4>
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          <li>• May return outdated information</li>
                          <li>• No context or expert interpretation</li>
                          <li>• Difficult to assess credibility</li>
                          <li>• No opportunity for follow-up questions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Keyword Categories
                </h2>
                <div className="space-y-6">
                  {keywordCategories.map((category, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        {category.category}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 mb-4">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.keywords.map((keyword, keywordIndex) => (
                          <span
                            key={keywordIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Understanding Results */}
          {activeTab === "results" && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Understanding Search Results
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Result Categories
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            Frequent Contributors
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-300">
                          Scholars who regularly publish research in Vietnam labour studies. 
                          They have extensive expertise and ongoing research projects.
                        </p>
                      </div>
                      <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            Occasional Contributors
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-300">
                          Researchers who have published 1-2 relevant works but may have valuable 
                          insights or work in related fields.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Information in Each Result
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Scholar's name and position",
                        "Institution affiliation",
                        "Research keywords and areas",
                        "Number of publications",
                        "Link to detailed profile"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-600 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      What to Do Next
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Click &ldquo;View Profile&rdquo;</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            Access detailed information about the scholar&apos;s research, publications, and contact details.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Review Their Research</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            Check their publications and research interests to see if they match your needs.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Contact Them</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            Use the provided contact information to reach out for collaboration or questions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vietnam Labour Research Portal</h3>
            <p className="text-slate-300 mb-6">
              Your guide to Vietnam labour research
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/search" className="text-slate-300 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/occasional-contributors" className="text-slate-300 hover:text-white transition-colors">
                Contributors
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

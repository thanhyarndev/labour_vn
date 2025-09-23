"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUpdatesByCategory, getFeaturedUpdates, searchUpdates, getCategoryInfo, type UpdatePost } from "@/lib/updatesData";
import Header from "@/components/Header";

export default function UpdatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUpdates, setFilteredUpdates] = useState<UpdatePost[]>([]);
  const [featuredUpdates, setFeaturedUpdates] = useState<UpdatePost[]>([]);

  useEffect(() => {
    setFeaturedUpdates(getFeaturedUpdates());
  }, []);

  useEffect(() => {
    let updates = getUpdatesByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      updates = searchUpdates(searchQuery);
    }
    
    setFilteredUpdates(updates);
  }, [selectedCategory, searchQuery]);

  const categories = getCategoryInfo();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "new-scholar": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "new-research": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "event": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "analysis": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "announcement": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const getCategoryName = (category: string) => {
    const names = {
      "new-scholar": "New Scholar",
      "new-research": "New Research",
      "event": "Event",
      "analysis": "Analysis",
      "announcement": "Announcement"
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="updates" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Updates & Insights
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest research, new scholars, events, and insights 
              from Vietnam&apos;s labour studies community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Updates */}
      {featuredUpdates.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Featured Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredUpdates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(update.category)}`}>
                        {getCategoryName(update.category)}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        {update.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 line-clamp-2">
                      {update.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {update.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-gray-400">
                      <span>By {update.author}</span>
                      <span>{formatDate(update.publishDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search updates..."
                  className="w-full px-4 py-2 pl-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedCategory === "all" ? "All Updates" : getCategoryName(selectedCategory)}
            </h2>
            <p className="text-slate-600 dark:text-gray-300">
              {filteredUpdates.length} update{filteredUpdates.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredUpdates.length > 0 ? (
            <div className="space-y-6">
              {filteredUpdates.map((update) => (
                <article
                  key={update.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(update.category)}`}>
                        {getCategoryName(update.category)}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        {update.readTime} min read
                      </span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-gray-400">
                      {formatDate(update.publishDate)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {update.title}
                  </h3>

                  <p className="text-slate-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {update.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        By {update.author}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {update.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {update.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{update.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No updates found
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Try adjusting your search criteria or browse different categories
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, research insights, 
            and event announcements directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vietnam Labour Research Portal</h3>
            <p className="text-slate-300 mb-6">
              Keeping the research community connected and informed
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/occasional-contributors" className="text-slate-300 hover:text-white transition-colors">
                Contributors
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/updates" className="text-slate-300 hover:text-white transition-colors">
                Updates
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

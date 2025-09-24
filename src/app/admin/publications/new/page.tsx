"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import SimpleRichTextEditor from "@/components/SimpleRichTextEditor";

export default function NewPublicationPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    citationDetail: "",
    publicationType: "article" as "article" | "journal-article" | "book" | "chapter" | "conference" | "report" | "thesis" | "other",
    authors: "",
    abstract: "",
    doi: "",
    url: "",
    citationCount: "",
    quote: "",
    isVietnamLabourRelated: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.authors) {
      showError("Validation Error", "Title and authors are required");
      return;
    }
    
    setLoading(true);

    try {
      const authorsArray = formData.authors
        .split(",")
        .map((author) => author.trim())
        .filter((author) => author.length > 0);

      const response = await fetch("/api/admin/publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: formData.year ? parseInt(formData.year) : undefined,
          citationCount: formData.citationCount ? parseInt(formData.citationCount) : undefined,
          authors: authorsArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess("Creation Successful", "New publication has been created successfully");
        router.push("/admin/publications");
      } else {
        showError("Creation Error", data.error || "Unable to create new publication");
      }
    } catch (error) {
      console.error("Error creating publication:", error);
      showError("Creation Error", "An error occurred while creating the publication");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
  };


  // const getTypeLabel = (type: string) => {
  //   const typeLabels: { [key: string]: string } = {
  //     article: "Article",
  //     "journal-article": "Journal Article",
  //     book: "Book",
  //     chapter: "Book Chapter",
  //     conference: "Conference",
  //     report: "Report",
  //     thesis: "Thesis",
  //     other: "Other",
  //   };
  //   return typeLabels[type] || "Article";
  // };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Publication</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create a new academic publication for a scholar
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">Enter basic information about the publication</p>
          </div>
          <div className="p-6 space-y-6">

            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Publication title"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="year" className="block text-sm font-semibold text-gray-700">
                  Publication Year
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max="2030"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="2023"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="publicationType" className="block text-sm font-semibold text-gray-700">
                  Publication Type
                </label>
                <select
                  name="publicationType"
                  id="publicationType"
                  value={formData.publicationType}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="article">Article</option>
                  <option value="journal-article">Journal Article</option>
                  <option value="book">Book</option>
                  <option value="chapter">Book Chapter</option>
                  <option value="conference">Conference Paper</option>
                  <option value="report">Report</option>
                  <option value="thesis">Thesis</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="citationDetail" className="block text-sm font-semibold text-gray-700">
                Citation Detail
              </label>
              <SimpleRichTextEditor
                value={formData.citationDetail}
                onChange={(value) => setFormData(prev => ({ ...prev, citationDetail: value }))}
                placeholder="Journal, publisher, conference... (Use Ctrl+B for bold, Ctrl+I for italic)"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="authors" className="block text-sm font-semibold text-gray-700">
                Authors
              </label>
              <input
                type="text"
                name="authors"
                id="authors"
                value={formData.authors}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Author 1, Author 2, Author 3"
              />
              <p className="text-xs text-gray-500">Separate authors with commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="abstract" className="block text-sm font-semibold text-gray-700">
                Abstract
              </label>
              <textarea
                name="abstract"
                id="abstract"
                rows={4}
                value={formData.abstract}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Brief description of the publication..."
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Additional Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">Optional details and metadata</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="doi" className="block text-sm font-semibold text-gray-700">
                  DOI
                </label>
                <input
                  type="text"
                  name="doi"
                  id="doi"
                  value={formData.doi}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="10.1000/example"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="url" className="block text-sm font-semibold text-gray-700">
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="https://example.com/paper"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="citationCount" className="block text-sm font-semibold text-gray-700">
                  Citation Count
                </label>
                <input
                  type="number"
                  name="citationCount"
                  id="citationCount"
                  value={formData.citationCount}
                  onChange={handleInputChange}
                  min="0"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Vietnam Labour Related
                </label>
                <div className="flex items-center p-3 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    name="isVietnamLabourRelated"
                    id="isVietnamLabourRelated"
                    checked={formData.isVietnamLabourRelated}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVietnamLabourRelated: e.target.checked }))}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-700">
                      {formData.isVietnamLabourRelated ? 'Yes' : 'No'}
                    </span>
                    <p className="text-xs text-gray-500">This publication is related to Vietnam labour issues</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="quote" className="block text-sm font-semibold text-gray-700">
                Quote
              </label>
              <textarea
                name="quote"
                id="quote"
                rows={3}
                value={formData.quote}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Key quote or excerpt from the publication..."
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium text-white rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Publication
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
}

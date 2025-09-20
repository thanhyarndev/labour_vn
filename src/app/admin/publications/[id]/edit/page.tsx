"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

interface Publication {
  _id: string;
  title: string;
  year?: number;
  venue?: string;
  type?: string;
  authors: string[];
  abstract?: string;
  quote?: string;
  doi?: string;
  url?: string;
  citations: number;
  isVietnamLaborRelated?: boolean | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    journalPublisher: "",
    publicationType: "article" as "article" | "journal-article" | "book" | "chapter" | "conference" | "report" | "thesis" | "other",
    authors: "",
    abstract: "",
    doi: "",
    url: "",
    citationCount: "",
    quote: "",
    isSelected: false,
  });

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`/api/admin/publications/${resolvedParams.id}`);
        const data = await response.json();
        
        if (data.success) {
          const pub = data.data;
          setPublication(pub);
          setFormData({
            title: pub.title || "",
            year: pub.year?.toString() || "",
            journalPublisher: pub.venue || "",
            publicationType: pub.type === "article" ? "article" : (pub.type as "article" | "journal-article" | "book" | "chapter" | "conference" | "report" | "thesis" | "other") || "article",
            authors: pub.authors?.join(", ") || "",
            abstract: pub.abstract || "",
            doi: pub.doi || "",
            url: pub.url || "",
            citationCount: pub.citations?.toString() || "",
            quote: pub.quote || "",
            isSelected: pub.isVietnamLaborRelated === true,
          });
        } else {
          showError("Data Loading Error", data.error || "Unable to load publication information");
          router.push("/admin/publications");
        }
      } catch (error) {
        console.error("Error fetching publication:", error);
        showError("Data Loading Error", "An error occurred while loading publication data");
        router.push("/admin/publications");
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [params, showError, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.authors) {
      showError("Validation Error", "Title and authors are required");
      return;
    }
    
    setSaving(true);

    try {
      const authorsArray = formData.authors
        .split(",")
        .map((author) => author.trim())
        .filter((author) => author.length > 0);

      const resolvedParams = await params;
      const response = await fetch(`/api/admin/publications/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          authors: authorsArray,
          year: formData.year ? parseInt(formData.year) : undefined,
          venue: formData.journalPublisher,
          type: formData.publicationType === 'journal-article' ? 'article' : formData.publicationType,
          abstract: formData.abstract,
          quote: formData.quote,
          doi: formData.doi && formData.doi.trim() !== '' ? formData.doi : undefined,
          url: formData.url && formData.url.trim() !== '' ? formData.url : undefined,
          citations: formData.citationCount ? parseInt(formData.citationCount) : 0,
          isVietnamLaborRelated: formData.isSelected,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess("Update Successful", "Publication has been updated successfully");
        router.push("/admin/publications");
      } else {
        showError("Publication Update Error", data.error || "Unable to update publication");
      }
    } catch (error) {
      console.error("Error updating publication:", error);
      showError("Publication Update Error", "An error occurred while updating publication");
    } finally {
      setSaving(false);
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
  //     conference: "Conference Paper",
  //     report: "Report",
  //     thesis: "Thesis",
  //     other: "Other",
  //   };
  //   return typeLabels[type] || "Article";
  // };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Publication Not Found</h1>
          <p className="text-gray-600 mb-6">The publication you are looking for does not exist or has been deleted.</p>
          <button
            onClick={() => router.push("/admin/publications")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Publication</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update academic publication information
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">Update basic publication information</p>
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
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
              <label htmlFor="journalPublisher" className="block text-sm font-semibold text-gray-700">
                Publication Venue
              </label>
              <input
                type="text"
                name="journalPublisher"
                id="journalPublisher"
                value={formData.journalPublisher}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Journal, publisher, conference..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="authors" className="block text-sm font-semibold text-gray-700">
                Authors <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authors"
                id="authors"
                required
                value={formData.authors}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
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
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Vietnam Labor Related
                </label>
                <div className="flex items-center p-3 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    name="isSelected"
                    id="isSelected"
                    checked={formData.isSelected}
                    onChange={(e) => setFormData(prev => ({ ...prev, isSelected: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-700">Yes</span>
                    <p className="text-xs text-gray-500">This publication is related to Vietnam labor issues</p>
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
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
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
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Publication
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


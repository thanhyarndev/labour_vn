"use client";

import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

interface Scholar {
  _id: string;
  fullName: string;
  affiliation?: string;
  slug: string;
}

interface CreateScholarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScholarCreated: (scholar: Scholar) => void;
}

export function CreateScholarModal({ isOpen, onClose, onScholarCreated }: CreateScholarModalProps) {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    affiliation: "",
    email: "",
    bio: "",
    researchInterests: "",
    keywords: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const keywordsArray = formData.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);

      // const researchInterestsArray = formData.researchInterests
      //   .split(",")
      //   .map((interest) => interest.trim())
      //   .filter((interest) => interest.length > 0);

      // Generate slug from fullName
      const slug = formData.fullName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const response = await fetch("/api/admin/scholars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          familyName: formData.fullName.split(' ').pop() || '',
          givenName: formData.fullName.split(' ').slice(0, -1).join(' '),
          normalizedName: formData.fullName.toLowerCase().trim(),
          slug: slug,
          affiliation: formData.affiliation,
          email: formData.email,
          bio: formData.bio,
          keywordSlugs: [], // No existing keywords
          newKeywords: keywordsArray.map(keyword => ({
            name: keyword.toLowerCase().replace(/\s+/g, '-'),
            displayName: keyword,
            slug: keyword.toLowerCase().replace(/\s+/g, '-'),
            description: `Research interest: ${keyword}`,
            isApproved: true
          })),
          publications: [],
          status: "active"
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess("Scholar created", "New scholar has been created successfully");
        onScholarCreated(data.data);
        handleClose();
      } else {
        showError("Error creating scholar", data.error || "Failed to create scholar");
      }
    } catch (error) {
      console.error("Error creating scholar:", error);
      showError("Error creating scholar", "An error occurred while creating the scholar");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      affiliation: "",
      email: "",
      bio: "",
      researchInterests: "",
      keywords: "",
    });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-2xl pointer-events-auto border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Create New Scholar</h3>
                  <p className="text-sm text-gray-600">Add a new scholar to the system</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="affiliation" className="block text-sm font-semibold text-gray-700">
                  Affiliation
                </label>
                <input
                  type="text"
                  name="affiliation"
                  id="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="University of Example"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="john.smith@university.edu"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                Biography
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Brief biography of the scholar..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="researchInterests" className="block text-sm font-semibold text-gray-700">
                Research Interests
              </label>
              <input
                type="text"
                name="researchInterests"
                id="researchInterests"
                value={formData.researchInterests}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Labour economics, Social policy, Migration studies"
              />
              <p className="text-xs text-gray-500">Separate interests with commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="keywords" className="block text-sm font-semibold text-gray-700">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                id="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="labour law, employment, workers rights"
              />
              <p className="text-xs text-gray-500">Separate keywords with commas</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 inline-block"></div>
                    Creating...
                  </>
                ) : (
                  "Create Scholar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

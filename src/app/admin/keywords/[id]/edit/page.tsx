"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { generateSlug } from "@/utils/slugGenerator";
import { useToast } from "@/contexts/ToastContext";

interface Keyword {
  _id: string;
  name: string;
  displayName: string;
  slug: string;
  aliases: string[];
  description?: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditKeywordPage() {
  const router = useRouter();
  const params = useParams();
  const { showSuccess, showError } = useToast();
  const keywordId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [keyword, setKeyword] = useState<Keyword | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    aliases: "",
    slug: "",
    description: "",
    isApproved: true,
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  // Fetch keyword data
  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/keywords/${keywordId}`);
        const data = await response.json();
        
        if (data.success) {
          setKeyword(data.data);
          setFormData({
            name: data.data.name,
            displayName: data.data.displayName,
            aliases: data.data.aliases.join(", "),
            slug: data.data.slug,
            description: data.data.description || "",
            isApproved: data.data.isApproved,
          });
        } else {
          showError("Data Loading Error", data.error || "Unable to load keyword information");
          router.push("/admin/keywords");
        }
      } catch (error) {
        console.error("Error fetching keyword:", error);
        showError("Data Loading Error", "An error occurred while loading keyword data");
        router.push("/admin/keywords");
      } finally {
        setLoading(false);
      }
    };

    if (keywordId) {
      fetchKeyword();
    }
  }, [keywordId, router, showError]);

  // Auto-generate slug from display name
  useEffect(() => {
    if (!isSlugManuallyEdited && formData.displayName) {
      const generatedSlug = generateSlug(formData.displayName);
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug,
        name: generatedSlug // Also update name field
      }));
    }
  }, [formData.displayName, isSlugManuallyEdited]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const aliasesArray = formData.aliases
        .split(",")
        .map((alias) => alias.trim())
        .filter((alias) => alias.length > 0);

      const response = await fetch(`/api/admin/keywords/${keywordId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          aliases: aliasesArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess("Update Successful", "Keyword information has been updated");
        router.push("/admin/keywords");
      } else {
        showError("Update Error", data.error || "Unable to update keyword");
      }
    } catch (error) {
      console.error("Error updating keyword:", error);
      showError("Update Error", "An error occurred while updating keyword");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle slug field specially
    if (name === 'slug') {
      setIsSlugManuallyEdited(true);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        name: value // Also update name field when slug is manually edited
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!keyword) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Keyword Not Found</h2>
          <p className="text-gray-600 mb-6">The keyword you are looking for does not exist or has been deleted.</p>
          <button
            onClick={() => router.push("/admin/keywords")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Keyword</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update keyword information and settings
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">Update basic keyword information</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="displayName" className="block text-sm font-semibold text-gray-700">
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  required
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Example: Labor Law"
                />
                <p className="text-xs text-gray-500">Display name for users</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-semibold text-gray-700">
                  Slug <span className="text-red-500">*</span>
                  {!isSlugManuallyEdited && (
                    <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      Auto-generated
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="labor-law"
                  />
                  {!isSlugManuallyEdited && formData.slug && (
                    <button
                      type="button"
                      onClick={() => setIsSlugManuallyEdited(true)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {isSlugManuallyEdited 
                    ? "Friendly URL used in paths (editable)" 
                    : "Friendly URL automatically generated from Display Name"
                  }
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Standardized Name <span className="text-red-500">*</span>
                <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Auto-sync
                </span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50"
                placeholder="labor-law"
                readOnly
              />
              <p className="text-xs text-gray-500">No diacritics, lowercase, automatically synced with slug</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="aliases" className="block text-sm font-semibold text-gray-700">
                Synonyms
              </label>
              <input
                type="text"
                name="aliases"
                id="aliases"
                value={formData.aliases}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="labor law, employment law, work law"
              />
              <p className="text-xs text-gray-500">Synonyms separated by commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Brief description of this keyword..."
              />
              <p className="text-xs text-gray-500">Detailed description of the keyword (optional)</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </h3>
            <p className="text-sm text-gray-600 mt-1">Configure status and display permissions</p>
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="isApproved"
                  checked={formData.isApproved}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="isApproved" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Approved
                </label>
                <p className="text-sm text-gray-500">
                  This keyword will be displayed in search and used by users
                </p>
              </div>
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
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
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
                Update Keyword
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

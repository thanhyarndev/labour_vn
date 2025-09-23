"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreateScholarInput, CreatePublicationInput, IPublication, CreateKeywordInput, IKeyword } from "@/models";
import { generateUniqueSlug } from "@/utils/slugGenerator";
import CreatePublicationModal from "@/components/CreatePublicationModal";
import LinkPublicationModal from "@/components/LinkPublicationModal";
import CreateKeywordModal from "@/components/CreateKeywordModal";
import LinkKeywordModal from "@/components/LinkKeywordModal";
import { useToast } from "@/contexts/ToastContext";
import { useConfirmation } from "@/hooks/useConfirmation";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

export default function CreateScholarPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const confirmation = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateScholarInput>({
    firstName: "",
    lastName: "",
    middleName: "",
    title: "",
    position: "",
    institution: "",
    department: "",
    email: "",
    phone: "",
    website: "",
    orcidId: "",
    googleScholarUrl: "",
    institutionalProfileUrl: "",
    bio: "",
    researchInterests: "",
    expertiseAreas: ""
  });

  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [manualSlug, setManualSlug] = useState("");
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [slugValidation, setSlugValidation] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: true, message: "" });

  // Publications state
  const [publications, setPublications] = useState<IPublication[]>([]);
  const [newPublications, setNewPublications] = useState<IPublication[]>([]);
  const [showCreatePublicationModal, setShowCreatePublicationModal] = useState(false);
  const [showLinkPublicationModal, setShowLinkPublicationModal] = useState(false);
  const [publicationLoading, setPublicationLoading] = useState(false);

  // Keywords state
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const [newKeywords, setNewKeywords] = useState<IKeyword[]>([]);
  const [showCreateKeywordModal, setShowCreateKeywordModal] = useState(false);
  const [showLinkKeywordModal, setShowLinkKeywordModal] = useState(false);
  const [keywordLoading, setKeywordLoading] = useState(false);

  // Mock existing slugs - in real app, this would come from API
  useEffect(() => {
    // This would be fetched from API in real implementation
    setExistingSlugs([
      "nguyen-van-an",
      "tran-thi-binh",
      "le-hoang-nam",
      "pham-thi-mai"
    ]);
  }, []);

  // Auto-generate slug when name fields change
  useEffect(() => {
    if (!isManualSlug) {
      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
      if (fullName) {
        const slug = generateUniqueSlug(fullName, existingSlugs);
        setFormData(prev => ({
          ...prev,
          slug: slug
        }));
        setManualSlug(slug);
      }
    }
  }, [formData.firstName, formData.middleName, formData.lastName, existingSlugs, isManualSlug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualSlug(value);
    setFormData(prev => ({
      ...prev,
      slug: value
    }));
    setIsManualSlug(true);
  };

  const validateSlug = (slug: string) => {
    if (!slug) {
      setSlugValidation({ isValid: false, message: "Slug is required" });
      return false;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setSlugValidation({ isValid: false, message: "Slug can only contain lowercase letters, numbers, and hyphens" });
      return false;
    }

    if (slug.startsWith('-') || slug.endsWith('-')) {
      setSlugValidation({ isValid: false, message: "Slug cannot start or end with hyphens" });
      return false;
    }

    if (existingSlugs.includes(slug)) {
      setSlugValidation({ isValid: false, message: "This slug is already in use" });
      return false;
    }

    setSlugValidation({ isValid: true, message: "Slug is available" });
    return true;
  };

  const handleCheckSlug = () => {
    validateSlug(manualSlug);
  };

  const handleRegenerateSlug = () => {
    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
    if (fullName) {
      const slug = generateUniqueSlug(fullName, existingSlugs);
      setManualSlug(slug);
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
      setIsManualSlug(false);
      validateSlug(slug);
    }
  };

  const handleCreatePublication = async (publicationData: CreatePublicationInput) => {
    try {
      setPublicationLoading(true);
      // Add to newPublications state instead of creating immediately
      const newPublication: IPublication = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _id: `temp_${Date.now()}` as unknown as any, // Temporary ID
        title: publicationData.title,
        authors: publicationData.authors,
        year: publicationData.year || new Date().getFullYear(),
        citationDetail: publicationData.citationDetail || '',
        type: (publicationData.publicationType as 'article' | 'journal-article' | 'book' | 'chapter' | 'conference' | 'report' | 'thesis' | 'other') || 'article',
        abstract: publicationData.abstract || '',
        doi: publicationData.doi || '',
        url: publicationData.url || '',
        citations: publicationData.citationCount || 0,
        isVietnamLabourRelated: publicationData.isSelected ?? true,
        scholarIds: [],
        keywordIds: [],
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setNewPublications(prev => [...prev, newPublication]);
      setShowCreatePublicationModal(false);
      showSuccess('Publication added successfully!', 'The publication has been added to the scholar');
    } catch (error) {
      console.error('Failed to add publication:', error);
      showError('Failed to add publication', 'Could not add the publication');
    } finally {
      setPublicationLoading(false);
    }
  };

  const handleLinkPublication = async (publicationIds: string[]) => {
    try {
      setPublicationLoading(true);
      
      // Fetch all publications from the main API to get the full data
      const response = await fetch('/api/admin/publications?limit=100');
      const data = await response.json();
      
      if (data.success) {
        // Filter the publications that were selected
        const selectedPublications = data.data.filter((pub: IPublication) => 
          publicationIds.includes(pub._id.toString())
        );
        
        setPublications(prev => [...prev, ...selectedPublications]);
        setShowLinkPublicationModal(false);
        showSuccess(`${selectedPublications.length} publication${selectedPublications.length !== 1 ? 's' : ''} linked successfully!`, 'Publications have been linked to the scholar');
      } else {
        showError('Failed to fetch publications', 'Could not fetch publications');
      }
    } catch (error) {
      console.error('Failed to link publications:', error);
      showError('Failed to link publications', 'Could not link publications to the scholar');
    } finally {
      setPublicationLoading(false);
    }
  };

  const handleRemovePublication = (publicationId: string) => {
    setPublications(prev => prev.filter(pub => pub._id.toString() !== publicationId));
  };

  // Keyword handlers
  const handleCreateKeyword = async (keywordData: CreateKeywordInput) => {
    try {
      setKeywordLoading(true);
      // Add to newKeywords state instead of creating immediately
      const newKeyword: IKeyword = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _id: `temp_${Date.now()}` as unknown as any, // Temporary ID
        name: keywordData.name,
        displayName: keywordData.displayName,
        slug: keywordData.slug || keywordData.name.toLowerCase().replace(/\s+/g, '-'),
        aliases: keywordData.aliases || [],
        description: keywordData.description || '',
        isApproved: keywordData.isApproved ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setNewKeywords(prev => [...prev, newKeyword]);
      setShowCreateKeywordModal(false);
      showSuccess('Keyword added successfully!', 'The keyword has been added to the scholar');
    } catch (error) {
      console.error('Failed to add keyword:', error);
      showError('Failed to add keyword', 'Could not add the keyword');
    } finally {
      setKeywordLoading(false);
    }
  };

  const handleLinkKeyword = async (keywordIds: string[]) => {
    try {
      setKeywordLoading(true);
      // Fetch all selected keywords
      const responses = await Promise.all(
        keywordIds.map(id => fetch(`/api/admin/keywords/${id}`))
      );
      
      const results = await Promise.all(
        responses.map(response => response.json())
      );
      
      // Add all successfully fetched keywords to the list
      const newKeywords = results
        .filter(result => result.success)
        .map(result => result.data);
      
      setKeywords(prev => [...prev, ...newKeywords]);
      setShowLinkKeywordModal(false);
      showSuccess(`${newKeywords.length} keyword${newKeywords.length !== 1 ? 's' : ''} linked successfully!`, 'Keywords have been linked to the scholar');
    } catch (error) {
      console.error('Failed to link keywords:', error);
      showError('Failed to link keywords', 'Could not link keywords to the scholar');
    } finally {
      setKeywordLoading(false);
    }
  };

  const handleRemoveKeyword = (keywordId: string) => {
    setKeywords(prev => prev.filter(keyword => keyword._id.toString() !== keywordId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate slug before submitting
    if (!validateSlug(manualSlug)) {
      showError("Validation Error", "Please fix the slug validation errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const scholarData = {
        ...formData,
        slug: manualSlug,
        // Existing keywords and publications (to link)
        keywordSlugs: keywords.map(k => k.slug), // Add keywordSlugs for existing keywords
        keywordIds: keywords.map(k => k._id),
        keywordNames: keywords.map(k => k.name),
        publicationIds: publications.map(pub => pub._id),
        // New keywords and publications (to create)
        newKeywords: newKeywords.map(k => ({
          name: k.name,
          displayName: k.displayName,
          slug: k.slug,
          aliases: k.aliases,
          description: k.description,
          isApproved: k.isApproved
        })),
        newPublications: newPublications.map(pub => ({
          title: pub.title,
          authors: pub.authors,
          year: pub.year ? parseInt(pub.year.toString()) : undefined,
          citationDetail: pub.citationDetail,
          type: pub.type,
          abstract: pub.abstract,
          quote: pub.quote,
          doi: pub.doi,
          url: pub.url,
          isVietnamLabourRelated: pub.isVietnamLabourRelated,
          keywordSlugs: [], // Will be linked later
          tags: pub.tags || []
        }))
      };

      // Create scholar via API
      const response = await fetch('/api/admin/scholars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scholarData)
      });

      if (!response.ok) {
        throw new Error('Failed to create scholar');
      }

      const result = await response.json();
      console.log("Scholar created:", result);
      
      showSuccess("Scholar created successfully!", "The scholar has been added to the system");
      router.push("/admin/scholars");
    } catch (error) {
      console.error("Failed to create scholar:", error);
      showError("Failed to create scholar", "Could not create the scholar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/scholars"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Back to Scholars
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          Create New Scholar
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {/* Basic Information */}
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Michael"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* URL Slug */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={manualSlug}
                  onChange={handleSlugChange}
                  className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    slugValidation.isValid 
                      ? 'border-gray-300 dark:border-gray-600' 
                      : 'border-red-500 dark:border-red-500'
                  }`}
                  placeholder="john-michael-doe"
                />
                <button
                  type="button"
                  onClick={handleCheckSlug}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={handleRegenerateSlug}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                >
                  Regenerate
                </button>
              </div>
              
              {/* Validation Message */}
              <div className={`text-sm ${
                slugValidation.isValid 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {slugValidation.message}
              </div>
              
              {/* Help Text */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isManualSlug 
                  ? "Manual edit mode - changes won't auto-update from name"
                  : "Auto-generated from name - will update when you change the name fields"
                }
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Dr., Prof., etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Lecturer, Professor, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Institution
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="University of Melbourne"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Asian Studies"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="scholar@university.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://scholar.website.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ORCID ID
              </label>
              <input
                type="text"
                name="orcidId"
                value={formData.orcidId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="0000-0000-0000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Scholar URL
              </label>
              <input
                type="url"
                name="googleScholarUrl"
                value={formData.googleScholarUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://scholar.google.com/citations?user=..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Institutional Profile URL
              </label>
              <input
                type="url"
                name="institutionalProfileUrl"
                value={formData.institutionalProfileUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://university.edu/profile/scholar"
              />
            </div>
          </div>
        </div>

        {/* Research Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Research Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief biography of the scholar..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Interests
              </label>
              <textarea
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Labour studies, migration, economic development..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expertise Areas
              </label>
              <textarea
                name="expertiseAreas"
                value={formData.expertiseAreas}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Qualitative research, policy analysis, fieldwork..."
              />
            </div>
          </div>
        </div>


        {/* Publications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Publications
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  console.log('Create modal clicked');
                  setShowCreatePublicationModal(true);
                }}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                + Create New
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Link modal clicked');
                  setShowLinkPublicationModal(true);
                }}
                className="px-3 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors"
              >
                + Link Existing
              </button>
            </div>
          </div>

          {(publications.length === 0 && newPublications.length === 0) ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="mt-2">No publications added yet</p>
              <p className="text-sm">Create new or link existing publications for this scholar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Existing publications */}
              {publications.map((publication) => (
                <div key={publication._id.toString()} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {publication.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {publication.authors?.join(', ')} • {publication.year}
                      </p>
                      {publication.citationDetail && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1" dangerouslySetInnerHTML={{ 
                          __html: publication.citationDetail.replace(/\*([^*]+)\*/g, '<em>$1</em>') 
                        }} />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePublication(publication._id.toString())}
                      className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* New publications */}
              {newPublications.map((publication) => (
                <div key={publication._id.toString()} className="border border-blue-200 dark:border-blue-600 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {publication.title}
                        </h4>
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {publication.authors?.join(', ')} • {publication.year}
                      </p>
                      {publication.citationDetail && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1" dangerouslySetInnerHTML={{ 
                          __html: publication.citationDetail.replace(/\*([^*]+)\*/g, '<em>$1</em>') 
                        }} />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewPublications(prev => prev.filter(p => p._id.toString() !== publication._id.toString()))}
                      className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keywords Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Research Keywords
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowCreateKeywordModal(true)}
                className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
              >
                + Create New
              </button>
              <button
                type="button"
                onClick={() => setShowLinkKeywordModal(true)}
                className="px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
              >
                + Link Existing
              </button>
            </div>
          </div>

          {(keywords.length === 0 && newKeywords.length === 0) ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="mt-2">No keywords added yet</p>
              <p className="text-sm">Create new or link existing keywords for this scholar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Existing keywords */}
              {keywords.map((keyword) => (
                <div key={keyword._id.toString()} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {keyword.displayName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {keyword.name}
                      </p>
                      {keyword.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {keyword.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword._id.toString())}
                      className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* New keywords */}
              {newKeywords.map((keyword) => (
                <div key={keyword._id.toString()} className="border border-green-200 dark:border-green-600 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {keyword.displayName}
                        </h4>
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {keyword.name}
                      </p>
                      {keyword.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {keyword.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewKeywords(prev => prev.filter(k => k._id.toString() !== keyword._id.toString()))}
                      className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/scholars"
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? "Creating..." : "Create Scholar"}
          </button>
        </div>
      </form>


      {/* Modals */}
      <CreatePublicationModal
        isOpen={showCreatePublicationModal}
        onClose={() => {
          console.log('Create modal closing');
          setShowCreatePublicationModal(false);
        }}
        onSubmit={handleCreatePublication}
        scholarName={`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}
        loading={publicationLoading}
      />

      <LinkPublicationModal
        isOpen={showLinkPublicationModal}
        onClose={() => {
          console.log('Link modal closing');
          setShowLinkPublicationModal(false);
        }}
        onLink={handleLinkPublication}
        scholarName={`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}
        loading={publicationLoading}
        excludePublicationIds={publications.map(pub => pub._id.toString())}
      />

      <CreateKeywordModal
        isOpen={showCreateKeywordModal}
        onClose={() => {
          console.log('Create keyword modal closing');
          setShowCreateKeywordModal(false);
        }}
        onSubmit={handleCreateKeyword}
        loading={keywordLoading}
        existingKeywords={[]} // TODO: Fetch all existing keywords to prevent duplicates
      />

      <LinkKeywordModal
        isOpen={showLinkKeywordModal}
        onClose={() => {
          console.log('Link keyword modal closing');
          setShowLinkKeywordModal(false);
        }}
        onLink={handleLinkKeyword}
        scholarName={`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}
        loading={keywordLoading}
        excludeKeywordIds={keywords.map(keyword => keyword._id.toString())}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        onClose={confirmation.close}
        onConfirm={confirmation.onConfirm || (() => {})}
        title={confirmation.title}
        message={confirmation.message}
        confirmText={confirmation.confirmText}
        cancelText={confirmation.cancelText}
        type={confirmation.type}
        isLoading={false}
      />
    </div>
  );
}
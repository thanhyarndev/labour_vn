"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";
import { useConfirmation } from "@/hooks/useConfirmation";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

interface Publication {
  _id: string;
  scholarIds: Array<{
    _id: string;
    fullName: string;
    affiliation?: string;
    slug: string;
  }>;
  title: string;
  year?: number;
  citationDetail?: string;
  type?: string;
  authors: string[];
  abstract?: string;
  quote?: string;
  doi?: string;
  url?: string;
  keywordIds: Array<{
    _id: string;
    name: string;
    displayName: string;
    slug: string;
  }>;
  tags: string[];
  isVietnamLabourRelated?: boolean | null;
  citations: number;
  createdAt: string;
  updatedAt: string;
}

export default function PublicationsPage() {
  const { showSuccess, showError } = useToast();
  const confirmation = useConfirmation();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    year: "",
    type: "",
    isVietnamLabourRelated: "",
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        search,
        ...filters,
      });
      
      const response = await fetch(`/api/admin/publications?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setPublications(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, filters]);

  useEffect(() => {
    fetchPublications();
  }, [page, search, filters, fetchPublications]);

  const handleDelete = async (id: string, publicationTitle: string) => {
    const confirmed = await confirmation.confirm({
      title: "Delete Publication",
      message: `Are you sure you want to delete the publication "${publicationTitle}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
    });

    if (!confirmed) return;

    try {
      setDeletingId(id);
      const response = await fetch(`/api/admin/publications/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (data.success) {
        showSuccess("Delete Successful", "Publication has been removed from the system");
        fetchPublications();
      } else {
        showError("Delete Error", data.error || "Unable to delete publication");
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
      showError("Delete Error", "An error occurred while deleting the publication");
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeLabel = (type?: string) => {
    const typeLabels: { [key: string]: string } = {
      article: "Article",
      "journal-article": "Journal Article",
      book: "Book",
      chapter: "Book Chapter",
      conference: "Conference",
      report: "Report",
      thesis: "Thesis",
      other: "Other",
    };
    return typeLabels[type || "article"] || "Article";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Publications</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage academic publications in the system
          </p>
        </div>
        <Link
          href="/admin/publications/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add New Publication
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <input
              type="text"
              placeholder="Search publications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Year"
              value={filters.year}
              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="article">Article</option>
              <option value="journal-article">Journal Article</option>
              <option value="book">Book</option>
              <option value="chapter">Book Chapter</option>
              <option value="conference">Conference</option>
              <option value="report">Report</option>
              <option value="thesis">Thesis</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <select
              value={filters.isVietnamLabourRelated}
              onChange={(e) => setFilters(prev => ({ ...prev, isVietnamLabourRelated: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">VN Related</option>
              <option value="false">Not VN Related</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Publication
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VN Related
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quote
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Citations
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publications.map((publication) => (
                    <tr key={publication._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {publication.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate" dangerouslySetInnerHTML={{ 
                            __html: publication.citationDetail || "No citation detail"
                          }} />
                          {publication.doi && (
                            <div className="text-xs text-blue-600 truncate">
                              DOI: {publication.doi}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {publication.authors && publication.authors.length > 0 ? (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {publication.authors[0]}
                              </div>
                              {publication.authors.length > 1 && (
                                <div className="text-xs text-gray-400">
                                  +{publication.authors.length - 1} other authors
                                </div>
                              )}
                            </>
                          ) : publication.scholarIds && publication.scholarIds.length > 0 ? (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {publication.scholarIds[0].fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {publication.scholarIds[0].affiliation || "No affiliation"}
                              </div>
                              {publication.scholarIds.length > 1 && (
                                <div className="text-xs text-gray-400">
                                  +{publication.scholarIds.length - 1} other authors
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">
                              No author
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {publication.year || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getTypeLabel(publication.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {publication.isVietnamLabourRelated === true ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : publication.isVietnamLabourRelated === false ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            No
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Undetermined
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-sm">
                          {publication.quote ? (
                            <p className="text-sm text-gray-600 italic truncate" title={publication.quote}>
                              &ldquo;{publication.quote}&rdquo;
                            </p>
                          ) : (
                            <span className="text-sm text-gray-400 italic">No quote</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {publication.citations || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/admin/publications/${publication._id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(publication._id, publication.title)}
                            disabled={deletingId === publication._id}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingId === publication._id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent mr-1"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Page <span className="font-medium">{page}</span> of{" "}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
        isLoading={deletingId !== null}
      />
    </div>
  );
}

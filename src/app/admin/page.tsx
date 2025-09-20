"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  keywords: number;
  scholars: number;
  publications: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    time: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    keywords: 0,
    scholars: 0,
    publications: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [keywordsRes, scholarsRes, publicationsRes] = await Promise.all([
        fetch("/api/admin/keywords?limit=1"),
        fetch("/api/admin/scholars?limit=1"),
        fetch("/api/admin/publications?limit=1")
      ]);

      const [keywordsData, scholarsData, publicationsData] = await Promise.all([
        keywordsRes.json(),
        scholarsRes.json(),
        publicationsRes.json()
      ]);

      setStats({
        keywords: keywordsData.pagination?.total || 0,
        scholars: scholarsData.pagination?.total || 0,
        publications: publicationsData.pagination?.total || 0,
        recentActivity: [
          {
            id: "1",
            type: "scholar",
            title: "Nguyễn Văn A has been added to the system",
            time: "2 hours ago"
          },
          {
            id: "2",
            type: "publication",
            title: "New research paper on labor law",
            time: "4 hours ago"
          },
          {
            id: "3",
            type: "keyword",
            title: "Keyword 'labor relations' has been created",
            time: "6 hours ago"
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: "Research Keywords",
      value: stats.keywords,
      href: "/admin/keywords",
      description: "Research topics and themes",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      textColor: "text-slate-600",
      borderColor: "border-slate-200"
    },
    {
      name: "Research Scholars",
      value: stats.scholars,
      href: "/admin/scholars",
      description: "Active researchers and experts",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      name: "Research Publications",
      value: stats.publications,
      href: "/admin/publications",
      description: "Academic papers and studies",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-indigo-600 to-indigo-700",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  const quickActions = [
    {
      name: "Add Research Keyword",
      description: "Create new research topic or theme",
      href: "/admin/keywords/new",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      textColor: "text-slate-600",
      borderColor: "border-slate-200"
    },
    {
      name: "Add Research Scholar",
      description: "Register new researcher profile",
      href: "/admin/scholars/new",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      name: "Add Research Publication",
      description: "Register new academic paper",
      href: "/admin/publications/new",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-indigo-600 to-indigo-700",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-slate-200 dark:border-gray-600 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white font-serif">Welcome to Research Portal</h2>
            <p className="text-slate-700 dark:text-gray-300 text-lg mt-2">Manage your research data and collaborate with scholars</p>
            <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">A comprehensive platform for Vietnam Labor Studies research management</p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${card.bgColor} border ${card.borderColor}`}>
                    <div className={card.textColor}>
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors">
                      {card.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{card.description}</p>
                  </div>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{card.value.toLocaleString()}</span>
                  <span className="text-sm text-slate-600 dark:text-gray-400">{card.value === 1 ? 'entry' : 'entries'}</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-slate-600 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors">
                  <span>View details</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-600 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-serif">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="group flex items-center p-4 rounded-lg border border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-sm transition-all duration-200"
              >
                <div className={`p-2 rounded-lg ${action.bgColor} border ${action.borderColor} group-hover:scale-105 transition-transform duration-200`}>
                  <div className={action.textColor}>
                    {action.icon}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-gray-300">
                    {action.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300">
                    {action.description}
                  </p>
                </div>
                <svg className="w-4 h-4 text-slate-400 dark:text-gray-400 group-hover:text-slate-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-600 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-serif">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 dark:text-white font-medium">{activity.title}</p>
                  <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/admin/activity"
              className="text-sm text-slate-600 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 font-medium flex items-center"
            >
              <span>View all activity</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="about" />

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated researchers behind Vietnam Labour Research Portal
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Who We Are
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-16">
            {/* Tu Phuong Nguyen */}
            <div className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 dark:border-gray-600">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl"></div>
              
              <div className="flex items-start space-x-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    TN
                  </div>
                  </div>
                  <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Tu Phuong Nguyen
                    </h3>
                  <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    PhD, Australian National University
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 text-lg">
                    Lecturer in Asian Studies at Asia Institute, University of Melbourne, Australia
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Research Interests</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      Labour law, labour rights, labour disputes, precarious employment, social protection, and gender equality at work in Vietnam.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Current Project</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      Challenges of pension reform and how factory workers and their households respond to the reform amid rising labour precarity.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Funding</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      University of Melbourne&apos;s Early Career Researcher Grant, Griffith University Postdoctoral Fellowship Scheme, and Labour Research Contest in Vietnam.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                  </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Professional Service</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      Vietnam Country Representative of Association of Mainland Southeast Asia Scholars (AMSEAS), member of Board of Trustees of Asian Law and Society Association (ALSA), member of ALSA award committees and ALSA annual conference&apos;s program committees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-600 dark:to-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Consultancy Work</h4>
                </div>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                  Australian Award Short Course: Knowledge Exchange - Gender Equality Law (funded by Department of Foreign Affairs and Trade, Australia); Research Methodology Training on Labour Relations Research (ILO in Vietnam and Ministry of Labour, Invalids and Social Affairs).
                </p>
              </div>
            </div>

            {/* With Support From */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  With Support From
                </h3>
          </div>
        </div>

            {/* Trang Tran */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 dark:border-gray-600">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-t-3xl"></div>
              
              <div className="flex items-start space-x-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    TT
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Trang Tran
                  </h3>
                  <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    PhD, Monash University
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 text-lg">
                    Lecturer in Law at Deakin Law School, Deakin University, Australia
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Research Interests</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      Labour law and regulatory theory, comparative labour law, labour governance in global value chain, labour resistance and digitalisation, labour history.
            </p>
          </div>

                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Current Projects</h4>
                    </div>
                    <ul className="text-slate-600 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Labour power and law in supply chain
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Grievance mechanisms in Vietnam&apos;s garment industry
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Social media and workers&apos; resistance in Vietnam
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Algorithmic management and the platform work in China
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Migrant workers&apos; access to justice in Japan and Australia
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Funding</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      PhD scholarship under the Australian Research Council Discovery Project (#DP190100821), Post-doctoral Research Fellowship under the Horizon European Research Council grant ERC-2022-COG (New Labour Law, Project Number 101088188).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Professional Service</h4>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      Executive member of Asian Society of Labour Law
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-600 dark:to-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
          </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Consultancy Work</h4>
        </div>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                  Consultant (ILO in Vietnam and Geneva), Ergon Associates
                </p>
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
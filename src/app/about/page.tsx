"use client";

import Link from "next/link";
// import Image from "next/image";
import Header from "@/components/Header";

export default function AboutPage() {
  const founders = [
    {
      name: "Tu Phuong Nguyen",
      title: "Lecturer in Asian Studies",
      affiliation: "University of Melbourne",
      education: "PhD in Sociology, University of Melbourne",
      researchAreas: [
        "Vietnamese labor migration",
        "Gender and work",
        "Social policy in Southeast Asia",
        "Transnational families"
      ],
      keyPublications: [
        "Vietnamese Migrant Workers in Taiwan: Gender, Family, and Work (2023)",
        "Labor Rights and Social Protection for Migrant Workers in Asia (2022)",
        "The Impact of COVID-19 on Vietnamese Labor Migration (2021)"
      ],
      role: "Co-founder and Research Director",
      bio: "Dr. Tu Phuong Nguyen is a leading expert on Vietnamese labor migration and gender studies. Her research focuses on the intersection of migration, work, and family dynamics in Southeast Asia. She has published extensively on labor rights and social protection for migrant workers.",
      avatar: "/images/tu-phuong-nguyen.jpg", // Placeholder
      googleScholar: "https://scholar.google.com/citations?user=tuphuong",
      orcid: "0000-0000-0000-0009"
    },
    {
      name: "Trang Tran",
      title: "Research Fellow",
      affiliation: "Institute of Labor Science and Social Affairs",
      education: "PhD in Economics, Vietnam National University",
      researchAreas: [
        "Labor economics",
        "Social insurance policy",
        "Minimum wage studies",
        "Labor market analysis"
      ],
      keyPublications: [
        "Social Insurance Reform in Vietnam: Challenges and Opportunities (2023)",
        "Minimum Wage Policy and Labor Market Outcomes (2022)",
        "The Future of Work in Vietnam: Automation and Employment (2021)"
      ],
      role: "Co-founder and Technical Director",
      bio: "Dr. Trang Tran is a policy researcher specializing in labor economics and social insurance. Her work has informed numerous policy decisions in Vietnam and has been cited by international organizations including the ILO and World Bank.",
      avatar: "/images/trang-tran.jpg", // Placeholder
      googleScholar: "https://scholar.google.com/citations?user=trangtran",
      orcid: "0000-0000-0000-0010"
    }
  ];

  const projectGoals = [
    {
      title: "Tăng tính hiển thị của nghiên cứu",
      description: "Tạo ra một nền tảng tập trung để các nhà nghiên cứu Việt Nam có thể dễ dàng tìm thấy và kết nối với nhau, đồng thời tăng cường khả năng tiếp cận của công chúng với các nghiên cứu về lao động.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Hỗ trợ nghiên cứu chất lượng",
      description: "Cung cấp công cụ và tài nguyên để các nhà nghiên cứu có thể dễ dàng tìm kiếm tài liệu, kết nối với đồng nghiệp, và chia sẻ kết quả nghiên cứu một cách hiệu quả.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Đảm bảo chất lượng trong thời AI",
      description: "Trong bối cảnh trí tuệ nhân tạo phát triển mạnh, chúng tôi cam kết duy trì tính chính xác và độ tin cậy của thông tin nghiên cứu, đồng thời sử dụng công nghệ để nâng cao trải nghiệm người dùng.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Kết nối học giả với báo chí và thực hành",
      description: "Tạo cầu nối giữa nghiên cứu học thuật và thực tiễn, giúp các nhà báo, nhà hoạch định chính sách, và các tổ chức thực hành dễ dàng tiếp cận với chuyên gia và nghiên cứu mới nhất.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const statistics = [
    { number: "50+", label: "Scholars" },
    { number: "200+", label: "Publications" },
    { number: "15+", label: "Research Areas" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="about" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              About Vietnam Labor Research Portal
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive platform connecting researchers, practitioners, and policymakers 
              in Vietnam&apos;s labor studies to advance knowledge and inform evidence-based decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Who We Are
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the founding team behind Vietnam Labor Research Portal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {founder.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {founder.title}
                    </p>
                    <p className="text-slate-600 dark:text-gray-300 mb-4">
                      {founder.affiliation}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
                      {founder.education}
                    </p>
                    <p className="text-slate-600 dark:text-gray-300 mb-6">
                      {founder.bio}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.researchAreas.map((area, areaIndex) => (
                        <span
                          key={areaIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      Key Publications
                    </h4>
                    <ul className="space-y-2">
                      {founder.keyPublications.map((pub, pubIndex) => (
                        <li key={pubIndex} className="text-sm text-slate-600 dark:text-gray-300">
                          • {pub}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {founder.role}
                    </span>
                    <div className="flex space-x-4">
                      {founder.googleScholar && (
                        <a
                          href={founder.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                        >
                          Google Scholar
                        </a>
                      )}
                      {founder.orcid && (
                        <a
                          href={`https://orcid.org/${founder.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                        >
                          ORCID
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Project */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why This Project
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our mission is to create a comprehensive, accessible, and reliable platform 
              for Vietnam labor research that serves researchers, practitioners, and policymakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectGoals.map((goal, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            To democratize access to Vietnam labor research, foster collaboration among scholars, 
            and ensure that evidence-based insights reach policymakers, journalists, and practitioners 
            who can make a real difference in workers&apos; lives.
          </p>
          <div className="mt-8">
            <Link
              href="/search"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Explore Our Research
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">
              Have questions or want to contribute to our research community?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Scholars
              </Link>
              <Link
                href="/occasional-contributors"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                View Contributors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vietnam Labor Research Portal</h3>
            <p className="text-slate-300 mb-6">
              Advancing Vietnam labor research through collaboration and knowledge sharing
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

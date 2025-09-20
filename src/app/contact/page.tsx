"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function ContactPage() {
  const teamMembers = [
    {
      name: "Tu Phuong Nguyen",
      role: "Co-founder & Research Director",
      affiliation: "University of Melbourne",
      email: "tu.phuong.nguyen@unimelb.edu.au",
      bio: "Leading expert on Vietnamese labour migration and gender studies. Dr. Nguyen oversees research strategy and academic partnerships.",
      expertise: ["Labour Migration", "Gender Studies", "Social Policy", "Southeast Asia Research"]
    },
    {
      name: "Trang Tran",
      role: "Co-founder & Technical Director",
      affiliation: "Institute of Labour Science and Social Affairs",
      email: "trang.tran@molisa.gov.vn",
      bio: "Policy researcher specializing in labour economics and social insurance. Dr. Tran manages technical development and policy integration.",
      expertise: ["Labour Economics", "Social Insurance", "Policy Research", "Data Analysis"]
    },
    {
      name: "Minh Nguyen",
      role: "Technical Lead",
      affiliation: "University of Economics Ho Chi Minh City",
      email: "minh.nguyen@ueh.edu.vn",
      bio: "Digital technology specialist focusing on platform development and user experience. Dr. Nguyen leads the technical implementation of the portal.",
      expertise: ["Web Development", "Database Management", "User Experience", "Digital Innovation"]
    },
    {
      name: "Lan Pham",
      role: "Content Manager",
      affiliation: "Vietnam National University",
      email: "lan.pham@vnu.edu.vn",
      bio: "Research communication specialist responsible for content curation, updates, and community engagement across the platform.",
      expertise: ["Content Strategy", "Research Communication", "Community Management", "Digital Marketing"]
    }
  ];

  const partners = [
    {
      name: "University of Melbourne",
      type: "Academic Partner",
      description: "Leading research university providing academic oversight and international collaboration opportunities.",
      website: "https://www.unimelb.edu.au",
      logo: "/images/partners/unimelb.png"
    },
    {
      name: "Institute of Labour Science and Social Affairs",
      type: "Government Partner",
      description: "Vietnamese government research institute providing policy expertise and official data access.",
      website: "https://molisa.gov.vn",
      logo: "/images/partners/molisa.png"
    },
    {
      name: "International Labour Organization (ILO)",
      type: "International Partner",
      description: "UN agency providing technical support, research funding, and global best practices in labour studies.",
      website: "https://www.ilo.org",
      logo: "/images/partners/ilo.png"
    },
    {
      name: "Vietnam National University",
      type: "Academic Partner",
      description: "Premier Vietnamese university providing research infrastructure and student engagement opportunities.",
      website: "https://vnu.edu.vn",
      logo: "/images/partners/vnu.png"
    }
  ];

  const funders = [
    {
      name: "Australian Research Council (ARC)",
      type: "Research Grant",
      amount: "AUD $150,000",
      period: "2023-2025",
      description: "Discovery Early Career Researcher Award supporting digital innovation in labour research"
    },
    {
      name: "Vietnam National Foundation for Science and Technology Development (NAFOSTED)",
      type: "Research Grant",
      amount: "VND 2,000,000,000",
      period: "2022-2024",
      description: "Supporting the development of Vietnam's first comprehensive labour research portal"
    },
    {
      name: "International Labour Organization (ILO)",
      type: "Technical Cooperation",
      amount: "USD $50,000",
      period: "2023-2024",
      description: "Technical assistance for data collection and research methodology development"
    },
    {
      name: "Ford Foundation",
      type: "Social Justice Grant",
      amount: "USD $75,000",
      period: "2023-2024",
      description: "Supporting research on labour rights and social protection in Vietnam"
    }
  ];

  const contactMethods = [
    {
      type: "General Inquiries",
      email: "info@vietnamlabourresearch.org",
      description: "For general questions about the portal, research collaboration, or media inquiries"
    },
    {
      type: "Technical Support",
      email: "support@vietnamlabourresearch.org",
      description: "For technical issues, bug reports, or feature requests"
    },
    {
      type: "Research Collaboration",
      email: "research@vietnamlabourresearch.org",
      description: "For academic partnerships, data sharing, or joint research projects"
    },
    {
      type: "Media & Press",
      email: "media@vietnamlabourresearch.org",
      description: "For press inquiries, interview requests, or media collaboration"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="contact" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Contact & Credits
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team, learn about our partners, and discover how you can contribute to Vietnam&apos;s labour research community.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Reach out to our team for collaboration, support, or inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {method.type}
                </h3>
                <a
                  href={`mailto:${method.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-3 block"
                >
                  {method.email}
                </a>
                <p className="text-sm text-slate-600 dark:text-gray-300">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              General Office Address
            </h3>
            <div className="text-slate-600 dark:text-gray-300 space-y-2">
              <p>Vietnam Labour Research Portal</p>
              <p>Institute of Labour Science and Social Affairs</p>
              <p>123 Nguyen Trai Street, Thanh Xuan District</p>
              <p>Hanoi, Vietnam</p>
              <p className="mt-4">
                <strong>Phone:</strong> +84 24 3852 1234
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Meet the dedicated team behind Vietnam Labour Research Portal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-3">
                      {member.affiliation}
                    </p>
                    <p className="text-slate-600 dark:text-gray-300 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              We work with leading institutions and organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-500 rounded flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-300 text-xs font-bold">
                        {partner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                      {partner.type}
                    </p>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-3">
                      {partner.description}
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Visit Website →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding & Acknowledgements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Funding & Acknowledgements
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              We gratefully acknowledge the support of our funders and contributors
            </p>
          </div>

          <div className="space-y-6">
            {funders.map((funder, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {funder.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {funder.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {funder.amount}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      {funder.period}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-gray-300">
                  {funder.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Special Thanks
            </h3>
            <p className="text-slate-600 dark:text-gray-300 mb-4">
              We extend our heartfelt gratitude to all the researchers, students, and practitioners 
              who have contributed their time, expertise, and insights to make this portal possible.
            </p>
            <p className="text-slate-600 dark:text-gray-300">
              Special recognition goes to our advisory board members, beta testers, and the 
              broader Vietnam labour research community for their invaluable feedback and support.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Involved
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Interested in collaborating, contributing, or supporting our mission? 
            We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Research
            </Link>
            <a
              href="mailto:info@vietnamlabourresearch.org"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vietnam Labour Research Portal</h3>
            <p className="text-slate-300 mb-6">
              Connecting researchers, practitioners, and policymakers in Vietnam&apos;s labour studies
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
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

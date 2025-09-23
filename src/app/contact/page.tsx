"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="contact" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
                Please feel free to contact us using the form below for any questions and feedback.
              </p>
            </div>

            {/* Right side - Vietnam Map */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/images/vietnammap.png"
                  alt="Vietnam Map LEGO"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-300">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 md:p-12 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Meet the dedicated researchers behind Vietnam Labour Research Portal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tu Phuong Nguyen */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  TN
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                    Tu Phuong Nguyen
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                    Co-founder & Research Director
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 text-sm mb-3">
                    University of Melbourne
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Leading expert on Vietnamese labour migration and gender studies. Dr. Nguyen oversees research strategy and academic partnerships.
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["Labour Migration", "Gender Studies", "Social Policy", "Southeast Asia Research"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trang Tran */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  TT
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                    Trang Tran
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                    Co-founder & Technical Director
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 text-sm mb-3">
                    Institute of Labour Science and Social Affairs
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Policy researcher specializing in labour economics and social insurance. Dr. Tran manages technical development and policy integration.
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["Labour Economics", "Social Insurance", "Policy Research", "Data Analysis"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
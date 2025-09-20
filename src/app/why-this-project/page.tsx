"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function WhyThisProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header currentPage="why-this-project" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why This Project
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding the purpose and vision behind the Vietnam Labour Research Portal
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-lg text-slate-600 dark:text-gray-300 mb-6">
                Vietnam Labour Research Portal is created to make scholarship on labour in Vietnam more visible to researchers, students, practitioners, and those who care about the world of work.
              </p>
              <p className="text-lg text-slate-600 dark:text-gray-300 mb-6">
                It is a voluntary initiative by Tu Phuong Nguyen and Trang Tran. It serves as a supportive tool for researchers and students to discover existing work, learn from it, and advance this body of knowledge.
              </p>
              <p className="text-lg text-slate-600 dark:text-gray-300 mb-8">
                This initiative builds on earlier efforts of compiling bibliographies and research materials for training workshops, and connecting the Vietnam labour research community. With this portal, we aim to provide a more systematic and accessible platform for knowledge sharing.
              </p>
            </div>

            {/* Image */}
            <div className="mb-8 text-center">
              <Image
                src="/images/vietnam-labour-research.png"
                alt="Vietnam Labour Research Portal"
                width={800}
                height={450}
                className="rounded-lg shadow-md mx-auto"
                priority
              />
            </div>

            {/* Main Reasons */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                We believe this resource is useful for these reasons:
              </h2>

              <div className="space-y-8">
                {/* Reason 1 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    1. Giving an overview of who&apos;s working on what
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    When early career researchers or PhD students start literature reviews, one of the key questions they often ask is: <strong>Who are the key people working on this topic?</strong>*
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Our site brings together authors whose work is relevant to each topic, helping students and researchers get started. It&apos;s a way to see who have published in your area of interest, so you can read and cite more widely. Users can browse these scholars and decide for themselves which works to engage with.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    We don&apos;t capture everything, but we hope this gives you a solid start.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300">
                    For scholars who experience periods of career interruptions or have other commitments such as teaching, we hope to help you stay informed of the field. We will make changes and provide updates as new publications come out.
                  </p>
                </div>

                {/* Reason 2 */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    2. Enhancing visibility of Vietnam labour research
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Scholars featured in our website work across different fields and/or countries. Some scholars study Vietnam as part of their comparative research; some publish in different fields of Vietnamese studies including labour. This platform helps foreground their research on Vietnam labour, which can be buried or overlooked in general profiles.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Early career researchers whose publications may not yet be widely visible, are also featured here.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300">
                    Some important scholars in Vietnam labour studies have retired or are no longer active in academia. In some cases, their institutional profiles are no longer available. This platform helps preserve their contributions, ensuring their work remains accessible to new generations of researchers.
                  </p>
                </div>

                {/* Reason 3 */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    3. Promoting interdisciplinary knowledge
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Labour studies are vibrant, diverse, and interdisciplinary. Scholars in law, anthropology, political economy, development studies, public policy, and human resource management can work on overlapping themes.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    We organise topics around real-world issues, so researchers can find relevant work across different academic disciplines.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300">
                    We believe that this cross-disciplinary journey matters. A scholar of labour law might learn from ethnographies of the shopfloor, and an anthropologist might benefit from reading legal scholarship to understand how formal institutions matter.
                  </p>
                </div>

                {/* Reason 4 */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    4. Supporting research integrity in an AI era
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300">
                    At a time when generative AI (Artificial Intelligence) has been used to write or search for academic work, this platform provides a reference point, manually organised by experienced researchers, for locating real, credible and quality research.
                  </p>
                </div>

                {/* Reason 5 */}
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    5. Connecting the media and practitioners with research
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300">
                    Journalists and practitioners sometimes need to identify experts to consult or interview about certain labour issues in Vietnam. This platform helps them locate relevant scholars and bring academic research to a broader audience.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                * Why do search results show scholars rather than publications?
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-gray-300">
                <p>
                  Knowing who is working on a topic is just as important as knowing which publications to read. Scholars shape debates, explain social reality, and offer practical insights. By highlighting relevant scholars and the key themes in their work, we aim to give researchers and students a solid foundation for navigating the literature.
                </p>
                <p>
                  This approach also reflects common academic practice. When you ask your supervisor/advisor or a friend for references on a topic, they tend to mention people, or sometimes books, more often than listing specific articles.
                </p>
                <p>
                  Our search results include senior, established scholars as well as up-and-coming researchers from across disciplines. This allows us to showcase contributions across career stages and promote interdisciplinary engagement.
                </p>
                <p>
                  This website is not a library or repository. We do not host full-text publications. Instead, we guide you to authors and keywords so you can continue your own exploration.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <Link
                href="/search"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Exploring Research
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vietnam Labour Research Portal</h3>
            <p className="text-slate-300 mb-6">
              Your guide to Vietnam labour research
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

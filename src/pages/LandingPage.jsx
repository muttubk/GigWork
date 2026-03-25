import Hero           from '../components/sections/Hero'
import StatsBar       from '../components/sections/StatsBar'
import Categories     from '../components/sections/Categories'
import HowItWorks     from '../components/sections/HowItWorks'
import FeaturedWorkers from '../components/sections/FeaturedWorkers'
import TrustSection   from '../components/sections/TrustSection'
import { Link }       from 'react-router-dom'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Categories />
      <HowItWorks />
      <FeaturedWorkers />
      <TrustSection />

      {/* Final CTA banner */}
      <section className="container-page mb-20">
        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <p className="section-label">Join GigWork</p>
          <h2 className="section-title mb-4">Ready to get started?</h2>
          <p className="section-sub mx-auto max-w-md mb-8">
            Whether you're looking for work or looking to hire — GigWork connects you in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/browse"
              className="bg-brand-600 text-white font-medium text-sm px-8 py-3 rounded-full hover:bg-brand-700 transition-colors"
            >
              Hire a worker
            </Link>
            <Link
              to="/register"
              className="border border-gray-300 text-gray-700 font-medium text-sm px-8 py-3 rounded-full hover:border-gray-400 transition-colors"
            >
              Join as freelancer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

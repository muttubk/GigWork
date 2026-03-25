import { Link } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import { FEATURED_WORKERS } from '../../constants'

export default function Hero() {
  return (
    <section className="container-page pt-16 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div>
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Trusted by 50,000+ businesses across India
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tighter leading-[1.05] text-gray-900 mb-5">
          Hire skilled <em className="italic text-brand-600">workers</em> for any job, any day
        </h1>

        <p className="text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-lg">
          From workshop labor to senior engineers — find vetted freelancers available today on an hourly or daily basis. Every field, every skill level.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm mb-6 max-w-xl">
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="What skill are you looking for?"
              className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 px-3 sm:border-l border-gray-100">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="City"
              className="w-24 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
          <Link
            to="/browse"
            className="bg-brand-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-brand-700 transition-colors text-center"
          >
            Search
          </Link>
        </div>

        <p className="text-xs text-gray-400 font-light">
          Popular: <Link to="/browse?category=Electricians" className="text-brand-600 hover:underline">Electricians</Link>
          {' · '}<Link to="/browse?category=Drivers" className="text-brand-600 hover:underline">Drivers</Link>
          {' · '}<Link to="/browse?category=Plumbers" className="text-brand-600 hover:underline">Plumbers</Link>
          {' · '}<Link to="/browse?category=IT+%26+Engineers" className="text-brand-600 hover:underline">IT Engineers</Link>
        </p>
      </div>

      {/* Right — live workers card */}
      <div className="hidden lg:block relative">
        {/* Floating badge top */}
        <div className="absolute -top-4 right-4 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md z-10">
          <p className="text-xs text-gray-400 mb-0.5">Avg. hire time</p>
          <p className="font-serif text-2xl font-normal text-gray-900">2.4 hrs</p>
        </div>

        {/* Main card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">Available now</p>
          <div className="divide-y divide-gray-50">
            {FEATURED_WORKERS.filter(w => w.available).map((w) => (
              <div key={w.id} className="flex items-center gap-3 py-3.5">
                <div className={`w-10 h-10 rounded-full ${w.avatarBg} ${w.avatarText} flex items-center justify-center text-sm font-medium flex-shrink-0`}>
                  {w.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{w.name}</p>
                  <p className="text-xs text-gray-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 align-middle" />
                    {w.role} · {w.experience} yrs
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-base text-gray-900">₹{w.hourlyRate.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">per hour</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/browse"
            className="block text-center text-sm text-brand-600 font-medium mt-4 pt-4 border-t border-gray-50 hover:underline"
          >
            View all available workers →
          </Link>
        </div>

        {/* Floating badge bottom */}
        <div className="absolute -bottom-4 -left-4 bg-brand-600 rounded-xl px-4 py-3 shadow-md">
          <p className="font-serif text-2xl font-normal text-white">4.9★</p>
          <p className="text-xs text-brand-200">Avg. worker rating</p>
        </div>
      </div>
    </section>
  )
}

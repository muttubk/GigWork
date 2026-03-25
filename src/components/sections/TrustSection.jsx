import { Link } from 'react-router-dom'
import { TRUST_FEATURES } from '../../constants'

export default function TrustSection() {
  return (
    <section className="bg-brand-600 py-20 mb-20">
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-brand-200 mb-3">Why GigWork</p>
          <h2 className="font-serif text-4xl font-normal tracking-tighter leading-tight text-white mb-5">
            Built on trust, backed by verification
          </h2>
          <p className="text-base text-brand-200 font-light leading-relaxed mb-8 max-w-md">
            Every worker on GigWork goes through a rigorous screening process. You hire with confidence, every single time.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-brand-600 font-medium text-sm px-7 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Start hiring today
          </Link>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TRUST_FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">{f.title}</h4>
                <p className="text-xs text-brand-200 font-light leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

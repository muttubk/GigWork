import { HOW_IT_WORKS } from '../../constants'

export default function HowItWorks() {
  return (
    <section id="how" className="bg-gray-50 py-20 mb-20">
      <div className="container-page">
        <div className="text-center mb-14">
          <p className="section-label">Simple process</p>
          <h2 className="section-title mb-3">Hire in three steps</h2>
          <p className="section-sub mx-auto max-w-lg">
            Whether you need someone for a single hour or a full work week, getting the right person is fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gray-200 z-0" />

          {HOW_IT_WORKS.map((item, idx) => (
            <div key={item.step} className="relative bg-white rounded-2xl p-8 border border-gray-100">
              <div className="font-serif text-5xl font-light text-gray-100 leading-none mb-5 select-none">
                {item.step}
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              {idx < HOW_IT_WORKS.length - 1 && (
                <span className="hidden md:block absolute -right-4 top-8 text-gray-300 text-xl z-10">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

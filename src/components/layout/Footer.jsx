import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'For clients':     [['Post a job','/post-job'],['Browse workers','/browse'],['Pricing','/#pricing'],['Enterprise','/#enterprise']],
  'For freelancers': [['Create profile','/register'],['How earnings work','/#earnings'],['Skill verification','/#verify'],['Community','/#community']],
  'Company':         [['About us','/#about'],['Blog','/#blog'],['Careers','/#careers'],['Contact','/#contact']],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-xl font-normal text-white block mb-3">
              Gig<span className="text-gold-400">Work</span>
            </Link>
            <p className="text-sm font-light leading-relaxed text-gray-500 max-w-xs">
              India's most trusted platform for on-demand skilled workers. Hourly. Daily. Any field.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h5 className="text-sm font-medium text-white mb-4">{title}</h5>
              <ul className="space-y-2">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm font-light text-gray-500 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">© 2026 GigWork Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy policy', 'Terms of service', 'Cookie policy'].map((t) => (
              <Link key={t} to="/#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

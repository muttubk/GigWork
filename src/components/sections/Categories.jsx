import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants'
import CategoryCard from '../ui/CategoryCard'

export default function Categories() {
  return (
    <section className="container-page mb-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="section-label">Browse by trade</p>
          <h2 className="section-title">Every skill, one platform</h2>
        </div>
        <Link to="/browse" className="text-sm text-brand-600 font-medium hover:underline hidden sm:block">
          View all categories →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  )
}

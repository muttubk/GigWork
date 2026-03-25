import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  const { name, icon, count, featured } = category

  if (featured) {
    return (
      <Link
        to={`/browse?category=${encodeURIComponent(name)}`}
        className="bg-brand-600 rounded-xl p-5 cursor-pointer hover:bg-brand-700 transition-colors group"
      >
        <div className="text-2xl mb-3">{icon}</div>
        <p className="text-sm font-medium text-white mb-1">{name}</p>
        <p className="text-xs text-brand-200">{count.toLocaleString()} available</p>
      </Link>
    )
  }

  return (
    <Link
      to={`/browse?category=${encodeURIComponent(name)}`}
      className="bg-gray-50 rounded-xl p-5 cursor-pointer hover:bg-white hover:border-gray-200 hover:-translate-y-0.5 border border-transparent transition-all duration-200 group"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <p className="text-sm font-medium text-gray-800 mb-1">{name}</p>
      <p className="text-xs text-gray-400">{count.toLocaleString()} available</p>
    </Link>
  )
}

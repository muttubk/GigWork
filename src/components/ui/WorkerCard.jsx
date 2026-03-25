import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import RatingStars from './RatingStars'
import Badge from './Badge'

export default function WorkerCard({ worker }) {
  const { id, name, initials, role, city, rating, reviews, hourlyRate, available, skills, avatarBg, avatarText } = worker

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <Avatar initials={initials} bgClass={avatarBg} textClass={avatarText} size="md" />
        <Badge color={available ? 'green' : 'gray'}>
          {available ? '● Available' : '● Busy'}
        </Badge>
      </div>

      {/* Name & role */}
      <h3 className="font-medium text-gray-900 text-base mb-0.5">{name}</h3>
      <p className="text-sm text-gray-400 font-light mb-3">{role} · {city}</p>

      {/* Rating */}
      <div className="mb-3">
        <RatingStars rating={rating} reviews={reviews} />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {skills.slice(0, 2).map((s) => (
          <span key={s} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
            {s}
          </span>
        ))}
      </div>

      {/* Rate + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <span className="font-serif text-xl font-normal text-gray-900">₹{hourlyRate.toLocaleString()}</span>
          <span className="text-xs text-gray-400 font-light">/hr</span>
        </div>
        <Link
          to={`/worker/${id}`}
          className="text-sm font-medium text-brand-600 border border-brand-600 px-4 py-1.5 rounded-full hover:bg-brand-600 hover:text-white transition-all"
        >
          View profile
        </Link>
      </div>
    </div>
  )
}

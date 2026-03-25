import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import RatingStars from './RatingStars'
import Badge from './Badge'
import { CheckCircle } from 'lucide-react'

const availLabel = { now: 'Available now', today: 'Available today', week: 'Available this week' }
const availColor = { now: 'green', today: 'gold', week: 'gray' }

export default function WorkerListItem({ worker }) {
  const {
    id, name, initials, role, city, rating, reviews,
    hourlyRate, dailyRate, available, skills,
    avatarBg, avatarText, experience, verified, completedJobs,
  } = worker

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start">

      {/* Avatar */}
      <Avatar initials={initials} bgClass={avatarBg} textClass={avatarText} size="lg" />

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <h3 className="font-medium text-gray-900 text-base">{name}</h3>
          {verified && (
            <span className="flex items-center gap-0.5 text-xs text-brand-600 font-medium">
              <CheckCircle size={12} /> Verified
            </span>
          )}
          <Badge color={availColor[available]}>{availLabel[available]}</Badge>
        </div>

        <p className="text-sm text-gray-400 font-light mb-2">{role} · {city} · {experience} yrs exp</p>

        <RatingStars rating={rating} reviews={reviews} />

        <div className="flex flex-wrap gap-1.5 mt-3">
          {skills.map((s) => (
            <span key={s} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Rate + CTA */}
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 sm:min-w-[140px]">
        <div className="text-right">
          <p className="font-serif text-xl font-normal text-gray-900">
            ₹{hourlyRate.toLocaleString()}<span className="text-xs text-gray-400 font-sans font-light">/hr</span>
          </p>
          <p className="text-xs text-gray-400 font-light">₹{dailyRate.toLocaleString()}/day</p>
        </div>
        <div className="text-xs text-gray-400 font-light hidden sm:block">{completedJobs} jobs done</div>
        <Link
          to={`/worker/${id}`}
          className="text-sm font-medium text-brand-600 border border-brand-600 px-4 py-2 rounded-full hover:bg-brand-600 hover:text-white transition-all whitespace-nowrap"
        >
          View profile
        </Link>
      </div>
    </div>
  )
}

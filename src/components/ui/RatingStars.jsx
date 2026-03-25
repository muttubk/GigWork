export default function RatingStars({ rating, reviews, size = 'sm' }) {
  const starSize = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <span className={`flex items-center gap-1 ${starSize}`}>
      <span className="text-amber-400">★</span>
      <span className="font-medium text-gray-800">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-gray-400">({reviews})</span>
      )}
    </span>
  )
}

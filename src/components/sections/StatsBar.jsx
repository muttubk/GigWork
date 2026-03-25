import { STATS } from '../../constants'
import StatCard from '../ui/StatCard'

export default function StatsBar() {
  return (
    <div className="container-page mb-20">
      <div className="bg-gray-50 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
        {STATS.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  )
}

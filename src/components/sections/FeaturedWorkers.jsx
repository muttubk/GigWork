import { Link } from 'react-router-dom'
import { FEATURED_WORKERS } from '../../constants'
import WorkerCard from '../ui/WorkerCard'

export default function FeaturedWorkers() {
  return (
    <section className="container-page mb-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="section-label">Top rated</p>
          <h2 className="section-title">Workers available today</h2>
        </div>
        <Link to="/browse" className="text-sm text-brand-600 font-medium hover:underline hidden sm:block">
          Browse all workers →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_WORKERS.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Star, CheckCircle, Briefcase, Clock,
  ChevronLeft, Calendar, Shield, Share2,
} from 'lucide-react'
import { ALL_WORKERS } from '../constants'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'

const availLabel = { now: 'Available now', today: 'Available today', week: 'Available this week' }
const availColor = { now: 'green', today: 'gold', week: 'gray' }

// Mock reviews — in production these come from the API
const MOCK_REVIEWS = [
  { id: 1, author: 'Rajesh M.',   initials: 'RM', rating: 5, date: 'Feb 2026', text: 'Excellent work, showed up on time and completed the job professionally. Will hire again.' },
  { id: 2, author: 'Ananya S.',   initials: 'AS', rating: 5, date: 'Jan 2026', text: 'Very skilled and neat. Explained everything clearly before starting the work.' },
  { id: 3, author: 'Kiran P.',    initials: 'KP', rating: 4, date: 'Dec 2025', text: 'Good work overall, minor delay but quality was great. Reasonable rates.' },
]

export default function WorkerProfilePage() {
  const { id } = useParams()
  const worker = ALL_WORKERS.find((w) => w.id === Number(id))

  const [rateType, setRateType]       = useState('hourly') // 'hourly' | 'daily'
  const [bookingHours, setBookingHours] = useState(4)
  const [bookingDays, setBookingDays]   = useState(1)
  const [bookingDate, setBookingDate]   = useState('')
  const [booked, setBooked]             = useState(false)

  if (!worker) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="font-serif text-2xl font-normal mb-3">Worker not found</h1>
        <Link to="/browse" className="text-brand-600 text-sm font-medium hover:underline">
          ← Back to browse
        </Link>
      </div>
    )
  }

  const totalCost = rateType === 'hourly'
    ? worker.hourlyRate * bookingHours
    : worker.dailyRate * bookingDays

  const handleBook = () => {
    if (!bookingDate) return
    setBooked(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-page py-8">

        {/* Back link */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft size={15} /> Back to results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left / Main column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Profile header card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <Avatar
                  initials={worker.initials}
                  bgClass={worker.avatarBg}
                  textClass={worker.avatarText}
                  size="lg"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-serif text-2xl font-normal text-gray-900">{worker.name}</h1>
                    {worker.verified && (
                      <span className="flex items-center gap-1 text-xs text-brand-600 font-medium">
                        <CheckCircle size={13} /> ID Verified
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 font-light mb-3">{worker.role}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-light mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" /> {worker.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} className="text-gray-400" /> {worker.experience} yrs experience
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-gray-400" /> {worker.completedJobs} jobs completed
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-amber-800">{worker.rating}</span>
                      <span className="text-xs text-amber-600">({worker.reviews} reviews)</span>
                    </div>
                    <Badge color={availColor[worker.available]}>{availLabel[worker.available]}</Badge>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-serif text-lg font-normal text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 font-light leading-relaxed">{worker.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-serif text-lg font-normal text-gray-900 mb-4">Skills & expertise</h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((s) => (
                  <span key={s} className="text-sm bg-gray-50 text-gray-700 px-4 py-2 rounded-full border border-gray-100 font-light">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-serif text-lg font-normal text-gray-900 mb-4">Verifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: '🪪', label: 'Aadhaar verified', done: worker.verified },
                  { icon: '📋', label: 'PAN verified',     done: worker.verified },
                  { icon: '🛡', label: 'Background check', done: worker.verified },
                  { icon: '⭐', label: 'Skill certified',  done: worker.completedJobs > 50 },
                  { icon: '📱', label: 'Phone verified',   done: true },
                  { icon: '✉️', label: 'Email verified',   done: true },
                ].map((v) => (
                  <div
                    key={v.label}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm ${
                      v.done
                        ? 'border-brand-100 bg-brand-50 text-brand-700'
                        : 'border-gray-100 bg-gray-50 text-gray-400'
                    }`}
                  >
                    <span className="text-base">{v.icon}</span>
                    <span className="font-light text-xs">{v.label}</span>
                    {v.done && <CheckCircle size={12} className="ml-auto text-brand-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg font-normal text-gray-900">
                  Reviews <span className="text-gray-400 font-sans text-base font-light">({worker.reviews})</span>
                </h2>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="font-medium">{worker.rating}</span>
                  <span className="text-gray-400">/ 5</span>
                </div>
              </div>
              <div className="space-y-5">
                {MOCK_REVIEWS.map((r) => (
                  <div key={r.id} className="pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium">
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{r.author}</p>
                        <p className="text-xs text-gray-400">{r.date}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right / Booking card ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-32">

              {booked ? (
                // Booking confirmation
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-serif text-xl font-normal text-gray-900 mb-2">Booking confirmed!</h3>
                  <p className="text-sm text-gray-500 font-light mb-1">
                    {worker.name} has been notified.
                  </p>
                  <p className="text-sm text-gray-500 font-light mb-6">
                    You'll receive a confirmation shortly.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-left mb-5 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Worker</span>
                      <span className="font-medium text-gray-900">{worker.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">{bookingDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-900">
                        {rateType === 'hourly' ? `${bookingHours} hrs` : `${bookingDays} day(s)`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2">
                      <span className="font-medium text-gray-900">Total (escrow)</span>
                      <span className="font-serif text-lg font-normal text-brand-600">₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block text-center text-sm font-medium bg-brand-600 text-white px-5 py-3 rounded-full hover:bg-brand-700 transition-colors"
                  >
                    View in dashboard
                  </Link>
                </div>
              ) : (
                <>
                  {/* Rate display */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif text-2xl font-normal text-gray-900">
                        ₹{rateType === 'hourly'
                          ? worker.hourlyRate.toLocaleString()
                          : worker.dailyRate.toLocaleString()}
                      </span>
                      <span className="text-gray-400 font-light text-sm">
                        / {rateType === 'hourly' ? 'hour' : 'day'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-light flex items-center gap-1">
                      <Shield size={11} /> Payment held in escrow until job complete
                    </p>
                  </div>

                  {/* Rate type toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                    {['hourly', 'daily'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setRateType(type)}
                        className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all capitalize ${
                          rateType === type
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Duration picker */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      <Clock size={11} className="inline mr-1" />
                      {rateType === 'hourly' ? 'Hours needed' : 'Days needed'}
                    </label>
                    {rateType === 'hourly' ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setBookingHours(Math.max(1, bookingHours - 1))}
                          className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                          −
                        </button>
                        <span className="font-serif text-xl font-normal text-gray-900 min-w-[2rem] text-center">
                          {bookingHours}
                        </span>
                        <button
                          onClick={() => setBookingHours(Math.min(12, bookingHours + 1))}
                          className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                          +
                        </button>
                        <span className="text-sm text-gray-400 font-light">hrs</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
                          className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                          −
                        </button>
                        <span className="font-serif text-xl font-normal text-gray-900 min-w-[2rem] text-center">
                          {bookingDays}
                        </span>
                        <button
                          onClick={() => setBookingDays(Math.min(30, bookingDays + 1))}
                          className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                          +
                        </button>
                        <span className="text-sm text-gray-400 font-light">days</span>
                      </div>
                    )}
                  </div>

                  {/* Date picker */}
                  <div className="mb-5">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      <Calendar size={11} className="inline mr-1" /> Start date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none text-gray-700 focus:border-brand-600 transition-colors"
                    />
                  </div>

                  {/* Cost summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        ₹{rateType === 'hourly'
                          ? worker.hourlyRate.toLocaleString()
                          : worker.dailyRate.toLocaleString()} ×{' '}
                        {rateType === 'hourly' ? `${bookingHours} hrs` : `${bookingDays} days`}
                      </span>
                      <span className="text-gray-700">₹{totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Platform fee (5%)</span>
                      <span className="text-gray-700">₹{Math.round(totalCost * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-medium text-sm">
                      <span className="text-gray-900">Total</span>
                      <span className="font-serif text-lg font-normal text-gray-900">
                        ₹{Math.round(totalCost * 1.05).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Book button */}
                  <button
                    onClick={handleBook}
                    disabled={!bookingDate}
                    className={`w-full py-3 rounded-full text-sm font-medium transition-all ${
                      bookingDate
                        ? 'bg-brand-600 text-white hover:bg-brand-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {bookingDate ? `Book ${worker.name.split(' ')[0]}` : 'Select a date to book'}
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-3 font-light">
                    You won't be charged until the job is complete
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

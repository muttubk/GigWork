import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase, Star, IndianRupee, Clock, CheckCircle,
  ChevronRight, Bell, Settings, LogOut, User,
  TrendingUp, Calendar, MapPin, MessageSquare,
} from 'lucide-react'
import { ALL_WORKERS } from '../constants'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import RatingStars from '../components/ui/RatingStars'

// ── Mock data ─────────────────────────────────────────────────────────────────
const CLIENT_USER  = { name: 'Anjali Mehta',  initials: 'AM', role: 'client' }
const WORKER_USER  = { name: 'Vikram Nair',   initials: 'VN', role: 'worker',
  avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-800' }

const ACTIVE_JOBS = [
  { id: 1, title: 'Panel wiring — 3BHK',      worker: ALL_WORKERS[0], status: 'in_progress', date: 'Today',    hours: 4,  total: 3800 },
  { id: 2, title: 'Plumbing — office refit',  worker: ALL_WORKERS[4], status: 'confirmed',   date: 'Mar 27',   hours: 6,  total: 3900 },
]

const PAST_JOBS = [
  { id: 3, title: 'Electrical inspection',    worker: ALL_WORKERS[0], status: 'completed', date: 'Mar 18', total: 1900, rated: true  },
  { id: 4, title: 'AC installation',          worker: ALL_WORKERS[6], status: 'completed', date: 'Mar 10', total: 4200, rated: false },
  { id: 5, title: 'Driver — airport pickup',  worker: ALL_WORKERS[2], status: 'completed', date: 'Mar 05', total: 700,  rated: true  },
]

const WORKER_JOBS = [
  { id: 1, title: 'Panel wiring — 3BHK',     client: 'Anjali M.', status: 'in_progress', date: 'Today',  hours: 4,  earn: 3800 },
  { id: 2, title: 'Solar installation',       client: 'Ramesh K.', status: 'confirmed',   date: 'Mar 28', hours: 8,  earn: 7600 },
  { id: 3, title: 'Electrical inspection',    client: 'Priya S.',  status: 'completed',   date: 'Mar 18', hours: 2,  earn: 1900 },
]

const NOTIFICATIONS = [
  { id: 1, text: 'Vikram Nair accepted your booking for Mar 27',   time: '2h ago',  unread: true  },
  { id: 2, text: 'Payment of ₹3,800 held in escrow for today\'s job', time: '5h ago', unread: true  },
  { id: 3, text: 'Arjun Sharma completed the plumbing job',        time: 'Yesterday',unread: false },
  { id: 4, text: 'New worker match for your "IT support" post',    time: '2d ago',  unread: false },
]

const STATUS_META = {
  in_progress: { label: 'In progress', color: 'blue'  },
  confirmed:   { label: 'Confirmed',   color: 'green' },
  completed:   { label: 'Completed',   color: 'gray'  },
  cancelled:   { label: 'Cancelled',   color: 'red'   },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [userRole,  setUserRole]  = useState('client')   // 'client' | 'worker'
  const [activeTab, setActiveTab] = useState('overview')
  const [notifOpen, setNotifOpen] = useState(false)

  const user = userRole === 'client' ? CLIENT_USER : WORKER_USER

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-20">
        <div className="container-page flex items-center justify-between h-14">

          {/* Role switcher (demo only) */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['client','worker'].map((r) => (
              <button key={r} onClick={() => { setUserRole(r); setActiveTab('overview') }}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  userRole === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}>
                {r === 'client' ? '🏢 Client view' : '👷 Worker view'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(o => !o)}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-900">Notifications</span>
                    <button className="text-xs text-brand-600 font-medium hover:underline">Mark all read</button>
                  </div>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-50 last:border-0 flex gap-3 ${n.unread ? 'bg-brand-50/40' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-brand-500' : 'bg-gray-200'}`} />
                      <div>
                        <p className="text-xs text-gray-700 leading-relaxed">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/settings"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page py-8 flex gap-8">

        {/* ── Left sidebar ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          {/* Profile mini */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 text-center">
            <Avatar
              initials={user.initials}
              bgClass={user.avatarBg || 'bg-gray-100'}
              textClass={user.avatarText || 'text-gray-600'}
              size="lg"
            />
            <p className="font-medium text-gray-900 text-sm mt-2">{user.name}</p>
            <p className="text-xs text-gray-400 font-light capitalize">{user.role}</p>
            {userRole === 'worker' && (
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-medium text-gray-700">4.9</span>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="bg-white rounded-2xl border border-gray-100 p-2 space-y-0.5">
            {(userRole === 'client'
              ? [
                  ['overview',   'Overview',      Briefcase  ],
                  ['jobs',       'My jobs',        Calendar   ],
                  ['workers',    'Saved workers',  User       ],
                  ['payments',   'Payments',       IndianRupee],
                  ['messages',   'Messages',       MessageSquare],
                ]
              : [
                  ['overview',   'Overview',      TrendingUp ],
                  ['jobs',       'My bookings',   Calendar   ],
                  ['earnings',   'Earnings',      IndianRupee],
                  ['profile',    'My profile',    User       ],
                  ['messages',   'Messages',      MessageSquare],
                ]
            ).map(([id, label, Icon]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                <Icon size={15} />
                {label}
              </button>
            ))}
            <div className="pt-1 mt-1 border-t border-gray-50">
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 transition-colors">
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">

          {/* Mobile tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden scrollbar-hide">
            {(userRole === 'client'
              ? ['overview','jobs','workers','payments','messages']
              : ['overview','jobs','earnings','profile','messages']
            ).map((id) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                  activeTab === id ? 'bg-brand-600 text-white' : 'bg-white border border-gray-100 text-gray-500'
                }`}>
                {id}
              </button>
            ))}
          </div>

          {/* ── CLIENT OVERVIEW ── */}
          {userRole === 'client' && activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-2xl font-normal text-gray-900">Good morning, Anjali 👋</h1>
                <p className="text-sm text-gray-400 font-light mt-0.5">Here's what's happening today.</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Active jobs',    value: '2',      icon: Briefcase,   color: 'text-blue-600',   bg: 'bg-blue-50'   },
                  { label: 'Total spent',    value: '₹48,200',icon: IndianRupee, color: 'text-brand-600',  bg: 'bg-brand-50'  },
                  { label: 'Workers hired',  value: '14',     icon: User,        color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Avg. rating',    value: '4.8★',   icon: Star,        color: 'text-amber-600',  bg: 'bg-amber-50'  },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <s.icon size={16} className={s.color} />
                    </div>
                    <p className="font-serif text-xl font-normal text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400 font-light mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Active jobs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-lg font-normal text-gray-900">Active jobs</h2>
                  <button onClick={() => setActiveTab('jobs')}
                    className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-1">
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                <div className="space-y-3">
                  {ACTIVE_JOBS.map((job) => (
                    <JobRow key={job.id} job={job} showWorker />
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div>
                <h2 className="font-serif text-lg font-normal text-gray-900 mb-3">Quick actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link to="/post-job"
                    className="flex items-center gap-3 bg-brand-600 text-white p-4 rounded-2xl hover:bg-brand-700 transition-colors">
                    <Briefcase size={18} />
                    <div>
                      <p className="text-sm font-medium">Post a new job</p>
                      <p className="text-xs opacity-70 font-light">Takes 2 minutes</p>
                    </div>
                  </Link>
                  <Link to="/browse"
                    className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl hover:shadow-sm transition-all">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Browse workers</p>
                      <p className="text-xs text-gray-400 font-light">85K+ available</p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl">
                    <MessageSquare size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Messages</p>
                      <p className="text-xs text-gray-400 font-light">2 unread</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CLIENT JOBS TAB ── */}
          {userRole === 'client' && activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-normal text-gray-900">My jobs</h1>
                <Link to="/post-job"
                  className="text-sm font-medium bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700 transition-colors">
                  + Post new job
                </Link>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Active</p>
                <div className="space-y-3">
                  {ACTIVE_JOBS.map((job) => <JobRow key={job.id} job={job} showWorker detailed />)}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Completed</p>
                <div className="space-y-3">
                  {PAST_JOBS.map((job) => <JobRow key={job.id} job={job} showWorker detailed showRate />)}
                </div>
              </div>
            </div>
          )}

          {/* ── CLIENT PAYMENTS ── */}
          {userRole === 'client' && activeTab === 'payments' && (
            <div className="space-y-5">
              <h1 className="font-serif text-2xl font-normal text-gray-900">Payments</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Total spent',    value: '₹48,200', color: 'text-gray-900'   },
                  { label: 'In escrow',      value: '₹7,700',  color: 'text-amber-600'  },
                  { label: 'This month',     value: '₹12,400', color: 'text-brand-600'  },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 font-light mb-1">{s.label}</p>
                    <p className={`font-serif text-2xl font-normal ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-50">
                  <p className="text-sm font-medium text-gray-900">Transaction history</p>
                </div>
                {[...ACTIVE_JOBS, ...PAST_JOBS].map((job) => (
                  <div key={job.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{job.title}</p>
                      <p className="text-xs text-gray-400 font-light">{job.date} · {job.worker.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{job.total.toLocaleString()}</p>
                      <Badge color={STATUS_META[job.status].color}>{STATUS_META[job.status].label}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WORKER OVERVIEW ── */}
          {userRole === 'worker' && activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-2xl font-normal text-gray-900">Good morning, Vikram 👋</h1>
                <p className="text-sm text-gray-400 font-light mt-0.5">You have 1 active job today.</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'This month',    value: '₹18,300', icon: IndianRupee, color: 'text-brand-600',  bg: 'bg-brand-50'  },
                  { label: 'Jobs done',     value: '142',     icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-50'  },
                  { label: 'Rating',        value: '4.9★',    icon: Star,        color: 'text-amber-600',  bg: 'bg-amber-50'  },
                  { label: 'Hrs worked',    value: '38 hrs',  icon: Clock,       color: 'text-blue-600',   bg: 'bg-blue-50'   },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <s.icon size={16} className={s.color} />
                    </div>
                    <p className="font-serif text-xl font-normal text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400 font-light mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Today's job */}
              <div>
                <h2 className="font-serif text-lg font-normal text-gray-900 mb-3">Today's job</h2>
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">Panel wiring — 3BHK</p>
                      <p className="text-sm text-gray-400 font-light mt-0.5 flex items-center gap-1">
                        <MapPin size={12} /> Koramangala, Bangalore
                      </p>
                    </div>
                    <Badge color="blue">In progress</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-50 mb-3">
                    {[['Client','Anjali M.'],['Hours','4 hrs'],['Earning','₹3,800']].map(([l,v]) => (
                      <div key={l}>
                        <p className="text-xs text-gray-400 font-light">{l}</p>
                        <p className="text-sm font-medium text-gray-800 mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2.5 bg-brand-600 text-white text-sm font-medium rounded-full hover:bg-brand-700 transition-colors">
                    Mark as complete
                  </button>
                </div>
              </div>

              {/* Earnings chart placeholder */}
              <div>
                <h2 className="font-serif text-lg font-normal text-gray-900 mb-3">Earnings this month</h2>
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <EarningsChart />
                </div>
              </div>
            </div>
          )}

          {/* ── WORKER JOBS ── */}
          {userRole === 'worker' && activeTab === 'jobs' && (
            <div className="space-y-5">
              <h1 className="font-serif text-2xl font-normal text-gray-900">My bookings</h1>
              <div className="space-y-3">
                {WORKER_JOBS.map((job) => (
                  <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm mb-0.5">{job.title}</p>
                      <p className="text-xs text-gray-400 font-light">{job.client} · {job.date} · {job.hours} hrs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-base font-normal text-gray-900">₹{job.earn.toLocaleString()}</p>
                      <Badge color={STATUS_META[job.status].color}>{STATUS_META[job.status].label}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WORKER EARNINGS ── */}
          {userRole === 'worker' && activeTab === 'earnings' && (
            <div className="space-y-5">
              <h1 className="font-serif text-2xl font-normal text-gray-900">Earnings</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Total earned',  value: '₹1,24,500', color: 'text-gray-900'  },
                  { label: 'This month',    value: '₹18,300',   color: 'text-brand-600' },
                  { label: 'Pending payout',value: '₹3,800',    color: 'text-amber-600' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 font-light mb-1">{s.label}</p>
                    <p className={`font-serif text-2xl font-normal ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-serif text-base font-normal text-gray-900 mb-4">Monthly breakdown</h2>
                <EarningsChart />
              </div>
            </div>
          )}

          {/* Catch-all placeholder for other tabs */}
          {(['workers','messages','profile','settings'].includes(activeTab)) && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-3xl mb-3">🔨</p>
              <h2 className="font-serif text-xl font-normal text-gray-900 mb-2 capitalize">{activeTab}</h2>
              <p className="text-sm text-gray-400 font-light">This section is coming in the next build.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function JobRow({ job, showWorker, detailed, showRate }) {
  const meta = STATUS_META[job.status]
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
      {showWorker && job.worker && (
        <div className={`w-9 h-9 rounded-full ${job.worker.avatarBg} ${job.worker.avatarText} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
          {job.worker.initials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
        <p className="text-xs text-gray-400 font-light mt-0.5">
          {showWorker && job.worker && `${job.worker.name} · `}{job.date}
          {detailed && job.hours && ` · ${job.hours} hrs`}
        </p>
        {showRate && !job.rated && (
          <button className="text-xs text-amber-600 font-medium mt-1 hover:underline">★ Leave a review</button>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-medium text-gray-900">₹{job.total.toLocaleString()}</p>
        <Badge color={meta.color}>{meta.label}</Badge>
      </div>
    </div>
  )
}

function EarningsChart() {
  const bars = [
    { month: 'Oct', value: 8200  },
    { month: 'Nov', value: 14500 },
    { month: 'Dec', value: 11000 },
    { month: 'Jan', value: 16800 },
    { month: 'Feb', value: 15200 },
    { month: 'Mar', value: 18300 },
  ]
  const max = Math.max(...bars.map(b => b.value))

  return (
    <div className="flex items-end gap-2 h-32">
      {bars.map((b) => (
        <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs text-gray-400 font-light">
            {b.month === 'Mar' ? `₹${(b.value/1000).toFixed(0)}k` : ''}
          </p>
          <div className="w-full relative flex justify-center">
            <div
              className={`w-full rounded-t-lg transition-all ${b.month === 'Mar' ? 'bg-brand-600' : 'bg-gray-100'}`}
              style={{ height: `${(b.value / max) * 80}px` }}
            />
          </div>
          <p className="text-xs text-gray-400 font-light">{b.month}</p>
        </div>
      ))}
    </div>
  )
}

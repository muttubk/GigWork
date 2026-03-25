// ─── Job Categories ───────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 1,  name: 'Electricians',    icon: '⚡', count: 3240, featured: true  },
  { id: 2,  name: 'Plumbers',        icon: '🔧', count: 2180, featured: false },
  { id: 3,  name: 'Drivers',         icon: '🚗', count: 5600, featured: false },
  { id: 4,  name: 'Construction',    icon: '🏗',  count: 4100, featured: false },
  { id: 5,  name: 'IT & Engineers',  icon: '💻', count: 6800, featured: false },
  { id: 6,  name: 'Healthcare',      icon: '🏥', count: 1950, featured: false },
  { id: 7,  name: 'Chefs & Cooks',   icon: '🍳', count: 2400, featured: false },
  { id: 8,  name: 'Cleaning Staff',  icon: '🧹', count: 7200, featured: false },
  { id: 9,  name: 'Workshop Labor',  icon: '🔩', count: 3900, featured: false },
  { id: 10, name: 'Warehouse',       icon: '📦', count: 4700, featured: false },
  { id: 11, name: 'Designers',       icon: '🎨', count: 2100, featured: false },
  { id: 12, name: 'Architects',      icon: '📐', count: 890,  featured: false },
]

// ─── Featured Workers ─────────────────────────────────────────────────────────
export const FEATURED_WORKERS = [
  {
    id: 1,
    name: 'Vikram Nair',
    initials: 'VN',
    role: 'Senior Electrician',
    city: 'Bangalore',
    rating: 4.9,
    reviews: 142,
    hourlyRate: 950,
    available: true,
    skills: ['Industrial wiring', 'Panel work', 'Solar installation'],
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-800',
    experience: 8,
    rateType: 'hourly',
  },
  {
    id: 2,
    name: 'Sunita Patil',
    initials: 'SP',
    role: 'Civil Engineer',
    city: 'Pune',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 1400,
    available: true,
    skills: ['Site inspection', 'Estimation', 'AutoCAD'],
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800',
    experience: 5,
    rateType: 'hourly',
  },
  {
    id: 3,
    name: 'Mohammed Khan',
    initials: 'MK',
    role: 'Delivery Driver',
    city: 'Mumbai',
    rating: 5.0,
    reviews: 310,
    hourlyRate: 700,
    available: true,
    skills: ['Heavy vehicle', 'Night shifts', 'Cold chain'],
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-800',
    experience: 3,
    rateType: 'hourly',
  },
  {
    id: 4,
    name: 'Deepa Krishnan',
    initials: 'DK',
    role: 'Staff Nurse',
    city: 'Chennai',
    rating: 4.9,
    reviews: 76,
    hourlyRate: 1100,
    available: false,
    skills: ['ICU care', 'Paediatrics', 'Home visits'],
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-800',
    experience: 6,
    rateType: 'hourly',
  },
]

// ─── Platform Stats ────────────────────────────────────────────────────────────
export const STATS = [
  { value: '85K+',  label: 'Verified freelancers' },
  { value: '200+',  label: 'Job categories'        },
  { value: '99%',   label: 'Jobs filled on time'   },
  { value: '1.2M+', label: 'Hours worked'          },
]

// ─── How It Works Steps ────────────────────────────────────────────────────────
export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Post your requirement',
    desc: 'Describe the job, set your budget (hourly or daily), and specify when you need the worker. Takes under 2 minutes.',
  },
  {
    step: '02',
    title: 'Review verified profiles',
    desc: 'Browse vetted candidates with real ratings, verified IDs, background checks, and skill certifications.',
  },
  {
    step: '03',
    title: 'Hire & pay securely',
    desc: 'Book with one click. Payment is held in escrow and released only when the job is done to your satisfaction.',
  },
]

// ─── Trust Features ────────────────────────────────────────────────────────────
export const TRUST_FEATURES = [
  {
    icon: '🪪',
    title: 'Government ID verified',
    desc: 'Aadhaar, PAN, and license verification for every worker before they go live on the platform.',
  },
  {
    icon: '🛡',
    title: 'Background checks',
    desc: 'Criminal record and reference checks completed by trusted third-party partners.',
  },
  {
    icon: '💳',
    title: 'Escrow payment protection',
    desc: 'Your payment is only released when the job is complete. Dispute resolution within 24 hours.',
  },
  {
    icon: '⭐',
    title: 'Verified reviews',
    desc: 'All ratings come from real, completed jobs. No fake reviews, ever.',
  },
]

// ─── Nav Links ─────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Browse workers', href: '/browse'   },
  { label: 'How it works',   href: '/#how'     },
  { label: 'Post a job',     href: '/post-job' },
  { label: 'For freelancers',href: '/freelancer'},
]

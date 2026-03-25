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

// ─── Cities ───────────────────────────────────────────────────────────────────
export const CITIES = [
  'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Chennai',
  'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
]

// ─── All Workers (mock data — replace with API later) ─────────────────────────
export const ALL_WORKERS = [
  {
    id: 1, name: 'Vikram Nair',     initials: 'VN', role: 'Senior Electrician', category: 'Electricians',
    city: 'Bangalore', rating: 4.9, reviews: 142, hourlyRate: 950,  dailyRate: 7000,
    available: 'now',  skills: ['Industrial wiring', 'Panel work', 'Solar installation'],
    avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-800', experience: 8,
    bio: 'Certified electrician with 8 years of industrial and residential experience.',
    verified: true, completedJobs: 142,
  },
  {
    id: 2, name: 'Sunita Patil',    initials: 'SP', role: 'Civil Engineer',      category: 'IT & Engineers',
    city: 'Pune',      rating: 4.8, reviews: 89,  hourlyRate: 1400, dailyRate: 10000,
    available: 'now',  skills: ['Site inspection', 'Estimation', 'AutoCAD'],
    avatarBg: 'bg-amber-100',   avatarText: 'text-amber-800',   experience: 5,
    bio: 'Civil engineer specialising in residential and commercial site management.',
    verified: true, completedJobs: 89,
  },
  {
    id: 3, name: 'Mohammed Khan',   initials: 'MK', role: 'Delivery Driver',     category: 'Drivers',
    city: 'Mumbai',    rating: 5.0, reviews: 310, hourlyRate: 700,  dailyRate: 5000,
    available: 'now',  skills: ['Heavy vehicle', 'Night shifts', 'Cold chain'],
    avatarBg: 'bg-blue-100',    avatarText: 'text-blue-800',    experience: 3,
    bio: 'Experienced driver with valid HMV licence and clean driving record.',
    verified: true, completedJobs: 310,
  },
  {
    id: 4, name: 'Deepa Krishnan',  initials: 'DK', role: 'Staff Nurse',         category: 'Healthcare',
    city: 'Chennai',   rating: 4.9, reviews: 76,  hourlyRate: 1100, dailyRate: 8000,
    available: 'today',skills: ['ICU care', 'Paediatrics', 'Home visits'],
    avatarBg: 'bg-pink-100',    avatarText: 'text-pink-800',    experience: 6,
    bio: 'Registered nurse with specialisation in ICU and paediatric care.',
    verified: true, completedJobs: 76,
  },
  {
    id: 5, name: 'Arjun Sharma',    initials: 'AS', role: 'Plumber',             category: 'Plumbers',
    city: 'Delhi',     rating: 4.7, reviews: 203, hourlyRate: 650,  dailyRate: 4500,
    available: 'now',  skills: ['Pipe fitting', 'Drainage', 'Bathroom fitting'],
    avatarBg: 'bg-cyan-100',    avatarText: 'text-cyan-800',    experience: 10,
    bio: 'Expert plumber handling residential and commercial plumbing works.',
    verified: true, completedJobs: 203,
  },
  {
    id: 6, name: 'Priya Menon',     initials: 'PM', role: 'UX Designer',         category: 'Designers',
    city: 'Bangalore', rating: 4.9, reviews: 58,  hourlyRate: 1800, dailyRate: 13000,
    available: 'week', skills: ['Figma', 'User research', 'Prototyping'],
    avatarBg: 'bg-purple-100',  avatarText: 'text-purple-800',  experience: 4,
    bio: 'Product designer with a focus on intuitive, accessible interfaces.',
    verified: true, completedJobs: 58,
  },
  {
    id: 7, name: 'Ravi Teja',       initials: 'RT', role: 'Workshop Technician', category: 'Workshop Labor',
    city: 'Hyderabad', rating: 4.6, reviews: 119, hourlyRate: 550,  dailyRate: 3800,
    available: 'today',skills: ['Lathe operation', 'Welding', 'CNC basics'],
    avatarBg: 'bg-orange-100',  avatarText: 'text-orange-800',  experience: 7,
    bio: 'Skilled workshop technician experienced in lathe, milling, and welding.',
    verified: false, completedJobs: 119,
  },
  {
    id: 8, name: 'Fatima Sheikh',   initials: 'FS', role: 'Head Chef',           category: 'Chefs & Cooks',
    city: 'Mumbai',    rating: 5.0, reviews: 44,  hourlyRate: 1500, dailyRate: 11000,
    available: 'now',  skills: ['Continental', 'Indian cuisine', 'Pastry'],
    avatarBg: 'bg-red-100',     avatarText: 'text-red-800',     experience: 12,
    bio: 'Professional chef with 12 years across 5-star hotels and private events.',
    verified: true, completedJobs: 44,
  },
  {
    id: 9, name: 'Suresh Babu',     initials: 'SB', role: 'Warehouse Supervisor',category: 'Warehouse',
    city: 'Chennai',   rating: 4.5, reviews: 87,  hourlyRate: 600,  dailyRate: 4200,
    available: 'week', skills: ['Inventory management', 'Forklift', 'WMS'],
    avatarBg: 'bg-teal-100',    avatarText: 'text-teal-800',    experience: 9,
    bio: 'Warehouse operations expert with forklift certification.',
    verified: true, completedJobs: 87,
  },
  {
    id: 10, name: 'Kavya Reddy',    initials: 'KR', role: 'Architect',           category: 'Architects',
    city: 'Hyderabad', rating: 4.8, reviews: 31,  hourlyRate: 2000, dailyRate: 15000,
    available: 'today',skills: ['AutoCAD', '3D rendering', 'Site planning'],
    avatarBg: 'bg-indigo-100',  avatarText: 'text-indigo-800',  experience: 6,
    bio: 'Licensed architect specialising in residential and commercial design.',
    verified: true, completedJobs: 31,
  },
  {
    id: 11, name: 'Dinesh Kumar',   initials: 'DK', role: 'Cleaning Supervisor', category: 'Cleaning Staff',
    city: 'Pune',      rating: 4.4, reviews: 265, hourlyRate: 400,  dailyRate: 2800,
    available: 'now',  skills: ['Deep cleaning', 'Industrial', 'Housekeeping'],
    avatarBg: 'bg-lime-100',    avatarText: 'text-lime-800',    experience: 5,
    bio: 'Experienced cleaning professional for offices, homes, and factories.',
    verified: false, completedJobs: 265,
  },
  {
    id: 12, name: 'Meera Iyer',     initials: 'MI', role: 'Full Stack Developer', category: 'IT & Engineers',
    city: 'Bangalore', rating: 4.9, reviews: 67,  hourlyRate: 2200, dailyRate: 16000,
    available: 'week', skills: ['React', 'Node.js', 'PostgreSQL'],
    avatarBg: 'bg-violet-100',  avatarText: 'text-violet-800',  experience: 5,
    bio: 'Full stack developer building scalable web apps with modern tools.',
    verified: true, completedJobs: 67,
  },
]

// ─── Featured Workers (subset used on landing page) ───────────────────────────
export const FEATURED_WORKERS = ALL_WORKERS.slice(0, 4)

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
  { label: 'Browse workers', href: '/browse'    },
  { label: 'How it works',   href: '/#how'      },
  { label: 'Post a job',     href: '/post-job'  },
  { label: 'For freelancers',href: '/freelancer' },
]

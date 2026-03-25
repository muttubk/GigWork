import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle, ArrowRight, Phone } from 'lucide-react'

export default function LoginPage({ mode = 'login' }) {
  const navigate  = useNavigate()
  const isLogin   = mode === 'login'

  // Tabs: 'email' or 'phone'
  const [tab,        setTab]        = useState('email')
  const [step,       setStep]       = useState(1)   // 1 = form, 2 = OTP (phone only)
  const [role,       setRole]       = useState('')  // register only: 'client' | 'worker'
  const [showPw,     setShowPw]     = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [otpValues,  setOtpValues]  = useState(['','','','','',''])
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState({})

  const update = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!isLogin && !form.name.trim())            e.name     = 'Name is required'
    if (!isLogin && !role)                         e.role     = 'Please select your role'
    if (tab === 'email') {
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email'
      if (!isLogin && form.password.length < 8)   e.password = 'Minimum 8 characters'
      if (isLogin && !form.password)              e.password = 'Password is required'
    } else {
      if (!form.phone.match(/^[6-9]\d{9}$/))      e.phone = 'Enter a valid 10-digit mobile number'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (tab === 'phone') { setStep(2); return }
      navigate('/dashboard')
    }, 1200)
  }

  const handleOtp = () => {
    if (otpValues.some(v => !v)) { setErrors({ otp: 'Enter the complete OTP' }); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1000)
  }

  const handleOtpInput = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otpValues]; next[i] = val; setOtpValues(next)
    setErrors({})
    if (val && i < 5) document.getElementById(`otp-${i+1}`)?.focus()
    if (!val && i > 0) document.getElementById(`otp-${i-1}`)?.focus()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-brand-600 p-12">
        <Link to="/" className="font-serif text-2xl font-normal text-white">
          Gig<span className="text-gold-300">Work</span>
        </Link>
        <div>
          <p className="font-serif text-4xl font-normal text-white leading-tight tracking-tight mb-4">
            Work on your terms.<br/>Get paid fairly.
          </p>
          <p className="text-brand-200 font-light text-base leading-relaxed mb-10">
            Join 85,000+ freelancers and businesses already using GigWork to get things done.
          </p>

          {/* Social proof cards */}
          <div className="space-y-3">
            {[
              { initials: 'VN', name: 'Vikram N.', role: 'Electrician, Bangalore', text: '"Earned ₹45,000 last month working 3 days a week."', bg: 'bg-emerald-100', tc: 'text-emerald-800' },
              { initials: 'SP', name: 'Sunita P.', role: 'Civil Engineer, Pune',  text: '"Found a 2-week project within hours of signing up."', bg: 'bg-amber-100',   tc: 'text-amber-800'  },
            ].map((t) => (
              <div key={t.name} className="bg-white/10 rounded-xl p-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full ${t.bg} ${t.tc} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs text-white font-light leading-relaxed mb-1">{t.text}</p>
                  <p className="text-xs text-brand-300 font-medium">{t.name} · {t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-brand-400 font-light">© 2026 GigWork Technologies Pvt. Ltd.</p>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="font-serif text-xl font-normal text-brand-600 block mb-8 lg:hidden">
            Gig<span className="text-gold-400">Work</span>
          </Link>

          {step === 2 ? (
            /* OTP step */
            <div>
              <h1 className="font-serif text-2xl font-normal text-gray-900 mb-1">Verify your number</h1>
              <p className="text-sm text-gray-400 font-light mb-8">
                We sent a 6-digit OTP to <span className="font-medium text-gray-700">+91 {form.phone}</span>
              </p>
              <div className="flex gap-2 mb-2">
                {otpValues.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    className={`w-12 h-12 text-center text-lg font-medium border rounded-xl outline-none transition-colors ${
                      errors.otp ? 'border-red-300' : v ? 'border-brand-600 bg-brand-50' : 'border-gray-200 focus:border-brand-600'
                    }`}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-xs text-red-500 mb-4">{errors.otp}</p>}
              <p className="text-xs text-gray-400 mb-6 font-light">
                Didn't receive it?{' '}
                <button className="text-brand-600 font-medium hover:underline">Resend OTP</button>
              </p>
              <button
                onClick={handleOtp}
                disabled={loading}
                className="w-full py-3 bg-brand-600 text-white text-sm font-medium rounded-full hover:bg-brand-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Spinner /> : <><CheckCircle size={15} /> Verify & continue</>}
              </button>
              <button onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-4 transition-colors">
                ← Change number
              </button>
            </div>
          ) : (
            /* Main form */
            <>
              <h1 className="font-serif text-2xl font-normal text-gray-900 mb-1">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-sm text-gray-400 font-light mb-6">
                {isLogin
                  ? <>Don't have an account? <Link to="/register" className="text-brand-600 font-medium hover:underline">Sign up</Link></>
                  : <>Already have an account? <Link to="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link></>
                }
              </p>

              {/* Role selector (register only) */}
              {!isLogin && (
                <div className="mb-5">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">I want to</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'client', label: 'Hire workers', icon: '🏢', hint: 'Post jobs & hire' },
                      { value: 'worker', label: 'Find work',    icon: '👷', hint: 'Browse & apply'   },
                    ].map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => { setRole(r.value); setErrors(p => ({ ...p, role: '' })) }}
                        className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all ${
                          role === r.value
                            ? 'border-brand-600 bg-brand-50'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className={`text-sm font-medium ${role === r.value ? 'text-brand-700' : 'text-gray-700'}`}>{r.label}</span>
                        <span className="text-xs text-gray-400 font-light">{r.hint}</span>
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
                </div>
              )}

              {/* Name (register only) */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    placeholder="Ravi Kumar"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputCls(errors.name)}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Tab switcher */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
                {[['email','Email'],['phone','Mobile OTP']].map(([v,l]) => (
                  <button key={v} onClick={() => { setTab(v); setErrors({}) }}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${tab===v?'bg-white text-gray-900 shadow-sm':'text-gray-400 hover:text-gray-600'}`}>
                    {l}
                  </button>
                ))}
              </div>

              {tab === 'email' ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                    <input type="email" placeholder="you@example.com" value={form.email}
                      onChange={(e) => update('email', e.target.value)} className={inputCls(errors.email)} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                        onChange={(e) => update('password', e.target.value)} className={inputCls(errors.password) + ' pr-10'} />
                      <button onClick={() => setShowPw(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    {isLogin && (
                      <div className="text-right mt-1">
                        <Link to="/forgot" className="text-xs text-brand-600 hover:underline font-medium">Forgot password?</Link>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm text-gray-500 font-light flex-shrink-0">
                      🇮🇳 +91
                    </div>
                    <input type="tel" inputMode="numeric" maxLength={10} placeholder="98765 43210" value={form.phone}
                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                      className={inputCls(errors.phone) + ' flex-1'} />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  <p className="text-xs text-gray-400 font-light mt-1.5">We'll send a one-time password to this number.</p>
                </div>
              )}

              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-3 bg-brand-600 text-white text-sm font-medium rounded-full hover:bg-brand-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mb-4">
                {loading ? <Spinner /> : (
                  tab === 'phone' && !isLogin
                    ? <><Phone size={15}/> Send OTP</>
                    : isLogin
                      ? <><ArrowRight size={15}/> Sign in</>
                      : <><CheckCircle size={15}/> Create account</>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Google */}
              <button className="w-full py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <GoogleIcon /> Google
              </button>

              <p className="text-xs text-gray-400 text-center mt-6 font-light leading-relaxed">
                By continuing you agree to our{' '}
                <Link to="/#" className="text-brand-600 hover:underline">Terms</Link> and{' '}
                <Link to="/#" className="text-brand-600 hover:underline">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

const inputCls = (err) =>
  `w-full text-sm border rounded-xl px-4 py-2.5 outline-none transition-colors bg-white text-gray-700 placeholder-gray-400 ${
    err ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-brand-600'
  }`

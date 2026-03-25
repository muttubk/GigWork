import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, ChevronLeft, CheckCircle,
  Briefcase, MapPin, Clock, DollarSign, FileText,
} from 'lucide-react'
import { CATEGORIES, CITIES } from '../constants'

const STEPS = [
  { id: 1, label: 'Job details',  icon: FileText   },
  { id: 2, label: 'Location',     icon: MapPin     },
  { id: 3, label: 'Schedule',     icon: Clock      },
  { id: 4, label: 'Budget',       icon: DollarSign },
  { id: 5, label: 'Review',       icon: CheckCircle },
]

const EMPTY_FORM = {
  title:        '',
  category:     '',
  description:  '',
  city:         '',
  address:      '',
  rateType:     'hourly',
  hourlyRate:   '',
  dailyRate:    '',
  startDate:    '',
  duration:     '',
  durationType: 'hours',
  urgency:      'flexible',
}

export default function PostJobPage() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]   = useState({})

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }))
    setErrors((p) => ({ ...p, [key]: '' }))
  }

  // Per-step validation
  const validate = () => {
    const e = {}
    if (step === 1) {
      if (!form.title.trim())       e.title    = 'Please enter a job title'
      if (!form.category)           e.category = 'Please select a category'
      if (form.description.trim().length < 20) e.description = 'Please write at least 20 characters'
    }
    if (step === 2) {
      if (!form.city)    e.city    = 'Please select a city'
      if (!form.address.trim()) e.address = 'Please enter an address or area'
    }
    if (step === 3) {
      if (!form.startDate) e.startDate = 'Please choose a start date'
      if (!form.duration)  e.duration  = 'Please enter the duration'
    }
    if (step === 4) {
      const rate = form.rateType === 'hourly' ? form.hourlyRate : form.dailyRate
      if (!rate || isNaN(rate) || Number(rate) <= 0) e.rate = 'Please enter a valid rate'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 5)) }
  const back = () => setStep((s) => Math.max(s - 1, 1))
  const submit = () => { if (validate()) setSubmitted(true) }

  if (submitted) return <SuccessScreen form={form} />

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-page max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Home</Link>
          <h1 className="font-serif text-3xl font-normal text-gray-900 mt-3 mb-1">Post a job</h1>
          <p className="text-sm text-gray-400 font-light">Fill in the details and get matched with verified workers.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 flex-shrink-0 transition-all ${step > s.id ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step === s.id ? 'bg-brand-600 text-white' :
                  step > s.id  ? 'bg-brand-100 text-brand-700' :
                                 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.id ? <CheckCircle size={14} /> : s.id}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  step === s.id ? 'text-brand-600' : step > s.id ? 'text-gray-500' : 'text-gray-300'
                }`}>{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-all ${step > s.id ? 'bg-brand-200' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">

          {/* Step 1 — Job details */}
          {step === 1 && (
            <StepSection title="Tell us about the job">
              <Field label="Job title" error={errors.title} required>
                <input
                  type="text"
                  placeholder="e.g. Electrician needed for panel wiring"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  className={inputCls(errors.title)}
                />
              </Field>

              <Field label="Category" error={errors.category} required>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => update('category', c.name)}
                      className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl border transition-all text-left ${
                        form.category === c.name
                          ? 'border-brand-600 bg-brand-50 text-brand-700 font-medium'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      <span>{c.icon}</span> {c.name}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </Field>

              <Field label="Job description" error={errors.description} required
                hint="Describe the work, tools needed, special requirements, etc.">
                <textarea
                  rows={4}
                  placeholder="e.g. Need an experienced electrician to rewire a 3-bedroom flat. Must bring own tools..."
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  className={inputCls(errors.description) + ' resize-none'}
                />
                <p className="text-xs text-gray-400 text-right mt-1">{form.description.length} chars</p>
              </Field>
            </StepSection>
          )}

          {/* Step 2 — Location */}
          {step === 2 && (
            <StepSection title="Where is the job?">
              <Field label="City" error={errors.city} required>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update('city', c)}
                      className={`text-sm px-3 py-2.5 rounded-xl border transition-all ${
                        form.city === c
                          ? 'border-brand-600 bg-brand-50 text-brand-700 font-medium'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </Field>

              <Field label="Address / Area" error={errors.address} required
                hint="Street address or area name — shared only with the hired worker.">
                <input
                  type="text"
                  placeholder="e.g. Koramangala 5th Block, near forum mall"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className={inputCls(errors.address)}
                />
              </Field>
            </StepSection>
          )}

          {/* Step 3 — Schedule */}
          {step === 3 && (
            <StepSection title="When do you need the worker?">
              <Field label="Start date" error={errors.startDate} required>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.startDate}
                  onChange={(e) => update('startDate', e.target.value)}
                  className={inputCls(errors.startDate)}
                />
              </Field>

              <Field label="How long is the job?" error={errors.duration} required>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min={1}
                    placeholder="e.g. 4"
                    value={form.duration}
                    onChange={(e) => update('duration', e.target.value)}
                    className={inputCls(errors.duration) + ' flex-1'}
                  />
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    {['hours', 'days'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update('durationType', t)}
                        className={`px-4 py-2 text-sm rounded-lg font-medium capitalize transition-all ${
                          form.durationType === t
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>

              <Field label="Urgency">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'asap',     label: 'ASAP',      hint: 'Within 2 hrs' },
                    { value: 'today',    label: 'Today',     hint: 'Same day'     },
                    { value: 'flexible', label: 'Flexible',  hint: 'Pick a date'  },
                  ].map((u) => (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => update('urgency', u.value)}
                      className={`text-center px-3 py-3 rounded-xl border transition-all ${
                        form.urgency === u.value
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      <p className="text-sm font-medium">{u.label}</p>
                      <p className="text-xs text-gray-400 font-light mt-0.5">{u.hint}</p>
                    </button>
                  ))}
                </div>
              </Field>
            </StepSection>
          )}

          {/* Step 4 — Budget */}
          {step === 4 && (
            <StepSection title="What's your budget?">
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                {['hourly', 'daily'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update('rateType', t)}
                    className={`flex-1 py-2.5 text-sm rounded-lg font-medium capitalize transition-all ${
                      form.rateType === t
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {t} rate
                  </button>
                ))}
              </div>

              <Field
                label={form.rateType === 'hourly' ? 'Hourly budget (₹)' : 'Daily budget (₹)'}
                error={errors.rate}
                hint="Workers will see this as the offered rate. Set a fair market rate to attract quality applicants."
                required
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={form.rateType === 'hourly' ? 'e.g. 800' : 'e.g. 6000'}
                    value={form.rateType === 'hourly' ? form.hourlyRate : form.dailyRate}
                    onChange={(e) => update(form.rateType === 'hourly' ? 'hourlyRate' : 'dailyRate', e.target.value)}
                    className={inputCls(errors.rate) + ' pl-8'}
                  />
                </div>
              </Field>

              {/* Market rate hints */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-medium text-amber-800 mb-2">Market rates for {form.category || 'your category'}</p>
                <div className="flex gap-4 text-xs text-amber-700 font-light">
                  <span>Low: ₹400/hr</span>
                  <span>Avg: ₹800/hr</span>
                  <span>High: ₹1,500/hr</span>
                </div>
              </div>
            </StepSection>
          )}

          {/* Step 5 — Review */}
          {step === 5 && (
            <StepSection title="Review your job post">
              <div className="space-y-4">
                <ReviewRow icon={<Briefcase size={15} />} label="Job" value={form.title} sub={form.category} />
                <ReviewRow icon={<MapPin size={15} />}    label="Location" value={form.city} sub={form.address} />
                <ReviewRow icon={<Clock size={15} />}     label="Schedule"
                  value={form.startDate}
                  sub={`${form.duration} ${form.durationType} · ${
                    form.urgency === 'asap' ? 'ASAP' : form.urgency === 'today' ? 'Today' : 'Flexible'
                  }`}
                />
                <ReviewRow icon={<DollarSign size={15} />} label="Budget"
                  value={`₹${form.rateType === 'hourly' ? form.hourlyRate : form.dailyRate} / ${form.rateType === 'hourly' ? 'hr' : 'day'}`}
                  sub="Payment via escrow"
                />
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">{form.description}</p>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mt-4">
                <p className="text-xs text-brand-700 font-light leading-relaxed">
                  By posting this job you agree to our <span className="font-medium underline cursor-pointer">terms of service</span>.
                  Your contact details are kept private until you hire a worker.
                </p>
              </div>
            </StepSection>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-50">
            <button
              onClick={back}
              className={`flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={15} /> Back
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 text-sm font-medium bg-brand-600 text-white px-6 py-2.5 rounded-full hover:bg-brand-700 transition-colors"
              >
                Continue <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="flex items-center gap-2 text-sm font-medium bg-brand-600 text-white px-8 py-2.5 rounded-full hover:bg-brand-700 transition-colors"
              >
                <CheckCircle size={15} /> Post job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function StepSection({ title, children }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-normal text-gray-900 mb-6">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function Field({ label, children, error, hint, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 font-light mb-2">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

function ReviewRow({ icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-light uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-500 font-light mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function SuccessScreen({ form }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-brand-600" />
        </div>
        <h2 className="font-serif text-2xl font-normal text-gray-900 mb-2">Job posted!</h2>
        <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
          Your job <span className="font-medium text-gray-700">"{form.title}"</span> is live.
          We'll notify you when workers apply — usually within 30 minutes.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Category</span>
            <span className="font-medium text-gray-700">{form.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Location</span>
            <span className="font-medium text-gray-700">{form.city}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Start date</span>
            <span className="font-medium text-gray-700">{form.startDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Budget</span>
            <span className="font-medium text-gray-700">
              ₹{form.rateType === 'hourly' ? form.hourlyRate : form.dailyRate}
              /{form.rateType === 'hourly' ? 'hr' : 'day'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="block text-center text-sm font-medium bg-brand-600 text-white py-3 rounded-full hover:bg-brand-700 transition-colors"
          >
            View in dashboard
          </Link>
          <Link
            to="/browse"
            className="block text-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Browse workers directly →
          </Link>
        </div>
      </div>
    </div>
  )
}

const inputCls = (err) =>
  `w-full text-sm border rounded-xl px-4 py-2.5 outline-none transition-colors bg-white text-gray-700 placeholder-gray-400 ${
    err ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-brand-600'
  }`

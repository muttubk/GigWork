// LoginPage — coming next
export default function LoginPage({ mode = 'login' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-100 rounded-2xl p-10 w-full max-w-md text-center">
        <p className="section-label">{mode === 'login' ? 'Welcome back' : 'Join GigWork'}</p>
        <h1 className="section-title mb-4">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
        <p className="section-sub">Full auth page coming next — email, OTP, and Google sign-in.</p>
      </div>
    </div>
  )
}

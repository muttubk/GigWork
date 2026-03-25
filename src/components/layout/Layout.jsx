import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  // Pages that use a different background
  const isDark = ['/dashboard'].includes(pathname)

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-50' : 'bg-white'}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

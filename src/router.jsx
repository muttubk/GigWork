import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage       from './pages/LandingPage'
import BrowsePage        from './pages/BrowsePage'
import WorkerProfilePage from './pages/WorkerProfilePage'
import PostJobPage       from './pages/PostJobPage'
import DashboardPage     from './pages/DashboardPage'
import LoginPage         from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,          element: <LandingPage />       },
      { path: 'browse',       element: <BrowsePage />        },
      { path: 'worker/:id',   element: <WorkerProfilePage /> },
      { path: 'post-job',     element: <PostJobPage />        },
      { path: 'dashboard',    element: <DashboardPage />      },
    ],
  },
  { path: '/login',    element: <LoginPage /> },
  { path: '/register', element: <LoginPage mode="register" /> },
])

export default router

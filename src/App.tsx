import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import AdminUsersPage from '@/pages/admin/users'
import HomePage from '@/pages/home'
import AfterSchoolExtraPage from '@/pages/afterSchool/extra'
import ErrorPage from './pages/error'
import LandingPage from '@/pages/landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school">
          <Route index element={<div>방과후</div>} />
          <Route path="extra" element={<AfterSchoolExtraPage />} />
        </Route>
        <Route path="/admin">
            <Route index element={<div>관리자</div>} />
            <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

import Manage from '@/pages/manage'
import Record from '@/pages/manage/record'
import Movement from '@/pages/manage/movement'
import AdminMain from './pages/admin/main'
import AdminUsersPage from '@/pages/admin/users'
import HomePage from '@/pages/home'
import BusinessTripPage from '@/pages/admin/business-trip'
import SupervisionPage from '@/pages/supervision'
import AfterSchoolExtraPage from '@/pages/afterSchool/extra'
import ErrorPage from './pages/error'
import LandingPage from '@/pages/landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<SupervisionPage />} />
        <Route path="/manage">
          <Route index element={<Manage />} />
          <Route path="record" element={<Record />} />
          <Route path="movement" element={<Movement />} />
        </Route>
        <Route path="/after-school">
          <Route index element={<div>방과후</div>} />
          <Route path="extra" element={<AfterSchoolExtraPage />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminMain />} />
          <Route path="business-trip" element={<BusinessTripPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
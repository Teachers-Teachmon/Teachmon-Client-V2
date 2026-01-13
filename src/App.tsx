import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

import Manage from '@/pages/manage'
import Record from '@/pages/manage/record'
import Movement from '@/pages/manage/movement'
import AdminMain from './pages/admin/main'
import AdminUsersPage from '@/pages/admin/users'
import AdminFixedMovementPage from '@/pages/admin/fixed-movement'
import AdminFixedMovementCreatePage from '@/pages/admin/fixed-movement/create'
import AdminFixedMovementEditPage from '@/pages/admin/fixed-movement/edit'
import AdminFixedMovementTeamSettingsPage from '@/pages/admin/fixed-movement/team-settings'
import AdminAfterSchoolPage from '@/pages/admin/after-school'
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
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="after-school" element={<AdminAfterSchoolPage />} />
            <Route path="fixed-movement" element={<AdminFixedMovementPage />} />
            <Route path="fixed-movement/create" element={<AdminFixedMovementCreatePage />} />
            <Route path="fixed-movement/edit/:id" element={<AdminFixedMovementEditPage />} />
            <Route path="fixed-movement/team-settings" element={<AdminFixedMovementTeamSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
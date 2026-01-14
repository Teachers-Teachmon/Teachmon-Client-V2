import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

import Manage from '@/pages/manage'
import Record from '@/pages/manage/record'
import Movement from '@/pages/manage/movement'
import AdminMain from './pages/admin/main'
import AdminUsersPage from '@/pages/admin/users'
import AdminFixedMovementPage from '@/pages/admin/fixed-movement'
import AdminFixedMovementFormPage from '@/pages/admin/fixed-movement/create'
import AdminFixedMovementTeamSettingsPage from '@/pages/admin/fixed-movement/team-settings'
import AdminFixedMovementTeamFormPage from '@/pages/admin/fixed-movement/team-settings/create'
import HomePage from '@/pages/home'
import SelfStudyPage from '@/pages/admin/self-study'
import AdminSupervisionPage from '@/pages/admin/supervision'
import BusinessTripPage from '@/pages/admin/business-trip'
import SupervisionPage from '@/pages/supervision'
import AfterSchoolExtraPage from '@/pages/afterSchool/extra'
import ErrorPage from './pages/error'
import LandingPage from '@/pages/landing'

function App() {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
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
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="fixed-movement" element={<AdminFixedMovementPage />} />
            <Route path="fixed-movement/create" element={<AdminFixedMovementFormPage />} />
            <Route path="fixed-movement/edit/:id" element={<AdminFixedMovementFormPage />} />
            <Route path="fixed-movement/team-settings" element={<AdminFixedMovementTeamSettingsPage />} />
            <Route path="fixed-movement/team-settings/create" element={<AdminFixedMovementTeamFormPage />} />
            <Route path="fixed-movement/team-settings/edit/:id" element={<AdminFixedMovementTeamFormPage />} />
            <Route path="self-study" element={<SelfStudyPage />} />
            <Route path="supervision" element={<AdminSupervisionPage />} />
            <Route path="business-trip" element={<BusinessTripPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/home'
import BusinessTripPage from '@/pages/admin/business-trip'
import LandingPage from '@/pages/landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school" element={<div>방과후</div>} />
        <Route path="/admin">
          <Route index element={<div>관리자</div>} />
          <Route path="business-trip" element={<BusinessTripPage />} />
        </Route>
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
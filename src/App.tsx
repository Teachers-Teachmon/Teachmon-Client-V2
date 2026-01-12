import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/home'
import AfterSchoolPage from '@/pages/after-school'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school" element={<AfterSchoolPage />} />
        <Route path="/admin" element={<div>관리자</div>} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
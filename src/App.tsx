import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import AdminMain from './pages/admin/main'
import HomePage from '@/pages/home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school" element={<div>방과후</div>} />
        <Route path="/admin" element={<AdminMain />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/home'
import ErrorPage from './pages/error'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/main" element={<HomePage />} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school" element={<div>방과후</div>} />
        <Route path="/admin" element={<div>관리자</div>} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
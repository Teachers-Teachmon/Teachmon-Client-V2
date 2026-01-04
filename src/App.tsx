import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>홈</div>} />
        <Route path="/supervision" element={<div>자습감독</div>} />
        <Route path="/manage" element={<div>학생관리</div>} />
        <Route path="/after-school" element={<div>방과후</div>} />
        <Route path="/admin" element={<div>관리자</div>} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
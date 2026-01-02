import { Routes, Route } from 'react-router-dom'

function App() {
  return (
      <Routes>
        <Route path="/" element={<div>홈</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
  )
}

export default App
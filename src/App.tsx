import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/ui/Sidebar'
import styled from '@emotion/styled';

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<div>홈</div>} />
          <Route path="/supervision" element={<div>자습감독</div>} />
          <Route path="/manage" element={<div>학생관리</div>} />
          <Route path="/after-school" element={<div>방과후</div>} />
          <Route path="/admin" element={<div>관리자</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MainContent>
    </AppContainer>
  )
}

export default App;

export const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`

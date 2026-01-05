import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/ui/Sidebar'
import DateInput from '@/components/ui/Date'
import styled from '@emotion/styled';

function App() {

  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '2rem' }}>
              <h1>날짜 컴포넌트 테스트</h1>
              
              <div style={{ marginTop: '2rem' }}>
                <DateInput label="시작일"/>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <DateInput />
              </div>
            </div>
          } />
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

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`

export default App;
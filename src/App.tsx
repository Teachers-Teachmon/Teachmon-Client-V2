import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import TextInput from './components/ui/input/textInput'
import Dropdown from './components/ui/input/dropdown'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const [floor, setFloor] = useState('')
  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')
  
  const floors = ['1층', '2층', '3층', '4층', '5층']
  const grades = ['1학년', '2학년', '3학년']
  const subjects = ['수학', '영어', '국어', '과학', '사회', '역사', '물리', '화학', '생물', '지구과학']

  return (
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Input 컴포넌트 테스트</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>TextInput</h2>
              
              <TextInput 
                label="학생 이름"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText="실명을 정확히 입력해주세요"
              />

              <TextInput 
                label="이메일"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email && !email.includes('@') ? '올바른 이메일 형식이 아닙니다' : undefined}
              />

              <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              
              <h2 style={{ marginBottom: '1rem' }}>Dropdown</h2>
              
              <Dropdown
                label="층 선택"
                placeholder="층을 선택해주세요"
                items={floors}
                value={floor}
                onChange={setFloor}
                helperText="교실이 위치한 층을 선택하세요"
              />

              <Dropdown
                label="학년 선택"
                items={grades}
                value={grade}
                onChange={setGrade}
                error={!grade ? '필수 선택 항목입니다' : undefined}
              />

              <Dropdown
                label="과목 선택 (스크롤 테스트)"
                placeholder="과목을 선택해주세요"
                items={subjects}
                value={subject}
                onChange={setSubject}
                customMaxHeight="12rem"
              />

              <Dropdown
                label="비활성화 드롭다운"
                placeholder="선택할 수 없습니다"
                items={floors}
                value=""
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        } />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
  )
}

export default App
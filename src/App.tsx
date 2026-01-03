import { Routes, Route } from 'react-router-dom'
import Modal from './components/layout/modal'
import { useModalStore } from './stores/modal'

function App() {
  return (
      <Routes>
        <Route path="/" element={
          <>
          <button onClick={() => useModalStore.getState().open()}>Open Modal</button>
           <Modal>
          <div>Modal Content</div>
        </Modal>
          </>
         } />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
  )
}

export default App
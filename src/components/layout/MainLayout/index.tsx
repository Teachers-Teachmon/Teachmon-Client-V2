import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/ui/sidebar'
import * as S from './style'

function MainLayout() {
  return (
    <S.LayoutContainer>
      <Sidebar />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  )
}

export default MainLayout

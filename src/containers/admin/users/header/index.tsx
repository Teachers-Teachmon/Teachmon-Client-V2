import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import * as S from './style';

type TabType = '선생님' | '학생';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.TabWrapper>
        <S.TabContainer>
          <S.Tab $active={activeTab === '선생님'} onClick={() => onTabChange('선생님')}>
            선생님
          </S.Tab>
          <S.Tab $active={activeTab === '학생'} onClick={() => onTabChange('학생')}>
            학생
          </S.Tab>
        </S.TabContainer>
      </S.TabWrapper>
      <Button text="돌아가기" variant="confirm" width="100px" onClick={() => navigate('/admin')} />
    </S.Header>
  );
}

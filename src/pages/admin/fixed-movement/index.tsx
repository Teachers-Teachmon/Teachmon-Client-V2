import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FixedMovementTable from '@/containers/admin/fixed-movement/table';
import Button from '@/components/ui/button';
import * as S from './style';

export default function FixedMovementPage() {
  const navigate = useNavigate();
  const [searchQuery] = useState('');

  const handleBack = () => {
    navigate('/admin');
  };

  const handleAdd = () => {
    navigate('/admin/fixed-movement/create');
  };

  const handleTeamSettings = () => {
    navigate('/admin/fixed-movement/team-settings');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>고정 이석</S.Title>
        <S.ButtonGroup>
          <S.HeaderButton onClick={handleAdd}>
            <img src="/icons/admin/fixedMovement.svg" alt="추가하기" />
            <span>추가하기</span>
          </S.HeaderButton>
          <S.HeaderButton onClick={handleTeamSettings}>
            <img src="/icons/admin/team.svg" alt="팀 설정" />
            <span>팀 설정</span>
          </S.HeaderButton>
          <Button text="돌아가기" variant="confirm" width="100px" onClick={handleBack} />
        </S.ButtonGroup>
      </S.Header>
      <FixedMovementTable searchQuery={searchQuery} />
    </S.Container>
  );
}

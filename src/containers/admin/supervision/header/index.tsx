import Button from '@/components/ui/button';
import { useAdminSupervision } from '@/hooks/useAdminSupervision';
import * as S from './style';

export default function AdminSupervisionHeader() {
  const { viewMode, setViewMode, setIsCreateModalOpen, handleSave, handleCancel } = useAdminSupervision();

  return (
    <S.HeaderContainer>
      {viewMode === 'edit' ? (
        <>
          <Button variant="confirm" text="돌아가기" onClick={handleCancel} />
          <Button variant="confirm" text="저장" onClick={handleSave} />
        </>
      ) : (
        <>
          <Button variant="confirm" text="감독 횟수 보기" onClick={() => setViewMode('count')} />
          <Button variant="confirm" text="일정 수정하기" onClick={() => setViewMode('edit')} />
          <Button variant="confirm" text="일정 생성하기" onClick={() => setIsCreateModalOpen(true)} />
        </>
      )}
    </S.HeaderContainer>
  );
}

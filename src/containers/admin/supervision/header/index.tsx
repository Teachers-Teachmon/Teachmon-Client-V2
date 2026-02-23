import Button from '@/components/ui/button';
import * as S from './style';

type ViewMode = 'default' | 'edit';

interface AdminSupervisionHeaderProps {
  viewMode: ViewMode;
  isCountOpen: boolean;
  onToggleCount: () => void;
  onEditMode: () => void;
  onCreateOpen: () => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function AdminSupervisionHeader({
  viewMode,
  isCountOpen,
  onToggleCount,
  onEditMode,
  onCreateOpen,
  onSave,
  onCancel,
  isSaving = false,
}: AdminSupervisionHeaderProps) {
  const isEditMode = viewMode === 'edit';

  return (
    <S.HeaderContainer>
      {isEditMode ? (
        <>
          <Button variant="confirm" text={isCountOpen ? '감독 횟수 닫기' : '감독 횟수 보기'} onClick={onToggleCount} />
          <Button variant="confirm" text="돌아가기" onClick={onCancel} />
          <Button variant="confirm" text="저장" onClick={onSave} isLoading={isSaving} />
        </>
      ) : (
        <>
          <Button variant="confirm" text={isCountOpen ? '감독 횟수 닫기' : '감독 횟수 보기'} onClick={onToggleCount} />
          <Button variant="confirm" text="일정 수정하기" onClick={onEditMode} />
          <Button variant="confirm" text="일정 생성하기" onClick={onCreateOpen} />
        </>
      )}
    </S.HeaderContainer>
  );
}

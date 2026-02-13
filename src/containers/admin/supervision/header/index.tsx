import Button from '@/components/ui/button';
import * as S from './style';

type ViewMode = 'default' | 'count' | 'edit';

interface AdminSupervisionHeaderProps {
  viewMode: ViewMode;
  onShowCount: () => void;
  onEditMode: () => void;
  onCreateOpen: () => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function AdminSupervisionHeader({
  viewMode,
  onShowCount,
  onEditMode,
  onCreateOpen,
  onSave,
  onCancel,
  isSaving = false,
}: AdminSupervisionHeaderProps) {
  return (
    <S.HeaderContainer>
      {viewMode === 'edit' ? (
        <>
          <Button variant="confirm" text="돌아가기" onClick={onCancel} />
          <Button variant="confirm" text="저장" onClick={onSave} isLoading={isSaving} />
        </>
      ) : (
        <>
          <Button variant="confirm" text="감독 횟수 보기" onClick={onShowCount} />
          <Button variant="confirm" text="일정 수정하기" onClick={onEditMode} />
          <Button variant="confirm" text="일정 생성하기" onClick={onCreateOpen} />
        </>
      )}
    </S.HeaderContainer>
  );
}

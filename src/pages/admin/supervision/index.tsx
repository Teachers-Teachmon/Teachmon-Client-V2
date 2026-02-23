import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as S from './style';
import AdminSupervisionHeader from '@/containers/admin/supervision/header';
import AdminSupervisionContent, { type AdminSupervisionContentHandle } from '@/containers/admin/supervision/content';
import AdminSupervisionCreateModal from '@/containers/admin/supervision/create-modal';
import { getApiErrorMessage } from '@/utils/error';

type ViewMode = 'default' | 'edit';

export default function AdminSupervisionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<AdminSupervisionContentHandle>(null);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await contentRef.current?.saveChanges();
      setViewMode('default');
      toast.success('저장되었습니다.');
    } catch (error) {
      console.error('자습감독 일정 저장 실패:', error);
      toast.error(getApiErrorMessage(error, '저장에 실패했습니다.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setViewMode('default');
  };

  return (
    <S.Container>
      <AdminSupervisionHeader
        viewMode={viewMode}
        isCountOpen={isCountOpen}
        onToggleCount={() => setIsCountOpen((prev) => !prev)}
        onEditMode={() => setViewMode('edit')}
        onCreateOpen={() => setIsCreateModalOpen(true)}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      />
      <AdminSupervisionContent
        ref={contentRef}
        viewMode={viewMode}
        isCountOpen={isCountOpen}
        onCountOpenChange={setIsCountOpen}
      />
      <AdminSupervisionCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </S.Container>
  );
}

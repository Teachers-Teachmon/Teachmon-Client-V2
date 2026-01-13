import { useState } from 'react';
import * as S from './style';
import AdminSupervisionHeader from '@/containers/admin/supervision/header';
import AdminSupervisionContent from '@/containers/admin/supervision/content';
import AdminSupervisionCreateModal from '@/containers/admin/supervision/create-modal';

type ViewMode = 'default' | 'count' | 'edit';

export default function AdminSupervisionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSave = () => {
    setViewMode('default');
  };

  const handleCancel = () => {
    setViewMode('default');
  };

  return (
    <S.Container>
      <AdminSupervisionHeader
        viewMode={viewMode}
        onShowCount={() => setViewMode('count')}
        onEditMode={() => setViewMode('edit')}
        onCreateOpen={() => setIsCreateModalOpen(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <AdminSupervisionContent
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <AdminSupervisionCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </S.Container>
  );
}

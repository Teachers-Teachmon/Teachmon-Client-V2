import * as S from './style';
import AdminSupervisionHeader from '@/containers/admin/supervision/header';
import AdminSupervisionContent from '@/containers/admin/supervision/content';
import AdminSupervisionCreateModal from '@/containers/admin/supervision/create-modal';
import { AdminSupervisionProvider } from '@/hooks/useAdminSupervision';

export default function AdminSupervisionPage() {
  return (
    <S.Container>
      <AdminSupervisionProvider>
        <AdminSupervisionHeader />
        <AdminSupervisionContent />
        <AdminSupervisionCreateModal />
      </AdminSupervisionProvider>
    </S.Container>
  );
}

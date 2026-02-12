import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import Button from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import ConfirmModal from '@/components/layout/modal/confirm';
import { teamQuery } from '@/services/team/team.query';
import { useDeleteTeamMutation } from '@/services/team/team.mutation';
import type { Team } from '@/types/fixedMovement';
import * as S from './style';

export default function TeamSettingsPage() {
  const navigate = useNavigate();
  const { data: rawTeams, isLoading, isError } = useQuery(teamQuery.list());
  const deleteMutation = useDeleteTeamMutation();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const teams: Team[] = (rawTeams ?? []).map((t) => ({
    id: String(t.id),
    name: t.name,
    students: t.members.map((m) => ({
      studentNumber: Number(`${m.grade}${String(m.classNumber).padStart(1, '0')}${String(m.number).padStart(2, '0')}`),
      name: m.name,
    })),
  }));

  const handleBack = () => {
    navigate('/admin/fixed-movement');
  };

  const handleAdd = () => {
    navigate('/admin/fixed-movement/team-settings/create');
  };

  const handleEdit = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/admin/fixed-movement/team-settings/edit/${id}`);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDeleteTargetId(Number(id));
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteMutation.mutate({ id: deleteTargetId });
      setDeleteTargetId(null);
    }
  };

  const columns: TableColumn<Team>[] = [
    {
      key: 'name',
      header: '팀 이름',
      width: '200px',
      render: (row) => row.name,
    },
    {
      key: 'students',
      header: '학생',
      width: 'auto',
      render: (row) => (
        <S.StudentList>
          {row.students.slice(0, 5).map((student, idx) => (
            <S.StudentTag key={idx}>
              {student.studentNumber} {student.name}
            </S.StudentTag>
          ))}
          {row.students.length > 5 && (
            <S.StudentTag>...</S.StudentTag>
          )}
        </S.StudentList>
      ),
    },
  ];

  const renderActions = (row: Team) => (
    <S.ActionCell>
      <Button text="수정" variant="confirm" width="100px" onClick={(e) => handleEdit(row.id, e)} />
      <Button text="삭제" variant="delete" width="100px" onClick={(e) => handleDelete(row.id, e)} />
    </S.ActionCell>
  );

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error('팀 목록을 불러오는데 실패했습니다.');
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>팀 설정</S.Title>
        <S.ButtonGroup>
          <S.HeaderButton onClick={handleAdd}>
            <img src="/icons/admin/team.svg" alt="팀 추가하기" />
            <span>팀 추가하기</span>
          </S.HeaderButton>
          <Button text="돌아가기" variant="confirm" width="100px" onClick={handleBack} />
        </S.ButtonGroup>
      </S.Header>
      <S.TableWrapper>
        <TableLayout
          columns={columns}
          data={teams}
          renderActions={renderActions}
        />
      </S.TableWrapper>
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="팀 삭제"
        message="정말 삭제하시겠습니까?"
        confirmText="삭제"
      />
    </S.Container>
  );
}

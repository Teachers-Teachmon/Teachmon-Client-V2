import * as S from './style';
import Button from '@/components/ui/button';
import ConfirmModal from '@/components/layout/modal/confirm';
import { useState } from 'react';

export interface AbsentStudentItem {
  id: number;
  date: string;
  name: string;
}

interface AbsentStudentsProps {
  students: AbsentStudentItem[];
  onDelete: (id: number) => void;
  isError?: boolean;
}

export default function AbsentStudents({ students, onDelete, isError }: AbsentStudentsProps) {
  const showEmpty = isError || students.length === 0;
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <S.AbsentStudentSection>
      <S.SectionHeader>
        <S.SectionTitle>이번주 이탈학생</S.SectionTitle>
      </S.SectionHeader>
      {showEmpty ? (
        <S.EmptyMessage>이번주 이탈학생이 없습니다</S.EmptyMessage>
      ) : (
        <S.AbsentStudentGrid>
          {students.map((student) => (
            <S.AbsentStudentRow key={student.id}>
              <S.StudentInfo>
                <S.StudentDate>{student.date}</S.StudentDate>
                <S.StudentName>{student.name}</S.StudentName>
              </S.StudentInfo>
              <Button 
                text="삭제" 
                variant="delete" 
                onClick={() => handleDeleteClick(student.id, student.name)} 
              />
            </S.AbsentStudentRow>
          ))}
        </S.AbsentStudentGrid>
      )}
    </S.AbsentStudentSection>

    <ConfirmModal
      isOpen={deleteTarget !== null}
      onClose={handleCancelDelete}
      onConfirm={handleConfirmDelete}
      title="이탈 기록 삭제"
      message={`${deleteTarget?.name} 학생의 이탈 기록을 삭제하시겠습니까?`}
      confirmText="삭제"
    />
    </>
  );
}

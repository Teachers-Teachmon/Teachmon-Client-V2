import * as S from './style';
import Button from '@/components/ui/button';

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

  return (
    <S.AbsentStudentSection>
      <S.SectionHeader>
        <S.SectionTitle>이번주 이탈학생</S.SectionTitle>
      </S.SectionHeader>
      {showEmpty ? (
        <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
      ) : (
        <S.AbsentStudentGrid>
          {students.map((student) => (
            <S.AbsentStudentRow key={student.id}>
              <S.StudentInfo>
                <S.StudentDate>{student.date}</S.StudentDate>
                <S.StudentName>{student.name}</S.StudentName>
              </S.StudentInfo>
              <Button text="삭제" variant="delete" onClick={() => onDelete(student.id)} />
            </S.AbsentStudentRow>
          ))}
        </S.AbsentStudentGrid>
      )}
    </S.AbsentStudentSection>
  );
}

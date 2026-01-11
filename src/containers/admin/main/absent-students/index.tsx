import * as S from './style';
import Button from '@/components/ui/button';

export interface AbsentStudentItem {
  id: number;
  date: string;
  name: string;
}

interface AbsentStudentsProps {
  students: AbsentStudentItem[];
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onDelete: (id: number) => void;
}

export default function AbsentStudents({ students, currentPage, totalPages, onPrevPage, onNextPage, onDelete }: AbsentStudentsProps) {
  return (
    <S.AbsentStudentSection>
      <S.SectionHeader>
        <S.SectionTitle>이번주 이탈학생</S.SectionTitle>
        <S.PaginationArrows>
          <S.ArrowButton onClick={onPrevPage} disabled={currentPage === 0} $active={currentPage !== 0}>
            <img src="/icons/admin/leftArrowGray.svg" alt="prev" style={currentPage !== 0 ? { filter: 'invert(48%) sepia(94%) saturate(1465%) hue-rotate(196deg) brightness(97%) contrast(93%)' } : {}} />
          </S.ArrowButton>
          <S.ArrowButton onClick={onNextPage} disabled={currentPage === totalPages - 1} $active={currentPage !== totalPages - 1}>
            <img src="/icons/admin/leftArrowGray.svg" alt="next" style={currentPage !== totalPages - 1 ? { filter: 'invert(48%) sepia(94%) saturate(1465%) hue-rotate(196deg) brightness(97%) contrast(93%)', transform: 'rotate(180deg)' } : { transform: 'rotate(180deg)' }} />
          </S.ArrowButton>
        </S.PaginationArrows>
      </S.SectionHeader>
      <S.AbsentStudentGrid>
        {students.map((student) => (
          <S.AbsentStudentRow key={student.id}>
            <div style={{ display: 'flex', alignItems: 'left', flexDirection: 'column', gap: '8px' }}  >
              <S.StudentDate>{student.date}</S.StudentDate>
              <S.StudentName>{student.name}</S.StudentName>
            </div>
            <Button text="삭제" variant="delete" onClick={() => onDelete(student.id)} />
          </S.AbsentStudentRow>
        ))}
      </S.AbsentStudentGrid>
    </S.AbsentStudentSection>
  );
}

import { useState } from 'react';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import * as S from './style';
import type { AdminAfterSchoolClass } from '@/types/afterSchool';
import { SMILE_OPTIONS } from '@/constants/admin';

interface AdminAfterSchoolTableProps {
  classes: AdminAfterSchoolClass[];
  onEdit: (classData: AdminAfterSchoolClass) => void;
  onDelete: (id: string) => void;
}

export default function AdminAfterSchoolTable({ classes, onEdit, onDelete }: AdminAfterSchoolTableProps) {
  const [selectedTeachers, setSelectedTeachers] = useState<Record<string, string>>({});
  const [selectedSmiles, setSelectedSmiles] = useState<Record<string, string>>({});

  const handleTeacherChange = (id: string, value: string) => {
    setSelectedTeachers(prev => ({ ...prev, [id]: value }));
  };

  const handleSmileChange = (id: string, value: string) => {
    setSelectedSmiles(prev => ({ ...prev, [id]: value }));
  };

  const renderStudents = (students: string[]) => {
    const displayStudents = students.slice(0, 4);
    const hasMore = students.length > 4;

    return (
      <S.StudentList>
        {displayStudents.map((student, idx) => (
          <S.StudentBadge key={idx}>{student}</S.StudentBadge>
        ))}
        {hasMore && <S.MoreBadge>...</S.MoreBadge>}
      </S.StudentList>
    );
  };

  return (
    <S.Container>
      <S.TableHeader>
        <S.HeaderCell>담당교사</S.HeaderCell>
        <S.HeaderCell>장소이름</S.HeaderCell>
        <S.HeaderCell>이름</S.HeaderCell>
        <S.HeaderCell>학생</S.HeaderCell>
        <S.HeaderCell></S.HeaderCell>
      </S.TableHeader>

      <S.TableBody>
        {classes.map(cls => (
          <S.TableRow key={cls.id}>
            <S.Cell>
              <S.DropdownWrapper>
                <Dropdown
                  options={[cls.teacher]}
                  value={selectedTeachers[cls.id] || cls.teacher}
                  onChange={(value) => handleTeacherChange(cls.id, value)}
                  placeholder="선택"
                />
              </S.DropdownWrapper>
            </S.Cell>

            <S.Cell>
              <S.DropdownWrapper>
                <Dropdown
                  options={[...SMILE_OPTIONS]}
                  value={selectedSmiles[cls.id] || cls.smile}
                  onChange={(value) => handleSmileChange(cls.id, value)}
                  placeholder="선택"
                />
              </S.DropdownWrapper>
            </S.Cell>

            <S.Cell>{cls.subject}</S.Cell>

            {renderStudents(cls.students)}

            <S.Cell>
              <S.ActionButtons>
                <Button 
                  text="수정" 
                  variant="confirm" 
                  width="60px" 
                  onClick={() => onEdit(cls)}
                />
                <Button 
                  text="삭제" 
                  variant="delete" 
                  width="60px" 
                  onClick={() => onDelete(cls.id)}
                />
              </S.ActionButtons>
            </S.Cell>
          </S.TableRow>
        ))}
      </S.TableBody>
    </S.Container>
  );
}

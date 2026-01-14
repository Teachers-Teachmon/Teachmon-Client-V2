import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '@/components/ui/input/text-input';
import Button from '@/components/ui/button';
import { MOCK_TEAMS } from '@/constants/fixedMovement';
import type { Student } from '@/types/fixedMovement';
import * as S from '../../create/style';


export default function TeamFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [teamName, setTeamName] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const mockStudents: Student[] = [
    { studentNumber: 1401, name: '김동욱' },
    { studentNumber: 1402, name: '이민수' },
    { studentNumber: 1403, name: '박지훈' },
    { studentNumber: 1404, name: '최예준' },
    { studentNumber: 1405, name: '정서연' },
  ];

  useEffect(() => {
    if (isEditMode) {
      const team = MOCK_TEAMS.find(t => t.id === id);
      if (team) {
        setTeamName(team.name);
        setSelectedStudents(team.students);
      }
    }
  }, [id, isEditMode]);

  const handleAddStudent = (student: Student) => {
    if (!selectedStudents.find(s => s.studentNumber === student.studentNumber)) {
      setSelectedStudents([...selectedStudents, student]);
    }
    setSearchQuery('');
  };

  const handleRemoveStudent = (studentNumber: number) => {
    setSelectedStudents(selectedStudents.filter(s => s.studentNumber !== studentNumber));
  };

  const handleCancel = () => {
    navigate('/admin/fixed-movement/team-settings');
  };

  const handleSubmit = () => {
    console.log({
      id: isEditMode ? id : undefined,
      teamName,
      students: selectedStudents,
    });
    navigate('/admin/fixed-movement/team-settings');
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>{isEditMode ? '팀 수정' : '팀 추가'}</S.Title>

        <S.Form>
          <S.FormSection>
            <S.SectionTitle>팀 이름</S.SectionTitle>
            <TextInput
              placeholder="팀 이름을 입력해주세요"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </S.FormSection>

          <S.FormSection>
            <S.SectionTitle>학생</S.SectionTitle>
            <TextInput
              placeholder="학생을 입력해주세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <img
                  src="/icons/common/search.svg"
                  alt="search"
                  style={{ width: '20px', height: '20px' }}
                />
              }
            />

            {searchQuery && (
              <S.StudentDropdown>
                {mockStudents
                  .filter(student =>
                    `${student.studentNumber} ${student.name}`.includes(searchQuery)
                  )
                  .filter(student =>
                    !selectedStudents.find(s => s.studentNumber === student.studentNumber)
                  )
                  .slice(0, 3)
                  .map((student) => (
                    <S.StudentDropdownItem
                      key={student.studentNumber}
                      onClick={() => handleAddStudent(student)}
                    >
                      {student.studentNumber} {student.name}
                    </S.StudentDropdownItem>
                  ))
                }
              </S.StudentDropdown>
            )}
          </S.FormSection>

          {selectedStudents.length > 0 && (
            <S.StudentGrid>
              {selectedStudents.map((student) => (
                <S.StudentCard key={student.studentNumber}>
                  <S.StudentInfo>
                    <S.StudentNumber>{student.studentNumber}</S.StudentNumber>
                    <S.StudentName>{student.name}</S.StudentName>
                  </S.StudentInfo>
                  <S.RemoveButton onClick={() => handleRemoveStudent(student.studentNumber)}>
                    <img src="/icons/common/x.svg" alt="삭제" width={20} height={20} />
                  </S.RemoveButton>
                </S.StudentCard>
              ))}
            </S.StudentGrid>
          )}
        </S.Form>
      </S.Content>

      <S.ButtonRow>
        <Button text="취소" variant="cancel" width="27rem" onClick={handleCancel} />
        <Button text="완료" variant="confirm" width="27rem" onClick={handleSubmit} />
      </S.ButtonRow>
    </S.Container>
  );
}

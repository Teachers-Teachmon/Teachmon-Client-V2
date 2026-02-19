import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TextInput from '@/components/ui/input/text-input';
import Button from '@/components/ui/button';
import { searchQuery } from '@/services/search/search.query';
import { teamQuery } from '@/services/team/team.query';
import { useCreateTeamMutation, useUpdateTeamMutation } from '@/services/team/team.mutation';
import { useDebounce } from '@/hooks/useDebounce';
import type { Student } from '@/types/fixedMovement';
import * as S from '../../create/style';


export default function TeamFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const createMutation = useCreateTeamMutation();
  const updateMutation = useUpdateTeamMutation();

  const { data: teamsData } = useQuery(teamQuery.list());

  const [teamName, setTeamName] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [studentIdMap, setStudentIdMap] = useState<Record<number, number>>({});
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 300);
  const { data: studentResults = [] } = useQuery(searchQuery.students(debouncedSearch));

  useEffect(() => {
    if (isEditMode && teamsData) {
      const team = teamsData.find((t) => String(t.id) === id);
      if (team) {
        flushSync(() => {
          setTeamName(team.name);
          setSelectedStudents(
            team.members.map((m) => ({
              studentNumber: Number(`${m.grade}${String(m.classNumber).padStart(1, '0')}${String(m.number).padStart(2, '0')}`),
              name: m.name,
            })),
          );
          const idMap: Record<number, number> = {};
          team.members.forEach((m) => {
            const studentNumber = Number(`${m.grade}${String(m.classNumber).padStart(1, '0')}${String(m.number).padStart(2, '0')}`);
            idMap[studentNumber] = m.id;
          });
          setStudentIdMap(idMap);
        });
      }
    }
  }, [isEditMode, teamsData, id]);

  const handleAddStudent = (student: Student) => {
    if (!selectedStudents.find(s => s.studentNumber === student.studentNumber)) {
      flushSync(() => {
        setSelectedStudents([...selectedStudents, student]);
      });
    }
    setSearchInput('');
  };

  const handleRemoveStudent = (studentNumber: number) => {
    setSelectedStudents(selectedStudents.filter(s => s.studentNumber !== studentNumber));
  };

  const handleCancel = () => {
    navigate('/admin/fixed-movement/team-settings');
  };

  const handleSubmit = () => {
    if (!teamName.trim()) {
      toast.error('팀 이름을 입력해주세요.');
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error('학생을 1명 이상 선택해주세요.');
      return;
    }

    if (isEditMode && id) {
      updateMutation.mutate({
        id,
        name: teamName,
        students: selectedStudents.map((s) => ({
          id: studentIdMap[s.studentNumber] ?? s.studentNumber,
          student_number: s.studentNumber,
          name: s.name,
        })),
      });
    } else {
      createMutation.mutate({
        name: teamName,
        students_id: selectedStudents.map((s) => s.studentNumber),
      });
    }
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
            <S.DropdownWrapper>
              <TextInput
                placeholder="학생을 검색해주세요"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                leftIcon={
                  <img
                    src="/icons/common/search.svg"
                    alt="search"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
              />

              {searchInput && studentResults.length > 0 && (
                <S.StudentDropdown>
                  {studentResults
                    .filter(student =>
                      !selectedStudents.find(s => 
                        (studentIdMap[s.studentNumber] && studentIdMap[s.studentNumber] === student.id) || 
                        (!studentIdMap[s.studentNumber] && s.studentNumber === student.id)
                      )
                    )
                    .slice(0, 5)
                    .map((student) => (
                      <S.StudentDropdownItem
                        key={student.id}
                        onClick={() => handleAddStudent({ 
                          studentNumber: typeof student.id === 'number' ? student.id : parseInt(String(student.id)), 
                          name: student.name, 
                          grade: student.grade, 
                          classNumber: student.classNumber 
                        })}
                      >
                        {student.grade}{student.classNumber}{student.number < 10 ? `0${student.number}` : student.number} {student.name}
                      </S.StudentDropdownItem>
                    ))
                  }
                </S.StudentDropdown>
              )}
            </S.DropdownWrapper>
          </S.FormSection>

          {selectedStudents.length > 0 && (
            <S.StudentGrid>
              {selectedStudents.map((student) => (
                <S.StudentCard key={student.studentNumber}>
                  <S.StudentInfo>
                    <S.StudentNumber>{student.grade && student.classNumber ? `${student.grade}${student.classNumber}${student.studentNumber < 10 ? `0${student.studentNumber}` : student.studentNumber}` : student.studentNumber}</S.StudentNumber>
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

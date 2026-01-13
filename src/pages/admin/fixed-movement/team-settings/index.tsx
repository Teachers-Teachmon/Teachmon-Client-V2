import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { LOCATION_OPTIONS } from '@/constants/fixedMovement';
import type { Student } from '@/types/fixedMovement';
import * as S from '../create/style';

export default function TeamSettingsPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockStudents: Student[] = [
    { studentNumber: 1401, name: '김동욱' },
    { studentNumber: 1402, name: '김동욱' },
    { studentNumber: 1403, name: '김동욱' },
    { studentNumber: 1404, name: '김동욱' },
    { studentNumber: 1405, name: '김동욱' },
  ];

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
    navigate('/admin/fixed-movement');
  };

  const handleSubmit = () => {
    console.log({
      teamName,
      location,
      students: selectedStudents,
    });
    navigate('/admin/fixed-movement');
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>팀 설정</S.Title>

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
            <S.SectionTitle>장소</S.SectionTitle>
            <Dropdown
              placeholder="장소"
              items={LOCATION_OPTIONS}
              value={location}
              onChange={setLocation}
            />
          </S.FormSection>

          <S.FormSection>
            <S.SectionTitle>학생</S.SectionTitle>
            <SearchDropdown
              placeholder="학생을 입력해주세요"
              items={mockStudents}
              value={null}
              onChange={handleAddStudent}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              renderItem={(student) => `${student.studentNumber} ${student.name}`}
              getItemKey={(student) => student.studentNumber.toString()}
            />
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
                    ✕
                  </S.RemoveButton>
                </S.StudentCard>
              ))}
            </S.StudentGrid>
          )}
        </S.Form>
      </S.Content>

      <S.ButtonRow>
        <Button text="취소" variant="cancel" onClick={handleCancel} />
        <Button text="완료" variant="confirm" onClick={handleSubmit} />
      </S.ButtonRow>
    </S.Container>
  );
}

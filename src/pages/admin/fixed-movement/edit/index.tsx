import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { WEEKDAYS, PERIOD_OPTIONS, LOCATION_OPTIONS, MOCK_FIXED_MOVEMENTS } from '@/constants/fixedMovement';
import type { Student } from '@/types/fixedMovement';
import * as S from '../create/style';

export default function FixedMovementEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const dayOptions = Object.values(WEEKDAYS);
  
  const mockStudents: Student[] = [
    { studentNumber: 1401, name: '김동욱' },
    { studentNumber: 1402, name: '김동욱' },
    { studentNumber: 1403, name: '김동욱' },
    { studentNumber: 1404, name: '김동욱' },
    { studentNumber: 1405, name: '김동욱' },
  ];

  useEffect(() => {
    const movement = MOCK_FIXED_MOVEMENTS.find(m => m.id === id);
    if (movement) {
      setDayOfWeek(WEEKDAYS[movement.day as keyof typeof WEEKDAYS]);
      setPeriod(movement.period);
      setLocation(movement.location);
      setReason(movement.reason);
      setSelectedStudents(movement.students);
    }
  }, [id]);

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
      id,
      dayOfWeek,
      period,
      location,
      reason,
      isTeamMode,
      students: selectedStudents,
    });
    navigate('/admin/fixed-movement');
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>고정 이석 수정</S.Title>

        <S.Form>
          <S.FormSection>
            <S.SectionTitle>시간</S.SectionTitle>
            <S.InputRow>
              <Dropdown
                placeholder="요일"
                items={dayOptions}
                value={dayOfWeek}
                onChange={setDayOfWeek}
                customWidth="48%"
              />
              <Dropdown
                placeholder="시간"
                items={PERIOD_OPTIONS}
                value={period}
                onChange={setPeriod}
                customWidth="48%"
              />
            </S.InputRow>
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
            <S.SectionTitle>사유</S.SectionTitle>
            <TextInput
              placeholder="사유를 입력해주세요"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </S.FormSection>

          <S.FormSection>
            <S.ToggleRow>
              <S.SectionTitle>학생 팀</S.SectionTitle>
              <S.Toggle
                $active={isTeamMode}
                onClick={() => setIsTeamMode(!isTeamMode)}
              >
                <S.ToggleCircle $active={isTeamMode} />
              </S.Toggle>
            </S.ToggleRow>

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

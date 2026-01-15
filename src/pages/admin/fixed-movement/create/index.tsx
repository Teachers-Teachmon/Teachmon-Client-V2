import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { WEEKDAYS, PERIOD_OPTIONS, LOCATION_OPTIONS, MOCK_FIXED_MOVEMENTS } from '@/constants/fixedMovement';
import type { Student } from '@/types/fixedMovement';
import * as S from './style';


export default function FixedMovementFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
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
    if (isEditMode) {
      const movement = MOCK_FIXED_MOVEMENTS.find(m => m.id === id);
      if (movement) {
        setDayOfWeek(WEEKDAYS[movement.day as keyof typeof WEEKDAYS]);
        setPeriod(movement.period);
        setLocation(movement.location);
        setReason(movement.reason);
        setSelectedStudents(movement.students);
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
    navigate('/admin/fixed-movement');
  };

  const handleSubmit = () => {
    console.log({
      id: isEditMode ? id : undefined,
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
        <S.Title>{isEditMode ? '고정 이석 수정' : '고정 이석 설정'}</S.Title>

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
            <SearchDropdown
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
              <S.SectionTitle>학생</S.SectionTitle>
              <S.ToggleContent>
                <S.SectionTitle>팀</S.SectionTitle>
                <S.Toggle
                  $active={isTeamMode}
                  onClick={() => setIsTeamMode(!isTeamMode)}
                >
                  <S.ToggleCircle $active={isTeamMode} />
                </S.Toggle>
              </S.ToggleContent>
            </S.ToggleRow>

            <S.DropdownWrapper>
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
            </S.DropdownWrapper>
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
        <Button text="취소" variant="cancel" width='27rem' onClick={handleCancel} />
        <Button text="완료" variant="confirm" width='27rem' onClick={handleSubmit} />
      </S.ButtonRow>
    </S.Container>
  );
}

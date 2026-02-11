import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import Button from '@/components/ui/button';
import { WEEKDAYS, PERIOD_OPTIONS, MOCK_FIXED_MOVEMENTS, WEEKDAY_LABEL_TO_API, PERIOD_LABEL_TO_API } from '@/constants/fixedMovement';
import { useCreateFixedMovementMutation } from '@/services/fixed-movement/fixedMovement.mutation';
import { searchQuery } from '@/services/search/search.query';
import { useDebounce } from '@/hooks/useDebounce';
import type { Student, PlaceSearchResponse } from '@/types/fixedMovement';
import * as S from './style';


export default function FixedMovementFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const createMutation = useCreateFixedMovementMutation();
  
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResponse | null>(null);
  const [reason, setReason] = useState<string>('');
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [placeSearchInput, setPlaceSearchInput] = useState('');
  const [teamSearchInput, setTeamSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 300);
  const debouncedPlaceSearch = useDebounce(placeSearchInput, 300);
  const debouncedTeamSearch = useDebounce(teamSearchInput, 300);

  const { data: studentResults = [] } = useQuery(searchQuery.students(debouncedSearch));
  const { data: placeResults = [] } = useQuery(searchQuery.places(debouncedPlaceSearch));
  const { data: teamResults = [] } = useQuery(searchQuery.teams(debouncedTeamSearch));

  const dayOptions = Object.values(WEEKDAYS);

  useEffect(() => {
    if (isEditMode) {
      const movement = MOCK_FIXED_MOVEMENTS.find(m => m.id === id);
      if (movement) {
        setDayOfWeek(WEEKDAYS[movement.day as keyof typeof WEEKDAYS]);
        setPeriod(movement.period);
        setLocation(movement.location);
        setSelectedStudents(movement.students);
      }
    }
  }, [id, isEditMode]);

  const handleAddStudent = (student: Student) => {
    if (!selectedStudents.find(s => s.studentNumber === student.studentNumber)) {
      setSelectedStudents([...selectedStudents, student]);
    }
    setSearchInput('');
  };

  const handleSelectPlace = (place: PlaceSearchResponse) => {
    setSelectedPlace(place);
    setLocation(place.name);
    setPlaceSearchInput('');
  };

  const handleSelectTeam = (teamId: number, teamName: string) => {
    setTeamSearchInput('');
    toast.success(`${teamName} 팀이 선택되었습니다.`);
  };

  const handleRemoveStudent = (studentNumber: number) => {
    setSelectedStudents(selectedStudents.filter(s => s.studentNumber !== studentNumber));
  };

  const handleCancel = () => {
    navigate('/admin/fixed-movement');
  };

  const handleSubmit = () => {
    const weekDay = WEEKDAY_LABEL_TO_API[dayOfWeek];
    const periodEnum = PERIOD_LABEL_TO_API[period];

    if (!weekDay || !periodEnum || !selectedPlace || !reason) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error('학생을 1명 이상 선택해주세요.');
      return;
    }

    createMutation.mutate({
      week_day: weekDay,
      period: periodEnum,
      place_id: selectedPlace.id,
      cause: reason,
      students: selectedStudents.map((s) => s.studentNumber),
    });
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
            <S.DropdownWrapper>
              <TextInput
                placeholder="장소를 검색해주세요"
                value={placeSearchInput || location}
                onChange={(e) => {
                  setPlaceSearchInput(e.target.value);
                  if (!e.target.value) {
                    setSelectedPlace(null);
                    setLocation('');
                  }
                }}
                leftIcon={
                  <img
                    src="/icons/common/search.svg"
                    alt="search"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
              />
              {placeSearchInput && placeResults.length > 0 && (
                <S.StudentDropdown>
                  {placeResults.slice(0, 5).map((place) => (
                    <S.StudentDropdownItem
                      key={place.id}
                      onClick={() => handleSelectPlace(place)}
                    >
                      {place.name} ({place.floor}층)
                    </S.StudentDropdownItem>
                  ))}
                </S.StudentDropdown>
              )}
            </S.DropdownWrapper>
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
                placeholder={isTeamMode ? "팀을 검색해주세요" : "학생을 검색해주세요"}
                value={isTeamMode ? teamSearchInput : searchInput}
                onChange={(e) => {
                  if (isTeamMode) {
                    setTeamSearchInput(e.target.value);
                  } else {
                    setSearchInput(e.target.value);
                  }
                }}
                leftIcon={
                  <img 
                    src="/icons/common/search.svg" 
                    alt="search"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
              />

              {!isTeamMode && searchInput && studentResults.length > 0 && (
                <S.StudentDropdown>
                  {studentResults
                    .filter(student => 
                      !selectedStudents.find(s => s.studentNumber === student.id)
                    )
                    .slice(0, 5)
                    .map((student) => (
                      <S.StudentDropdownItem 
                        key={student.id}
                        onClick={() => handleAddStudent({ studentNumber: student.id, name: student.name })}
                      >
                        {student.grade}{student.class}{String(student.number).padStart(2, '0')} {student.name}
                      </S.StudentDropdownItem>
                    ))
                  }
                </S.StudentDropdown>
              )}

              {isTeamMode && teamSearchInput && teamResults.length > 0 && (
                <S.StudentDropdown>
                  {teamResults.slice(0, 5).map((team) => (
                    <S.StudentDropdownItem
                      key={team.id}
                      onClick={() => handleSelectTeam(team.id, team.name)}
                    >
                      {team.name}
                    </S.StudentDropdownItem>
                  ))}
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

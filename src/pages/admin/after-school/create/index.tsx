import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { ADMIN_AFTER_SCHOOL_PERIODS } from '@/constants/admin';
import { searchQuery } from '@/services/search/search.query';
import { useDebounce } from '@/hooks/useDebounce';
import { createAfterSchoolClass, updateAfterSchoolClass } from '@/services/after-school/afterSchool.api';
import { toast } from 'react-toastify';
import type { StudentSearchResponse, PlaceSearchResponse, TeacherSearchResponse, TeamSearchResponse } from '@/types/search';
import type { CreateAfterSchoolRequest, UpdateAfterSchoolRequest, AdminAfterSchoolClass } from '@/types/afterSchool';
import { WEEKDAY_MAP } from '@/constants/admin';
import * as S from './style';



interface Student {
  id?: string;
  studentNumber: number;
  name: string;
  grade: number;
  classNumber: number;
}

interface Teacher {
  id: number;
  name: string;
}

export default function AfterSchoolFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const routerLocation = useLocation();
  const isEditMode = !!id;
  const editData = routerLocation.state as AdminAfterSchoolClass | null;
  const createData = routerLocation.state as { selectedDay: string } | null;
  
  const [teacher, setTeacher] = useState<Teacher | null>(
    isEditMode && editData ? { id: editData.teacherId, name: editData.teacher } : null
  );
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<PlaceSearchResponse | null>(
    isEditMode && editData ? { id: editData.placeId, name: editData.location, floor: 1 } : null
  );
  const [period, setPeriod] = useState<string>(editData?.period || '');
  const [subject, setSubject] = useState<string>(editData?.subject || '');
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>(
    isEditMode && editData ? editData.students.map((s, idx) => {
      const parts = s.split(' ');
      const studentNumber = parseInt(parts[0]) || 0;
      const name = parts.slice(1).join(' ');
      return {
        id: (editData.studentIds?.[idx] ?? 0).toString(),
        studentNumber,
        name,
        grade: editData.grade,
        classNumber: 1,
      };
    }) : []
  );
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const debouncedStudentSearch = useDebounce(studentSearchQuery, 300);
  const debouncedLocationSearch = useDebounce(locationSearchQuery, 300);
  const debouncedTeacherSearch = useDebounce(teacherSearchQuery, 300);

  const { data: studentsData = [] } = useQuery({
    ...searchQuery.students(debouncedStudentSearch),
    enabled: debouncedStudentSearch.length > 0,
  }) as { data: StudentSearchResponse[] };

  const { data: placesData = [] } = useQuery({
    ...searchQuery.places(debouncedLocationSearch),
    enabled: debouncedLocationSearch.length > 0,
  }) as { data: PlaceSearchResponse[] };

  const { data: teachersData = [] } = useQuery({
    ...searchQuery.teachers(debouncedTeacherSearch),
    enabled: debouncedTeacherSearch.length > 0,
  }) as { data: TeacherSearchResponse[] };

  const { data: teamsData = [] } = useQuery({
    ...searchQuery.teams(debouncedStudentSearch),
    enabled: debouncedStudentSearch.length > 0 && isTeamMode,
  }) as { data: TeamSearchResponse[] };

  const handleAddStudent = (student: StudentSearchResponse | TeamSearchResponse) => {
    if ('members' in student) {
      const newStudents: Student[] = student.members.map(member => ({
        id: member.id.toString(),
        studentNumber: member.number,
        name: member.name,
        grade: member.grade,
        classNumber: member.classNumber,
      }));
      setSelectedStudents([...selectedStudents, ...newStudents]);
    } else {
      const newStudent: Student = {
        id: student.id.toString(),
        studentNumber: student.number,
        name: student.name,
        grade: student.grade,
        classNumber: student.classNumber,
      };
      setSelectedStudents([...selectedStudents, newStudent]);
    }
    setStudentSearchQuery('');
  };

  const formatStudentDisplay = (student: Student | StudentSearchResponse) => {
    const name = student.name;
    const baseNumber = 'number' in student ? student.number : (student as Student).studentNumber;
    const grade = (student as Student).grade ?? (student as StudentSearchResponse).grade;
    const classNumber = (student as Student).classNumber ?? (student as StudentSearchResponse).classNumber;

    const displayNumber = `${grade}${classNumber}${String(baseNumber).padStart(2, '0')}`;
  
    return `${displayNumber} ${name}`;
  };

  const handleRemoveStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleCancel = () => {
    navigate('/admin/after-school');
  };

  const handleSubmit = async () => {
    if (!teacher || !selectedLocation || !period || !subject || selectedStudents.length === 0) {
      toast.error('모든 필드를 채워주세요.');
      return;
    }

    try {
      const currentYear = new Date().getFullYear();
      if (isEditMode) {
        const mappedPeriod =
          period === '8~9교시'
            ? 'EIGHT_AND_NINE_PERIOD'
            : period === '10~11교시'
            ? 'TEN_AND_ELEVEN_PERIOD'
            : 'SEVEN_AND_EIGHT_PERIOD';

        const requestData: UpdateAfterSchoolRequest = {
          grade: selectedStudents[0].grade,
          week_day: createData?.selectedDay ? WEEKDAY_MAP[createData.selectedDay as keyof typeof WEEKDAY_MAP] : 'MON',
          period: mappedPeriod,
          year: currentYear,
          after_school_id: id as string,
          teacher_id: teacher.id,
          place_id: selectedLocation.id,
          name: subject,
          students_id: selectedStudents.map((s) => parseInt(s.id || '0')),
        };

        await updateAfterSchoolClass(requestData);
        toast.success('방과후가 성공적으로 수정되었습니다.');
      } else {
        const baseRequest: Omit<CreateAfterSchoolRequest, 'period'> = {
          grade: selectedStudents[0].grade,
          week_day: createData?.selectedDay ? WEEKDAY_MAP[createData.selectedDay as keyof typeof WEEKDAY_MAP] : 'MON',
          year: currentYear,
          teacher_id: teacher.id,
          place_id: selectedLocation.id,
          name: subject,
          students_id: selectedStudents.map((s) => parseInt(s.id || '0')),
        };

        if (period === '8~11교시') {
          // 백엔드에 8~11 교시가 없다면 8~9, 10~11 두 번 생성
          await Promise.all([
            createAfterSchoolClass({
              ...baseRequest,
              period: 'EIGHT_AND_NINE_PERIOD',
            }),
            createAfterSchoolClass({
              ...baseRequest,
              period: 'TEN_AND_ELEVEN_PERIOD',
            }),
          ]);
        } else {
          const mappedPeriod =
            period === '8~9교시'
              ? 'EIGHT_AND_NINE_PERIOD'
              : period === '10~11교시'
              ? 'TEN_AND_ELEVEN_PERIOD'
              : 'SEVEN_AND_EIGHT_PERIOD';

          await createAfterSchoolClass({
            ...baseRequest,
            period: mappedPeriod,
          });
        }

        toast.success('방과후가 성공적으로 생성되었습니다.');
      }
      navigate('/admin/after-school');
    } catch (error) {
      toast.error(isEditMode ? '방과후 수정에 실패했습니다.' : '방과후 생성에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>{isEditMode ? '방과후 수정' : '방과후 추가'}</S.Title>

        <S.Form>
          <S.FormSection>
            <S.SectionTitle>담당 교사</S.SectionTitle>
            <SearchDropdown
              placeholder="교사"
              items={teachersData.map((t: TeacherSearchResponse) => t.name)}
              value={teacher?.name || ''}
              onChange={(value) => {
                const teacher = teachersData.find((t: TeacherSearchResponse) => t.name === value);
                setTeacher(teacher || null);
              }}
              searchQuery={teacherSearchQuery}
              onSearchChange={setTeacherSearchQuery}
            />
          </S.FormSection>


          <S.FormSection>
            <S.SectionTitle>장소</S.SectionTitle>
            <SearchDropdown
              placeholder="장소"
              items={placesData.map((p: PlaceSearchResponse) => p.name)}
              value={selectedLocation?.name || ''}
              onChange={(value) => {
                const place = placesData.find((p: PlaceSearchResponse) => p.name === value);
                setSelectedLocation(place || null);
              }}
              searchQuery={locationSearchQuery}
              onSearchChange={setLocationSearchQuery}
            />
          </S.FormSection>

          <S.FormSection>
            <S.SectionTitle>교시</S.SectionTitle>
            <Dropdown
              placeholder="교시 선택"
              items={[...ADMIN_AFTER_SCHOOL_PERIODS]}
              value={period}
              onChange={setPeriod}
              customWidth="100%"
            />
          </S.FormSection>

          <S.FormSection>
            <S.SectionTitle>방과후 이름</S.SectionTitle>
            <TextInput
              placeholder="방과후 이름을 입력해주세요"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                leftIcon={
                  <img 
                    src="/icons/common/search.svg" 
                    alt="search"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
              />

              {studentSearchQuery && (
                <S.StudentDropdown>
                  {isTeamMode ? (
                    teamsData
                      .filter((team: TeamSearchResponse) => 
                        !selectedStudents.find(s => s.id?.toString().includes(team.id))
                      )
                      .slice(0, 3)
                      .map((team: TeamSearchResponse) => (
                        <S.StudentDropdownItem 
                          key={team.id}
                          onClick={() => handleAddStudent(team)}
                        >
                          {team.name} ({team.members.length}명)
                        </S.StudentDropdownItem>
                      ))
                  ) : (
                    studentsData
                      .filter((student: StudentSearchResponse) => 
                        !selectedStudents.find(s => s.studentNumber === student.number)
                      )
                      .slice(0, 3)
                      .map((student: StudentSearchResponse) => (
                        <S.StudentDropdownItem 
                          key={student.id}
                          onClick={() => handleAddStudent(student)}
                        >
                          {formatStudentDisplay(student)}
                        </S.StudentDropdownItem>
                      ))
                  )}
                </S.StudentDropdown>
              )}
            </S.DropdownWrapper>
          </S.FormSection>

          {selectedStudents.length > 0 && (
            <S.StudentGrid>
              {selectedStudents.map((student) => (
                <S.StudentCard key={`${student.id || student.studentNumber}-${student.name}-${student.grade}`}>
                  <S.StudentInfo>
                    <S.StudentNumber>{formatStudentDisplay(student).split(' ')[0]}</S.StudentNumber>
                    <S.StudentName>{formatStudentDisplay(student).split(' ').slice(1).join(' ')}</S.StudentName>
                  </S.StudentInfo>
                  <S.RemoveButton onClick={() => handleRemoveStudent(String(student.id || student.studentNumber))}>
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
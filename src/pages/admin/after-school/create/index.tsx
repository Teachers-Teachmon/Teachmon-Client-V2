import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { MOCK_ADMIN_AFTER_SCHOOL, ADMIN_AFTER_SCHOOL_PERIODS } from '@/constants/admin';
import { searchQuery as searchApiQuery } from '@/services/search/search.query';
import { createAfterSchoolClass } from '@/services/after-school/afterSchool.api';
import { toast } from 'react-toastify';
import type { StudentSearchResponse, PlaceSearchResponse, TeacherSearchResponse, TeamSearchResponse } from '@/types/search';
import type { CreateAfterSchoolRequest } from '@/types/afterSchool';
import * as S from './style';



interface Student {
  id?: number | string;
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
  const isEditMode = !!id;
  
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [location, setLocation] = useState<PlaceSearchResponse | null>(null);
  const [period, setPeriod] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  // 검색 API 호출
  const { data: studentsData = [] } = useQuery({
    ...searchApiQuery.students(searchQuery),
    enabled: searchQuery.length > 0,
  }) as { data: StudentSearchResponse[] };

  const { data: placesData = [] } = useQuery({
    ...searchApiQuery.places(locationSearchQuery),
    enabled: locationSearchQuery.length > 0,
  }) as { data: PlaceSearchResponse[] };

  const { data: teachersData = [] } = useQuery({
    ...searchApiQuery.teachers(teacherSearchQuery),
    enabled: teacherSearchQuery.length > 0,
  }) as { data: TeacherSearchResponse[] };

  const { data: teamsData = [] } = useQuery({
    ...searchApiQuery.teams(searchQuery),
    enabled: searchQuery.length > 0 && isTeamMode,
  }) as { data: TeamSearchResponse[] };

  useEffect(() => {
    if (isEditMode) {
      const classData = MOCK_ADMIN_AFTER_SCHOOL.find(c => c.id === id);
      if (classData) {
        setTeacher({ id: 1, name: classData.teacher });
        setLocation({ id: 1, name: classData.location, floor: 1 });
        setPeriod(classData.period || '');
        setSubject(classData.subject);
        const students = classData.students.map((studentStr, idx) => {
          const parts = studentStr.split(' ');
          const studentNumber = parseInt(parts[0]) || 1410 + idx * 10;
          const name = parts.slice(1).join(' ') || studentStr;
          return {
            id: `existing-${idx}`,
            studentNumber,
            name,
            grade: 1,
            classNumber: 1,
          };
        });
        setSelectedStudents(students);
      }
    }
  }, [id, isEditMode]);

  const handleAddStudent = (student: StudentSearchResponse | TeamSearchResponse) => {
    if ('members' in student) {
      const newStudents: Student[] = student.members.map(member => ({
        id: member.id, // 원래 학생 ID 저장
        studentNumber: member.number,
        name: member.name,
        grade: member.grade,
        classNumber: member.classNumber,
      }));
      setSelectedStudents([...selectedStudents, ...newStudents]);
    } else {
      const newStudent: Student = {
        id: student.id,
        studentNumber: student.number,
        name: student.name,
        grade: student.grade,
        classNumber: student.classNumber,
      };
      setSelectedStudents([...selectedStudents, newStudent]);
    }
    setSearchQuery('');
  };

  const formatStudentDisplay = (student: Student | StudentSearchResponse) => {
    const name = student.name;
    const number = 'number' in student ? student.number : (student as Student).studentNumber;
    const grade = 'grade' in student ? student.grade : (student as Student).grade;
    const classNumber = 'classNumber' in student ? student.classNumber : (student as Student).classNumber;
    
    const formattedNumber = number < 10 ? `0${number}` : number.toString();
  
    return `${grade}${classNumber}${formattedNumber} ${name}`;
  };

  const handleRemoveStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleCancel = () => {
    navigate('/admin/after-school');
  };

  const handleSubmit = async () => {
    if (!teacher || !location || !period || !subject || selectedStudents.length === 0) {
      toast.error('모든 필드를 채워주세요.');
      return;
    }

    try {
      const requestData: CreateAfterSchoolRequest = {
        grade: selectedStudents[0].grade, 
        week_day: 'MON',
        period: period === '8~9교시' ? 'EIGHT_AND_NINE_PERIOD' : 'TEN_AND_ELEVEN_PERIOD',
        teacher_id: teacher.id,
        place_id: location.id,
        name: subject,
        students_id: selectedStudents.map(s => s.id as number),
        year: new Date().getFullYear(), 
      };

      await createAfterSchoolClass(requestData);
      toast.success('방과후가 성공적으로 생성되었습니다.');
      navigate('/admin/after-school');
    } catch (error) {
      toast.error('방과후 생성에 실패했습니다.');
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
              value={location?.name || ''}
              onChange={(value) => {
                const place = placesData.find((p: PlaceSearchResponse) => p.name === value);
                setLocation(place || null);
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
                  {isTeamMode ? (
                    // 팀 검색 모드
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
                    // 개별 학생 검색 모드
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
                <S.StudentCard key={student.id || student.studentNumber}>
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
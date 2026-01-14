import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Button from '@/components/ui/button';
import { MOCK_ADMIN_AFTER_SCHOOL } from '@/constants/admin';
import * as S from './style';

const TEACHER_OPTIONS = ['차수민', '차수민2', '차수민3', '차수민4'];



interface Student {
  id?: string;
  studentNumber: number;
  name: string;
}

export default function AfterSchoolFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  const [teacher, setTeacher] = useState<string>('');
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [location, setLocation] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const mockStudents: Student[] = [
    { id: 'mock-1', studentNumber: 1402, name: '김동욱' },
    { id: 'mock-2', studentNumber: 1403, name: '김동욱2' },
    { id: 'mock-3', studentNumber: 1404, name: '김동욱3' },
    { id: 'mock-4', studentNumber: 1405, name: '김동욱4' },
    { id: 'mock-5', studentNumber: 1406, name: '김동욱5' },
  ];

  const mockLocationNames: string[] = [
    '객체지향 프로그래밍',
    '파이썬을 이용한 문제해결',
    '스프링 수업',
    '1학년 1반',
    '1학년 2반',
    '음악실',
  ];

  useEffect(() => {
    if (isEditMode) {
      const classData = MOCK_ADMIN_AFTER_SCHOOL.find(c => c.id === id);
      if (classData) {
        setTeacher(classData.teacher);
        setLocation(classData.location);
        setSubject(classData.subject);
        const students = classData.students.map((studentStr, idx) => {
          const parts = studentStr.split(' ');
          const studentNumber = parseInt(parts[0]) || 1410 + idx * 10;
          const name = parts.slice(1).join(' ') || studentStr;
          return {
            id: `existing-${idx}`,
            studentNumber,
            name,
          };
        });
        setSelectedStudents(students);
      }
    }
  }, [id, isEditMode]);

  const handleAddStudent = (student: Student) => {
    const newStudent = {
      ...student,
      id: `new-${Date.now()}-${Math.random()}`,
    };
    setSelectedStudents([...selectedStudents, newStudent]);
    setSearchQuery('');
  };

  const handleRemoveStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleCancel = () => {
    navigate('/admin/after-school');
  };

  const handleSubmit = () => {
    console.log({
      id: isEditMode ? id : undefined,
      teacher,
      location,
      subject,
      isTeamMode,
      students: selectedStudents,
    });
    navigate('/admin/after-school');
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>{isEditMode ? '수정 방과후' : '추가 방과후'}</S.Title>

        <S.Form>
          <S.FormSection>
            <S.SectionTitle>담당 교사</S.SectionTitle>
            <SearchDropdown
              placeholder="교사"
              items={TEACHER_OPTIONS.filter((t) => t.includes(teacherSearchQuery))}
              value={teacher}
              onChange={setTeacher}
              searchQuery={teacherSearchQuery}
              onSearchChange={setTeacherSearchQuery}
            />
          </S.FormSection>

          <S.FormSection>
            <S.SectionTitle>장소</S.SectionTitle>
            <SearchDropdown
              placeholder="장소"
              items={mockLocationNames}
              value={location}
              onChange={setLocation}
              searchQuery={locationSearchQuery}
              onSearchChange={setLocationSearchQuery}
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
        <Button text="취소" variant="cancel" width="27rem" onClick={handleCancel} />
        <Button text="완료" variant="confirm" width="27rem" onClick={handleSubmit} />
      </S.ButtonRow>
    </S.Container>
  );
}
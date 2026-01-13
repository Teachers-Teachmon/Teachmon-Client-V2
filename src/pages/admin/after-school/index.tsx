import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import TableLayout from '@/components/layout/table';
import type { TableColumn } from '@/components/layout/table/types';
import AfterSchoolDetailModal from '@/containers/admin/after-school/detail-modal';
import * as S from './style';
import { WEEKDAYS, MOCK_ADMIN_AFTER_SCHOOL } from '@/constants/admin';
import type { AdminAfterSchoolClass } from '@/types/afterSchool';

export default function AdminAfterSchoolPage() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [selectedQuarter, setSelectedQuarter] = useState('1분기');
  const [selectedDay, setSelectedDay] = useState(WEEKDAYS[0]);
  const [selectedTeachers, setSelectedTeachers] = useState<Record<string, string>>({});
  const [selectedSmiles, setSelectedSmiles] = useState<Record<string, string>>({});
  const [classes, setClasses] = useState<AdminAfterSchoolClass[]>(MOCK_ADMIN_AFTER_SCHOOL);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [selectedClass, setSelectedClass] = useState<AdminAfterSchoolClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClasses = classes.filter(
    cls => cls.grade === selectedGrade && cls.day === selectedDay
  );

  const handleEdit = (classData: AdminAfterSchoolClass, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/admin/after-school/edit/${classData.id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClasses(prev => prev.filter(cls => cls.id !== id));
  };

  const handleAdd = () => {
    navigate('/admin/after-school/create');
  };

  const handleRowClick = (classData: AdminAfterSchoolClass) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  const handleGoogleSheetSync = () => {
    console.log('시트 동기화:', googleSheetUrl);
  };

  const handleGoogleSheetUpload = () => {
    console.log('시트 업로드:', googleSheetUrl);
  };

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

  const columns: TableColumn<AdminAfterSchoolClass>[] = [
    {
      key: 'teacher',
      header: '담당교사',
      width: '120px',
    },
    {
      key: 'location',
      header: '장소이름',
      width: '250px',
    },
    {
      key: 'subject',
      header: '이름',
      width: '300px',
    },
    {
      key: 'students',
      header: '학생',
      width: '350px',
      render: (row) => renderStudents(row.students),
    },
  ];

  const handlePrevDay = () => {
    const currentIndex = WEEKDAYS.indexOf(selectedDay);
    const prevIndex = currentIndex === 0 ? WEEKDAYS.length - 1 : currentIndex - 1;
    setSelectedDay(WEEKDAYS[prevIndex]);
  };

  const handleNextDay = () => {
    const currentIndex = WEEKDAYS.indexOf(selectedDay);
    const nextIndex = currentIndex === WEEKDAYS.length - 1 ? 0 : currentIndex + 1;
    setSelectedDay(WEEKDAYS[nextIndex]);
  };

  const currentDayIndex = WEEKDAYS.indexOf(selectedDay);
  const prevDayIndex = currentDayIndex === 0 ? WEEKDAYS.length - 1 : currentDayIndex - 1;
  const nextDayIndex = currentDayIndex === WEEKDAYS.length - 1 ? 0 : currentDayIndex + 1;
  const prevDay = WEEKDAYS[prevDayIndex];
  const nextDay = WEEKDAYS[nextDayIndex];

  const renderActions = (row: AdminAfterSchoolClass) => (
    <S.ActionButtons>
      <Button text="수정" variant="confirm" width="100px" onClick={(e) => handleEdit(row, e)} />
      <Button text="삭제" variant="delete" width="100px" onClick={(e) => handleDelete(row.id, e)} />
    </S.ActionButtons>
  );

  return (
    <>
      <AfterSchoolDetailModal
        classData={selectedClass}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <S.PageContainer>
        <S.Header>
          <S.LeftSection>
            <S.QuarterDropdown>
              <Dropdown
                items={['1분기', '2분기', '3분기', '4분기']}
                value={selectedQuarter}
                onChange={setSelectedQuarter}
                placeholder="분기 선택"
              />
            </S.QuarterDropdown>

            <S.GradeTabs>
              <S.GradeTab $active={selectedGrade === 1} onClick={() => setSelectedGrade(1)}>1학년</S.GradeTab>
              <S.GradeTab $active={selectedGrade === 2} onClick={() => setSelectedGrade(2)}>2학년</S.GradeTab>
              <S.GradeTab $active={selectedGrade === 3} onClick={() => setSelectedGrade(3)}>3학년</S.GradeTab>
            </S.GradeTabs>
          </S.LeftSection>

          <S.HeaderButtons>
            <TextInput
              placeholder="구글스프레드시트"
              value={googleSheetUrl}
              onChange={(e) => setGoogleSheetUrl(e.target.value)}
            />
            <S.GoogleSheetActionButton onClick={handleGoogleSheetSync}>시트 동기화</S.GoogleSheetActionButton>
            <S.GoogleSheetActionButton onClick={handleGoogleSheetUpload}>시트 업로드</S.GoogleSheetActionButton>
          </S.HeaderButtons>
        </S.Header>

        <S.DaySelector>
          <S.NavButton onClick={handlePrevDay}>
            «
          </S.NavButton>
          <S.DayText $active={false} onClick={handlePrevDay}>
            {prevDay}
          </S.DayText>
          <S.DayText $active={true}>
            {selectedDay}
          </S.DayText>
          <S.DayText $active={false} onClick={handleNextDay}>
            {nextDay}
          </S.DayText>
          <S.NavButton onClick={handleNextDay}>
            »
          </S.NavButton>
        </S.DaySelector>

        <S.ContentWrapper>
          <S.TableWrapper>
            <TableLayout
              columns={columns}
              data={filteredClasses}
              renderActions={renderActions}
              actionsHeader=""
              onRowClick={handleRowClick}
            />
          </S.TableWrapper>

          <S.AddButtonWrapper>
            <Button text="+ 추가" variant="confirm" width="200px" onClick={handleAdd} />
          </S.AddButtonWrapper>
        </S.ContentWrapper>
      </S.PageContainer>
    </>
  );
}

import { useState } from 'react';
import Button from '@/components/ui/button';
import AdminAfterSchoolHeaderContainer from '@/containers/admin/after-school/after-school-header';
import TableLayout from '@/components/layout/table';
import type { TableColumn } from '@/types/afterSchool';
import * as S from './style';
import { WEEKDAYS, MOCK_ADMIN_AFTER_SCHOOL } from '@/constants/admin';
import type { AdminAfterSchoolClass } from '@/types/afterSchool';
import { useNavigate } from 'react-router-dom';
import AfterSchoolDetailModal from '@/containers/admin/after-school/detail-modal';

export default function AdminAfterSchoolPage() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [selectedClass, setSelectedClass] = useState<AdminAfterSchoolClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState('1분기');
  const [selectedDay, setSelectedDay] = useState<(typeof WEEKDAYS)[number]>(WEEKDAYS[0]);
  const [classes, setClasses] = useState<AdminAfterSchoolClass[]>(MOCK_ADMIN_AFTER_SCHOOL);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');

  const filteredClasses = classes.filter(
    cls => cls.grade === selectedGrade && cls.day === selectedDay
  );

  const handleEdit = (classData: AdminAfterSchoolClass, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/admin/after-school/edit/${classData.id}`);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
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

  const renderStudents = (students: string[]) => {
    const displayStudents = students.slice(0, 3);
    const hasMore = students.length > 3;
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
      key: 'period',
      header: '교시',
      width: '100px',
      render: (row: AdminAfterSchoolClass) => row.period,
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
      width: '200px',
      render: (row: AdminAfterSchoolClass) => renderStudents(row.students),
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
        <AdminAfterSchoolHeaderContainer
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          googleSheetUrl={googleSheetUrl}
          setGoogleSheetUrl={setGoogleSheetUrl}
          handleGoogleSheetSync={handleGoogleSheetSync}
          handleGoogleSheetUpload={handleGoogleSheetUpload}
        />

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
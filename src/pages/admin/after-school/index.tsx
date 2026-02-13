import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/button';
import AdminAfterSchoolHeaderContainer from '@/containers/admin/after-school/after-school-header';
import TableLayout from '@/components/layout/table';
import ConfirmModal from '@/components/layout/modal/confirm';
import Loading from '@/components/ui/loading';
import type { TableColumn, AfterSchoolRequestParams } from '@/types/afterSchool';
import * as S from './style';
import { WEEKDAYS, WEEKDAY_MAP } from '@/constants/admin';
import type { AdminAfterSchoolClass } from '@/types/afterSchool';
import { useNavigate } from 'react-router-dom';
import AfterSchoolDetailModal from '@/containers/admin/after-school/detail-modal';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';

export default function AdminAfterSchoolPage() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [selectedClass, setSelectedClass] = useState<AdminAfterSchoolClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState('1분기');
  const [selectedDay, setSelectedDay] = useState<(typeof WEEKDAYS)[number]>(WEEKDAYS[0]);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [maxStudentsToShow, setMaxStudentsToShow] = useState(3);

  const apiParams: AfterSchoolRequestParams = useMemo(() => ({
    grade: selectedGrade,
    week_day: WEEKDAY_MAP[selectedDay],
    start_period: 8,
    end_period: 11,
  }), [selectedGrade, selectedDay]);

  const { data: apiData, isLoading } = useQuery({
    ...afterSchoolQuery.classes(apiParams),
  });

  const queryClient = useQueryClient();

  const classes = useMemo(() => {
    if (!apiData) return [];
    
    return apiData.map((item): AdminAfterSchoolClass => ({
      id: item.id.toString(),
      grade: selectedGrade,
      day: item.week_day,
      period: item.period,
      teacher: item.teacher.name,
      location: item.place.name,
      subject: item.name,
      students: item.students.map(student => student.name),
    }));
  }, [apiData, selectedGrade]);

  const filteredClasses = classes.filter(
    cls => cls.grade === selectedGrade && cls.day === selectedDay
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1200) {
        setMaxStudentsToShow(1);
      } else if (width < 1600) {
        setMaxStudentsToShow(2);
      } else {
        setMaxStudentsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      // TODO: 삭제 API 구현 필요
      console.log('삭제할 ID:', deleteTargetId);
      // 임시로 쿼리 무효화하여 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['afterSchool'] });
    }
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
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
    const displayStudents = students.slice(0, maxStudentsToShow);
    const hasMore = students.length > maxStudentsToShow;
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
      render: (row: AdminAfterSchoolClass) => (
        <S.NoWrapCell>{row.teacher}</S.NoWrapCell>
      ),
    },
    {
      key: 'period',
      header: '교시',
      width: '100px',
      render: (row: AdminAfterSchoolClass) => (
        <S.NoWrapCell>{row.period}</S.NoWrapCell>
      ),
    },
    {
      key: 'location',
      header: '장소이름',
      width: 'auto',
      render: (row: AdminAfterSchoolClass) => (
        <S.WrapCell>{row.location}</S.WrapCell>
      ),
    },
    {
      key: 'subject',
      header: '이름',
      width: 'auto',
      render: (row: AdminAfterSchoolClass) => (
        <S.WrapCell>{row.subject}</S.WrapCell>
      ),
    },
    {
      key: 'students',
      header: '학생',
      width: 'auto',
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="삭제"
        message="정말로 이 방과후를 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
      />

      <S.PageContainer style={{ overflow: isDeleteModalOpen ? 'hidden' : undefined }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </S.PageContainer>
    </>
  );
}

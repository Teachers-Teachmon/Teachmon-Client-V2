import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/button';
import { toast } from 'react-toastify';
import AdminAfterSchoolHeaderContainer from '@/containers/admin/after-school/after-school-header';
import TableLayout from '@/components/layout/table';
import ConfirmModal from '@/components/layout/modal/confirm';
import Loading from '@/components/ui/loading';
import type { TableColumn, AfterSchoolRequestParams } from '@/types/afterSchool';
import * as S from './style';
import { WEEKDAYS, REVERSE_DAY_MAP } from '@/constants/admin';
import type { AdminAfterSchoolClass } from '@/types/afterSchool';
import { useNavigate } from 'react-router-dom';
import AfterSchoolDetailModal from '@/containers/admin/after-school/detail-modal';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';
import { deleteAfterSchoolClass, getAfterSchoolClasses } from '@/services/after-school/afterSchool.api';
import {
  createAdminAfterSchoolPrintHtml,
  openAdminAfterSchoolLoadingWindow,
  renderAdminAfterSchoolPrintWindow,
  type PdfScheduleCell,
  type PdfWeekDay,
} from '@/utils/adminAfterSchoolPdf';
import { getApiErrorMessage } from '@/utils/error';

const API_WEEKDAY_TO_UI: Record<string, (typeof WEEKDAYS)[number]> = {
  '월': '월요일',
  '화': '화요일',
  '수': '수요일',
  '목': '목요일',
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  '월요일': '월요일',
  '화요일': '화요일',
  '수요일': '수요일',
  '목요일': '목요일',
};

export default function AdminAfterSchoolPage() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [selectedClass, setSelectedClass] = useState<AdminAfterSchoolClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState('1분기');
  const [selectedDay, setSelectedDay] = useState<(typeof WEEKDAYS)[number]>(WEEKDAYS[0]);
  const [maxStudentsToShow, setMaxStudentsToShow] = useState(3);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const quarterItems = ['1분기', '2분기', '3분기', '4분기'];

  const PDF_WEEK_DAYS: PdfWeekDay[] = ['MON', 'TUE', 'WED', 'THU'];
  const PDF_SLOTS = [
    { startPeriod: 8 as const, endPeriod: 9 as const },
    { startPeriod: 10 as const, endPeriod: 11 as const },
  ];

  const branch = useMemo(() => {
    const match = selectedQuarter.match(/\d+/);
    const value = match ? Number(match[0]) : 1;
    return Number.isFinite(value) ? value : 1;
  }, [selectedQuarter]);

  const apiParams: AfterSchoolRequestParams = useMemo(() => ({
    grade: selectedGrade,
    branch,
    week_day: REVERSE_DAY_MAP[selectedDay],
    start_period: 8,
    end_period: 11,
  }), [selectedGrade, selectedDay, branch]);

  const { data: apiData, isLoading } = useQuery({
    ...afterSchoolQuery.classes(apiParams),
  });

  const queryClient = useQueryClient();

  const classes = useMemo(() => {
    if (!apiData) return [];
    
    return apiData.map((item): AdminAfterSchoolClass => ({
      id: item.id.toString(),
      grade: selectedGrade,
      day: API_WEEKDAY_TO_UI[item.week_day] ?? (selectedDay as (typeof WEEKDAYS)[number]),
      period: item.period,
      teacher: item.teacher.name,
      teacherId: item.teacher.id,
      location: item.place.name,
      placeId: item.place.id,
      subject: item.name,
      students: item.students.map(student => `${student.number} ${student.name}`),
      studentIds: item.students.map(student => student.id ?? 0),
    }));
  }, [apiData, selectedGrade, selectedDay]);

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
    navigate(`/admin/after-school/edit/${classData.id}`, { state: classData });
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      try {
        await deleteAfterSchoolClass(Number(deleteTargetId));
        toast.success('방과후가 성공적으로 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['afterSchool'] });
      } catch {
        toast.error('방과후 삭제에 실패했습니다.');
      }
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

  const handlePdfDownload = async () => {
    const printWindow = openAdminAfterSchoolLoadingWindow();
    if (!printWindow) {
      toast.error('팝업이 차단되어 PDF 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    setIsPdfLoading(true);

    try {
      const requests = PDF_WEEK_DAYS.flatMap((weekDay) =>
        PDF_SLOTS.map(async (slot): Promise<PdfScheduleCell> => {
          const items = await getAfterSchoolClasses({
            grade: selectedGrade,
            branch,
            week_day: weekDay,
            start_period: slot.startPeriod,
            end_period: slot.endPeriod,
          });
          return {
            weekDay,
            slot,
            items,
          };
        })
      );

      const schedule = await Promise.all(requests);
      const html = createAdminAfterSchoolPrintHtml({
        grade: selectedGrade,
        branch,
        schedule,
      });
      renderAdminAfterSchoolPrintWindow(printWindow, html);
    } catch (error) {
      printWindow.close();
      toast.error(getApiErrorMessage(error, 'PDF 생성에 실패했습니다.'));
    } finally {
      setIsPdfLoading(false);
    }
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
              quarterItems={quarterItems}
              selectedQuarter={selectedQuarter}
              setSelectedQuarter={setSelectedQuarter}
              selectedGrade={selectedGrade}
              setSelectedGrade={setSelectedGrade}
              handlePdfDownload={handlePdfDownload}
              isPdfLoading={isPdfLoading}
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

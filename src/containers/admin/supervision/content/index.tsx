import Calendar from '@/components/ui/calendar';
import Dropdown from '@/components/ui/input/dropdown';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import { useAdminSupervision } from '@/hooks/useAdminSupervision';
import * as S from './style';

export default function AdminSupervisionContent() {
  const {
    viewMode,
    isClosing,
    handleCloseCountPanel,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    filteredCounts,
    year,
    month,
    handleMonthChange,
    events,
    handleEventClick,
    handleDateClick,
    calendarWrapperRef,
    editAnchor,
    filteredTeacherOptions,
    selectedTeacher,
    selectedType,
    availableTypeLabels,
    setTeacherSearchQuery,
    handleTeacherSelect,
    handleTypeSelect,
  } = useAdminSupervision();

  return (
    <S.ContentWrapper>
      {viewMode === 'count' && (
        <S.SidePanel $isClosing={isClosing}>
          <S.SidePanelHeader>
            <S.CloseButton onClick={handleCloseCountPanel}>
              <img src="/icons/common/x.svg" alt="닫기" />
            </S.CloseButton>
          </S.SidePanelHeader>
          <S.SearchContainer>
            <S.SearchInput
              type="text"
              placeholder="선생님을 입력해주세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <S.SortButtons>
              <S.SortButton $active={sortOrder === 'desc'} onClick={() => setSortOrder('desc')}>
                오름차순
              </S.SortButton>
              <S.SortButton $active={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
                내림차순
              </S.SortButton>
            </S.SortButtons>
          </S.SearchContainer>
          <S.TableHeader>
            <S.TableCell $width="50px">순위</S.TableCell>
            <S.TableCell $width="80px">이름</S.TableCell>
            <S.TableCell $width="60px">자습감독</S.TableCell>
            <S.TableCell $width="60px">이석감독</S.TableCell>
            <S.TableCell $width="50px">합계</S.TableCell>
          </S.TableHeader>
          <S.TableBody>
            {filteredCounts.map((item, index) => (
              <S.TableRow key={index}>
                <S.TableCell $width="50px">{item.rank}위</S.TableCell>
                <S.TableCell $width="80px">{item.name}</S.TableCell>
                <S.TableCell $width="60px">{item.selfStudy}회</S.TableCell>
                <S.TableCell $width="60px">{item.leaveSeat}회</S.TableCell>
                <S.TableCell $width="50px">{item.total}회</S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.SidePanel>
      )}

      <S.CalendarWrapper $hasSidePanel={viewMode === 'count'} ref={calendarWrapperRef}>
        <Calendar
          year={year}
          month={month}
          onMonthChange={handleMonthChange}
          events={events}
          showYear={true}
          showLegend={false}
          onEventClick={viewMode === 'edit' ? handleEventClick : undefined}
          onDateClick={viewMode === 'edit' ? handleDateClick : undefined}
        />
        {viewMode === 'edit' && editAnchor && (
          <S.FloatingEditor $top={editAnchor.top} $left={editAnchor.left}>
            <SearchDropdown
              placeholder="이름을 입력해주세요"
              searchPlaceholder="선생님 검색"
              items={filteredTeacherOptions}
              value={selectedTeacher}
              onChange={handleTeacherSelect}
              onSearchChange={setTeacherSearchQuery}
              customWidth="100%"
            />
            <S.EditTitle>자습/이석 선택</S.EditTitle>
            <Dropdown
              placeholder="자습/이석 선택"
              items={availableTypeLabels}
              value={selectedType}
              onChange={handleTypeSelect}
              customWidth="100%"
              disabled={!selectedTeacher}
            />
          </S.FloatingEditor>
        )}
      </S.CalendarWrapper>
    </S.ContentWrapper>
  );
}

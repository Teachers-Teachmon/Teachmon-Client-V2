import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/containers/admin/users/header';
import Teachers from '@/containers/admin/users/teachers';
import Students from '@/containers/admin/users/students';
import ForbiddenDates from '@/containers/admin/users/forbidden-dates';
import TextInput from '@/components/ui/input/text-input';
import { TAB_TYPES } from '@/constants/admin';
import { userManagementQuery } from '@/services/user-management/user-management.query';
import { useSetForbiddenDatesMutation } from '@/services/user-management/user-management.mutation';
import type { ForbiddenDay } from '@/services/user-management/user-management.api';
import type { Teacher } from '@/containers/admin/users/teachers';
import * as S from './style';

type TabType = '선생님' | '학생';
type SortOrder = 'asc' | 'desc';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPES.TEACHER);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // API 데이터 조회
  const { data: teachersData } = useQuery(userManagementQuery.teachers());
  const { data: forbiddenDatesData } = useQuery(userManagementQuery.forbiddenDates());
  const { data: studentsData } = useQuery(userManagementQuery.students());
  const { mutate: setForbiddenDates } = useSetForbiddenDatesMutation();

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleOpenForbiddenDates = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSaveForbiddenDates = (dates: string[]) => {
    setForbiddenDates(
      { days: dates as ForbiddenDay[] },
      {
        onSuccess: () => {
          setSelectedTeacher(null);
        },
      }
    );
  };

  const handleCancelForbiddenDates = () => {
    setSelectedTeacher(null);
  };

  return (
    <S.Container>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <S.FilterSection>
        <S.SearchInputWrapper>
          <S.SearchIcon src="/icons/common/search.svg" alt="검색" />
          <TextInput
            placeholder={
              activeTab === TAB_TYPES.TEACHER
                ? '선생님을 입력해주세요'
                : '학생을 입력해주세요'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            customPadding="0 16px 0 50px"
            customFontSize="18px"
          />
        </S.SearchInputWrapper>
        {activeTab === TAB_TYPES.TEACHER && (
          <S.SortButton onClick={handleSort}>
            자습감독 횟수
            <S.SortArrows>
              <S.ArrowUp $active={sortOrder === 'asc'}>▲</S.ArrowUp>
              <S.ArrowDown $active={sortOrder === 'desc'}>▼</S.ArrowDown>
            </S.SortArrows>
          </S.SortButton>
        )}
      </S.FilterSection>

      {activeTab === TAB_TYPES.TEACHER ? (
        <Teachers
          teachersData={teachersData || []}
          forbiddenDates={forbiddenDatesData || []}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          onOpenForbiddenDates={handleOpenForbiddenDates}
        />
      ) : (
        <Students studentsData={studentsData || []} searchQuery={searchQuery} />
      )}

      {selectedTeacher && forbiddenDatesData && (
        <ForbiddenDates
          teacherName={selectedTeacher.name}
          initialDates={forbiddenDatesData}
          onSave={handleSaveForbiddenDates}
          onCancel={handleCancelForbiddenDates}
        />
      )}
    </S.Container>
  );
}

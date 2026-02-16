import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/containers/admin/users/header';
import Teachers from '@/containers/admin/users/teachers';
import Students from '@/containers/admin/users/students';
import ForbiddenDates from '@/containers/admin/users/forbidden-dates';
import TextInput from '@/components/ui/input/text-input';
import { TAB_TYPES } from '@/constants/admin';
import { userManagementQuery } from '@/services/user-management/user-management.query';
import { searchQuery as studentSearchQuery } from '@/services/search/search.query';
import { useSetForbiddenDatesMutation } from '@/services/user-management/user-management.mutation';
import { useDebounce } from '@/hooks/useDebounce';
import type { ForbiddenDay } from '@/services/user-management/user-management.api';
import type { Teacher } from '@/containers/admin/users/teachers';
import * as S from './style';

type TabType = '선생님' | '학생';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPES.TEACHER);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // 디바운스 적용
  const debouncedQuery = useDebounce(searchQuery, 150);

  // API 데이터 조회
  const { data: teachersData, isLoading: isTeachersLoading } = useQuery(
    userManagementQuery.teachers(activeTab === TAB_TYPES.TEACHER ? debouncedQuery : undefined)
  );
  const { data: forbiddenDatesData } = useQuery({
    ...userManagementQuery.forbiddenDates(selectedTeacher?.id || ''),
    enabled: !!selectedTeacher,
  });
  const { data: studentsData, isLoading: isStudentsLoading } = useQuery(
    studentSearchQuery.students(activeTab === TAB_TYPES.STUDENT ? debouncedQuery : undefined)
  );
  const { mutate: setForbiddenDates } = useSetForbiddenDatesMutation();

  const handleOpenForbiddenDates = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSaveForbiddenDates = (dates: string[]) => {
    if (!selectedTeacher) return;
    
    setForbiddenDates(
      {
        teacherId: selectedTeacher.id,
        weekdays: dates as ForbiddenDay[],
      },
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
      </S.FilterSection>

      {activeTab === TAB_TYPES.TEACHER ? (
        <Teachers
          teachersData={teachersData || []}
          forbiddenDates={[]}
          onOpenForbiddenDates={handleOpenForbiddenDates}
          isLoading={isTeachersLoading}
        />
      ) : (
        <Students studentsData={studentsData || []} isLoading={isStudentsLoading} />
      )}

      {selectedTeacher && (
        <ForbiddenDates
          teacherName={selectedTeacher.name}
          initialDates={forbiddenDatesData || []}
          onSave={handleSaveForbiddenDates}
          onCancel={handleCancelForbiddenDates}
        />
      )}
    </S.Container>
  );
}

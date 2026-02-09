import { useState } from 'react';
import Header from '@/containers/admin/users/header';
import Teachers from '@/containers/admin/users/teachers';
import Students from '@/containers/admin/users/students';
import ForbiddenDates from '@/containers/admin/users/forbidden-dates';
import TextInput from '@/components/ui/input/text-input';
import { TAB_TYPES } from '@/constants/admin';
import type { Teacher } from '@/containers/admin/users/teachers';
import * as S from './style';

type TabType = '선생님' | '학생';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPES.TEACHER);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleOpenForbiddenDates = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSaveForbiddenDates = (dates: string[]) => {
    // TODO: API 호출하여 금지날짜 저장
    console.log('Saving forbidden dates:', dates, 'for teacher:', selectedTeacher?.name);
    setSelectedTeacher(null);
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
          searchQuery={searchQuery}
          onOpenForbiddenDates={handleOpenForbiddenDates}
        />
      ) : (
        <Students searchQuery={searchQuery} />
      )}

      {selectedTeacher && (
        <ForbiddenDates
          teacherName={selectedTeacher.name}
          initialDates={selectedTeacher.forbiddenDates || []}
          onSave={handleSaveForbiddenDates}
          onCancel={handleCancelForbiddenDates}
        />
      )}
    </S.Container>
  );
}

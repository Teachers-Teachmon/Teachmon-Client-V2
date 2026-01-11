import { useState } from 'react';
import Header from '@/containers/admin/users/header';
import Teachers from '@/containers/admin/users/teachers';
import Students from '@/containers/admin/users/students';
import TextInput from '@/components/ui/input/text-input';
import * as S from './style';

type TabType = '선생님' | '학생';
type SortOrder = 'asc' | 'desc';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('선생님');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <S.Container>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <S.FilterSection>
        <S.SearchInputWrapper>
          <S.SearchIcon src="/icons/common/search.svg" alt="검색" />
          <TextInput
            placeholder={activeTab === '선생님' ? '선생님을 입력해주세요' : '학생을 입력해주세요'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            customPadding="0 16px 0 50px"
            customFontSize="18px"
          />
        </S.SearchInputWrapper>
        {activeTab === '선생님' && (
          <S.SortButton onClick={handleSort}>
            자습감독 횟수
            <S.SortArrows>
              <S.ArrowUp $active={sortOrder === 'asc'}>▲</S.ArrowUp>
              <S.ArrowDown $active={sortOrder === 'desc'}>▼</S.ArrowDown>
            </S.SortArrows>
          </S.SortButton>
        )}
      </S.FilterSection>

      {activeTab === '선생님' ? (
        <Teachers searchQuery={searchQuery} sortOrder={sortOrder} />
      ) : (
        <Students searchQuery={searchQuery} />
      )}
    </S.Container>
  );
}

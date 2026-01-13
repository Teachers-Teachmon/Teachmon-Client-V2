import { useNavigate } from 'react-router-dom';
import DateInput from '@/components/ui/input/date';
import TextInput from '@/components/ui/input/text-input';
import Button from '@/components/ui/button';
import * as S from './style';

interface RecordHeaderProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    activeTab: 'movement' | 'leave' | 'student';
    onTabChange: (tab: 'movement' | 'leave' | 'student') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function RecordHeader({
    selectedDate,
    onDateChange,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
}: RecordHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/manage');
    };

    return (
        <>
            <S.Header>
                <S.Title>이석기록</S.Title>
                <Button text="돌아가기" onClick={handleBack} variant="confirm" />
            </S.Header>

            <S.FilterSection>
                <S.DateInputWrapper>
                    <DateInput
                        label="Date"
                        value={selectedDate}
                        onChange={onDateChange}
                    />
                </S.DateInputWrapper>

                <S.TabGroup>
                    <S.Tab
                        $isActive={activeTab === 'movement'}
                        onClick={() => onTabChange('movement')}
                    >
                        이석
                    </S.Tab>
                    <S.Tab
                        $isActive={activeTab === 'leave'}
                        onClick={() => onTabChange('leave')}
                    >
                        이탈
                    </S.Tab>
                    <S.Tab
                        $isActive={activeTab === 'student'}
                        onClick={() => onTabChange('student')}
                    >
                        학생
                    </S.Tab>
                </S.TabGroup>

                {activeTab === 'student' && (
                    <S.SearchInputWrapper>
                        <TextInput
                            placeholder="학생을 입력해주세요"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            leftIcon={
                                <img src="/icons/common/search.svg" alt="search" />
                            }
                        />
                    </S.SearchInputWrapper>
                )}
            </S.FilterSection>
        </>
    );
}

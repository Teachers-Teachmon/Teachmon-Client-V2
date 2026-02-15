import { useNavigate } from 'react-router-dom';
import DateInput from '@/components/ui/input/date';
import TextInput from '@/components/ui/input/text-input';
import Dropdown from '@/components/ui/input/dropdown';
import Button from '@/components/ui/button';
import type { RecordHeaderProps } from '@/types/record';
import { PERIOD_OPTIONS } from '@/constants/movement';
import * as S from './style';


export default function RecordHeader({
    selectedDate,
    onDateChange,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    selectedPeriod,
    onPeriodChange,
}: RecordHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/manage');
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'movement':
                return '이석 기록';
            case 'leave':
                return '이탈 기록';
            case 'student':
                return '학생 기록';
            default:
                return '기록';
        }
    };

    return (
        <>
            <S.Header>
                <S.Title>{getTitle()}</S.Title>
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

                {activeTab === 'movement' && (
                    <S.SearchInputWrapper>
                        <Dropdown
                            items={PERIOD_OPTIONS}
                            value={PERIOD_OPTIONS.find(opt => opt.value === selectedPeriod)}
                            onChange={(option) => onPeriodChange?.(option.value)}
                            renderItem={(option) => option.label}
                            getItemKey={(option) => option.value}
                            placeholder="교시 선택"
                            customWidth="250px"
                        />
                    </S.SearchInputWrapper>
                )}

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

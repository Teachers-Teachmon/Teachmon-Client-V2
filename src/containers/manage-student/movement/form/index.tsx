import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DateInput from '@/components/ui/input/date';
import TextInput from '@/components/ui/input/text-input';
import Dropdown from '@/components/ui/input/dropdown';
import { PERIOD_OPTIONS, REASON_OPTIONS, type Period, type Reason } from '@/constants/movement';
import { studentQuery } from '@/services/student/student.query';
import { useDebounce } from '@/hooks/useDebounce';
import type { MovementFormData } from '@/pages/manage/movement';
import * as S from './style';

interface MovementFormProps {
    onNext: (data: MovementFormData) => void;
    onCancel: () => void;
}

export default function MovementForm({ onNext, onCancel }: MovementFormProps) {
    const [selectedDate] = useState<string>('2024-12-12');
    const [selectedPeriod, setSelectedPeriod] = useState<Period | ''>('');
    const [reason, setReason] = useState<Reason>('MOVEMENT');
    const [studentSearch, setStudentSearch] = useState<string>('');
    const [isTeamMode, setIsTeamMode] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    // 학생 검색 디바운스
    const debouncedSearch = useDebounce(studentSearch, 300);

    // 학생 검색 API
    const { data: searchResults = [] } = useQuery(studentQuery.search(debouncedSearch));

    const handleRemoveStudent = (student: string) => {
        setSelectedStudents((prev) => prev.filter((s) => s !== student));
    };

    const handleNext = () => {
        if (!selectedPeriod || selectedStudents.length === 0) {
            return;
        }

        onNext({
            period: selectedPeriod,
            reason,
            items,
            students: selectedStudents,
        });
    };

    // 학생 정보를 "학년반번호 이름" 형식으로 변환
    const formatStudent = (student: typeof searchResults[0]) => {
        return `${student.grade}${student.class}${String(student.number).padStart(2, '0')} ${student.name}`;
    };

    return (
        <S.Container>
            <S.ContentWrapper>
                <S.FormSection>
                    <S.FormTitle>이석작성</S.FormTitle>
                    
                    <S.FormContent>
                        {/* 시간 */}
                        <S.FormGroup>
                            <S.Label>시간</S.Label>
                            <S.InputRow>
                                <DateInput
                                    label="날짜"
                                    value={selectedDate}
                                />
                                <S.DropdownWrapper>
                                    <Dropdown
                                        placeholder="시간"
                                        items={PERIOD_OPTIONS.map(p => p.label)}
                                        value={PERIOD_OPTIONS.find(p => p.value === selectedPeriod)?.label || ''}
                                        onChange={(label) => {
                                            const period = PERIOD_OPTIONS.find(p => p.label === label);
                                            if (period) setSelectedPeriod(period.value);
                                        }}
                                        customHeight="44px"
                                        customBorderRadius="8px"
                                    />
                                </S.DropdownWrapper>
                            </S.InputRow>
                        </S.FormGroup>

                        {/* 사유 */}
                        <S.FormGroup>
                            <S.Label>사유</S.Label>
                            <Dropdown
                                placeholder="사유"
                                items={REASON_OPTIONS.map(r => r.label)}
                                value={REASON_OPTIONS.find(r => r.value === reason)?.label || ''}
                                onChange={(label) => {
                                    const reasonOption = REASON_OPTIONS.find(r => r.label === label);
                                    if (reasonOption) setReason(reasonOption.value);
                                }}
                                customHeight="44px"
                                customBorderRadius="8px"
                            />
                        </S.FormGroup>

                        {/* 물품 */}
                        <S.FormGroup>
                            <S.TextAreaWrapper>
                                <S.Label>물품</S.Label>
                                <S.TextArea 
                                    placeholder="물품을 입력해주세요"
                                    value={items}
                                    onChange={(e) => setItems(e.target.value)}
                                />
                            </S.TextAreaWrapper>
                        </S.FormGroup>

                        {/* 학생 */}
                        <S.FormGroup>
                            <S.StudentHeader>
                                <S.Label>학생</S.Label>
                                <S.TeamToggle>
                                    <span>팀</span>
                                    <S.Switch $isOn={isTeamMode} onClick={() => setIsTeamMode(!isTeamMode)}>
                                        <S.SwitchKnob $isOn={isTeamMode} />
                                    </S.Switch>
                                </S.TeamToggle>
                            </S.StudentHeader>
                            <TextInput
                                placeholder="학생을 입력해주세요"
                                value={studentSearch}
                                onChange={(e) => setStudentSearch(e.target.value)}
                                leftIcon={
                                    <img 
                                        src="/icons/common/search.svg" 
                                        alt="search"
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                }
                            />
                        </S.FormGroup>

                        {/* 학생 검색 드롭다운 */}
                        {studentSearch && (
                            <S.StudentDropdown>
                                {searchResults.slice(0, 3).map((student) => {
                                    const formattedStudent = formatStudent(student);
                                    return (
                                        <S.StudentDropdownItem 
                                            key={student.id}
                                            onClick={() => {
                                                if (!selectedStudents.includes(formattedStudent)) {
                                                    setSelectedStudents([...selectedStudents, formattedStudent]);
                                                }
                                                setStudentSearch('');
                                            }}
                                        >
                                            {formattedStudent}
                                        </S.StudentDropdownItem>
                                    );
                                })}
                            </S.StudentDropdown>
                        )}
                        </S.FormGroup>
                    </S.FormContent>
                </S.FormSection>

                {/* 선택된 학생 목록 */}
                <S.SelectedStudentsSection>
                    <S.SelectedTitle>학생</S.SelectedTitle>
                    <S.SelectedStudentsGrid>
                        {selectedStudents.map((student, idx) => (
                            <S.SelectedStudentCard 
                                key={idx}
                                onClick={() => handleRemoveStudent(student)}
                            >
                                <S.StudentName>{student}</S.StudentName>
                            </S.SelectedStudentCard>
                        ))}
                    </S.SelectedStudentsGrid>
                </S.SelectedStudentsSection>
            </S.ContentWrapper>

            {/* 하단 버튼 */}
            <S.ButtonWrapper>
                <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
                <S.NextButton onClick={handleNext}>
                    다음
                </S.NextButton>
            </S.ButtonWrapper>
        </S.Container>
    );
}

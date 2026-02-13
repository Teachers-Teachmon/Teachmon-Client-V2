import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DateInput from '@/components/ui/input/date';
import TextInput from '@/components/ui/input/text-input';
import Dropdown from '@/components/ui/input/dropdown';
import Button from '@/components/ui/button';
import { PERIOD_OPTIONS, type Period, type MovementFormData } from '@/constants/movement';
import { studentQuery, teamQuery } from '@/services/search/search.query';
import { useDebounce } from '@/hooks/useDebounce';
import type { Student, Team } from '@/services/search/search.api';
import type { LeaveSeatDetail } from '@/services/movement/movement.api';
import * as S from './style';
import { getTodayDate } from '@/utils/period';
import { formatStudent } from '@/utils/format';


interface MovementFormProps {
    onNext: (data: MovementFormData) => void;
    onCancel: () => void;
    initialData?: LeaveSeatDetail;
    savedFormData?: MovementFormData;
}

export default function MovementForm({ onNext, onCancel, initialData, savedFormData }: MovementFormProps) {
    const [selectedDate, setSelectedDate] = useState<string>(savedFormData?.day || initialData?.day || getTodayDate());
    const [selectedPeriod, setSelectedPeriod] = useState<Period | ''>(savedFormData?.period || initialData?.period || '');
    const [reason, setReason] = useState<string>(savedFormData?.cause || initialData?.cause || '');
    const [studentSearch, setStudentSearch] = useState<string>('');
    const [isTeamMode, setIsTeamMode] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<Array<{ id: number; display: string }>>(
        savedFormData?.studentDetails ||
        initialData?.students.map(student => ({
            id: student.number,
            display: `${student.number} ${student.name}`,
        })) || []
    );

    // initialData가 바뀌면 폼 상태를 업데이트 (savedFormData가 없을 때만)
    useEffect(() => {
        if (initialData && !savedFormData) {
            // eslint-disable-next-line
            setSelectedDate(initialData.day || getTodayDate());
            setSelectedPeriod(initialData.period || '');
            setReason(initialData.cause || '');
            setSelectedStudents(
                initialData.students.map(student => ({
                    id: student.number,
                    display: `${student.number} ${student.name}`,
                }))
            );
        }
    }, [initialData]); // eslint-disable-line react-hooks/exhaustive-deps

    // 학생 검색 디바운스
    const debouncedSearch = useDebounce(studentSearch, 300);

    // 학생 검색 API (팀 모드가 아닐 때)
    const { data: studentResults = [] } = useQuery({
        ...studentQuery.search(debouncedSearch),
        enabled: !isTeamMode && debouncedSearch.length > 0,
    });

    // 팀 검색 API (팀 모드일 때)
    const { data: teamResults = [] } = useQuery({
        ...teamQuery.search(debouncedSearch),
        enabled: isTeamMode && debouncedSearch.length > 0,
    });

    // 검색 결과 (학생 또는 팀)
    const searchResults = isTeamMode ? teamResults : studentResults;

    const handleRemoveStudent = (studentId: number) => {
        setSelectedStudents((prev) => prev.filter((s) => s.id !== studentId));
    };

    const handleNext = () => {
        // 날짜가 오늘보다 이전인지 확인
        if (selectedDate < getTodayDate()) {
            toast.warning('오늘 이전 날짜는 선택할 수 없습니다.');
            return;
        }

        // 모든 필드가 입력되었는지 확인하고 toast로 알림
        if (!selectedDate) {
            toast.warning('날짜를 선택해주세요.');
            return;
        }

        if (!selectedPeriod) {
            toast.warning('시간을 선택해주세요.');
            return;
        }

        if (!reason.trim()) {
            toast.warning('사유를 입력해주세요.');
            return;
        }

        if (selectedStudents.length === 0) {
            toast.warning('학생을 선택해주세요.');
            return;
        }

        onNext({
            day: selectedDate,
            period: selectedPeriod,
            cause: reason,
            students: selectedStudents.map(s => s.id),
            studentDetails: selectedStudents,
        });
    };

    /**
     * 검색 결과(학생 또는 팀)를 선택했을 때 처리하는 함수
     * - 팀 모드: 팀의 모든 멤버를 학생 리스트에 추가 (중복 제거)
     * - 학생 모드: 선택한 학생을 리스트에 추가
     * - 검색어 초기화
     */
    const handleSelectResult = (result: Student | Team) => {
        if (isTeamMode) {
            const team = result as Team;
            const newMembers = team.members
                .filter(m => !selectedStudents.some(s => s.id === m.id))
                .map(m => ({
                    id: m.id,
                    display: formatStudent(m),
                }));
            setSelectedStudents([...selectedStudents, ...newMembers]);
        } else {
            setSelectedStudents([...selectedStudents, { id: result.id, display: formatStudent(result as Student) }]);
        }
        setStudentSearch('');
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
                                    onChange={setSelectedDate}
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
                            <S.TextAreaWrapper>
                                <S.Label>사유</S.Label>
                                <S.TextArea 
                                    placeholder="사유를 입력해주세요"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </S.TextAreaWrapper>
                        </S.FormGroup>

                        {/* 학생/팀 */}
                        <S.FormGroup>
                            <S.StudentHeader>
                                <S.Label>{isTeamMode ? '팀' : '학생'}</S.Label>
                                <S.TeamToggle>
                                    <span>팀</span>
                                    <S.Switch $isOn={isTeamMode} onClick={() => {
                                        setIsTeamMode(!isTeamMode);
                                        setStudentSearch('');
                                    }}>
                                        <S.SwitchKnob $isOn={isTeamMode} />
                                    </S.Switch>
                                </S.TeamToggle>
                            </S.StudentHeader>
                            <TextInput
                                placeholder={isTeamMode ? '팀을 입력해주세요' : '학생을 입력해주세요'}
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
                            
                            {/* 검색 드롭다운 */}
                            {studentSearch && searchResults.length > 0 && (
                                <S.StudentDropdown>
                                    {searchResults
                                        .filter((result: Student | Team) => {
                                            if (isTeamMode) {
                                                // 팀은 중복 체크 안 함 (멤버가 이미 추가되어 있을 수 있음)
                                                return true;
                                            }
                                            return !selectedStudents.some(s => s.id === result.id);
                                        })
                                        .slice(0, 3)
                                        .map((result: Student | Team) => {
                                            const displayText = isTeamMode 
                                                ? (result as Team).name 
                                                : formatStudent(result as Student);
                                            return (
                                                <S.StudentDropdownItem 
                                                    key={result.id}
                                                    onClick={() => handleSelectResult(result)}
                                                >
                                                    {displayText}
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
                        {selectedStudents.map((student) => (
                            <S.SelectedStudentCard 
                                key={student.id}
                                onClick={() => handleRemoveStudent(student.id)}
                            >
                                <S.StudentName>{student.display}</S.StudentName>
                            </S.SelectedStudentCard>
                        ))}
                    </S.SelectedStudentsGrid>
                </S.SelectedStudentsSection>
            </S.ContentWrapper>

            {/* 하단 버튼 */}
            <S.ButtonWrapper>
                <Button text="취소" width="100%" onClick={onCancel} variant="cancel" />
                <Button 
                    text="다음" 
                    width="100%" 
                    onClick={handleNext} 
                    variant="confirm"
                />
            </S.ButtonWrapper>
        </S.Container>
    );
}
import { useState } from 'react';
import DateInput from '@/components/ui/input/date';
import TextInput from '@/components/ui/input/text-input';
import Dropdown from '@/components/ui/input/dropdown';
import * as S from './style';

interface MovementFormProps {
    onNext: () => void;
    onCancel: () => void;
}

export default function MovementForm({ onNext, onCancel }: MovementFormProps) {
    const [selectedDate] = useState<string>('2024-12-12');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [studentSearch, setStudentSearch] = useState<string>('');
    const [isTeamMode, setIsTeamMode] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<string[]>(['1401 김동욱']);

    const periodOptions = ['5교시', '6교시', '7교시', '8~9교시', '10~11교시'];
    const locationOptions = ['베르실 7', '인공지능 개발실', '도서관', '체육관', '음악실'];
    const mockStudents = ['1401 공덕현', '1402 김민수', '1403 박서준', '1404 이지은', '1405 최유진'];

    const handleRemoveStudent = (student: string) => {
        setSelectedStudents((prev) => prev.filter((s) => s !== student));
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
                                        items={periodOptions}
                                        value={selectedPeriod}
                                        onChange={setSelectedPeriod}
                                        customHeight="44px"
                                        customBorderRadius="8px"
                                    />
                                </S.DropdownWrapper>
                            </S.InputRow>
                        </S.FormGroup>

                        {/* 장소 */}
                        <S.FormGroup>
                            <S.Label>장소</S.Label>
                            <Dropdown
                                placeholder="장소"
                                items={locationOptions}
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                customHeight="44px"
                                customBorderRadius="8px"
                            />
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
                                {mockStudents
                                    .filter(student => student.includes(studentSearch))
                                    .slice(0, 3)
                                    .map((student, idx) => (
                                        <S.StudentDropdownItem 
                                            key={idx}
                                            onClick={() => {
                                                if (!selectedStudents.includes(student)) {
                                                    setSelectedStudents([...selectedStudents, student]);
                                                }
                                                setStudentSearch('');
                                            }}
                                        >
                                            {student}
                                        </S.StudentDropdownItem>
                                    ))
                                }
                            </S.StudentDropdown>
                        )}
                    </S.FormContent>
                </S.FormSection>

                {/* 선택된 학생 목록 */}
                <S.SelectedStudentsSection>
                    <S.SelectedTitle>학생</S.SelectedTitle>
                    {selectedStudents.map((student, idx) => (
                        <S.SelectedStudentCard 
                            key={idx}
                            onClick={() => handleRemoveStudent(student)}
                        >
                            <S.StudentName>{student}</S.StudentName>
                        </S.SelectedStudentCard>
                    ))}
                </S.SelectedStudentsSection>
            </S.ContentWrapper>

            {/* 하단 버튼 */}
            <S.ButtonWrapper>
                <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
                <S.NextButton onClick={onNext}>다음</S.NextButton>
            </S.ButtonWrapper>
        </S.Container>
    );
}

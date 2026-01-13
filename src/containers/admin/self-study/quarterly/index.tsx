import { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Dropdown from '@/components/ui/input/dropdown';
import Button from '@/components/ui/button';
import { DAY_LABELS, PERIOD_OPTIONS } from '@/constants/adminSelfStudy';
=======
import * as S from './style';
import Dropdown from '@/components/ui/input/dropdown';
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)
import plusIcon from '/icons/admin-self-study/plus.svg';
import minusIcon from '/icons/admin-self-study/minus.svg';

type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu';
type Grade = 1 | 2 | 3;
type Quarter = 1 | 2 | 3 | 4;

interface PeriodItem {
  id: string;
  value: string;
}

interface DaySchedule {
  day: DayOfWeek;
  label: string;
  periods: PeriodItem[];
}

<<<<<<< HEAD
=======
const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
};

const PERIOD_OPTIONS = [
  '7교시',
  '8~9교시',
  '10~11교시',
];

>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)
const QUARTER_OPTIONS: Quarter[] = [1, 2, 3, 4];

const generateId = () => Math.random().toString(36).substring(2, 9);

const createInitialSchedule = (): DaySchedule[] => {
  const days: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu'];
  return days.map(day => ({
    day,
    label: DAY_LABELS[day],
    periods: [],
  }));
};

export default function QuarterlySection() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>(1);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(1);
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => createInitialSchedule());
=======
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>(1);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(1);
  const [schedules, setSchedules] = useState<DaySchedule[]>(createInitialSchedule());
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const handleAddPeriod = (dayIndex: number) => {
    setSchedules(prev => {
      const newSchedules = [...prev];
      newSchedules[dayIndex] = {
        ...newSchedules[dayIndex],
        periods: [
          ...newSchedules[dayIndex].periods,
          { id: generateId(), value: '8~9교시' },
        ],
      };
      return newSchedules;
    });
  };

  const handleRemovePeriod = (dayIndex: number, periodId: string) => {
    setSchedules(prev => {
      const newSchedules = [...prev];
      newSchedules[dayIndex] = {
        ...newSchedules[dayIndex],
        periods: newSchedules[dayIndex].periods.filter(p => p.id !== periodId),
      };
      return newSchedules;
    });
  };

  const handlePeriodChange = (dayIndex: number, periodId: string, value: string) => {
    setSchedules(prev => {
      const newSchedules = [...prev];
      newSchedules[dayIndex] = {
        ...newSchedules[dayIndex],
        periods: newSchedules[dayIndex].periods.map(p =>
          p.id === periodId ? { ...p, value } : p
        ),
      };
      return newSchedules;
    });
  };

<<<<<<< HEAD
  const handleSave = () => {
    console.log('저장:', { selectedQuarter, selectedGrade, schedules });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.FilterContainer>
        <S.FilterLeft>
          <S.QuarterDropdownWrapper>
            <Dropdown<Quarter>
              placeholder="분기"
              items={QUARTER_OPTIONS}
              value={selectedQuarter}
              onChange={setSelectedQuarter}
              renderItem={(item) => `${item}분기`}
              customWidth="100px"
              customHeight="40px"
            />
          </S.QuarterDropdownWrapper>

          <S.GradeButtonGroup>
            {([1, 2, 3] as Grade[]).map(grade => (
              <S.GradeButton
                key={grade}
                $active={selectedGrade === grade}
                onClick={() => handleGradeSelect(grade)}
              >
                {grade}학년
              </S.GradeButton>
            ))}
          </S.GradeButtonGroup>
        </S.FilterLeft>
        <S.ActionGroup>
          <Button variant="confirm" text="돌아가기" onClick={handleCancel} />
          <Button variant="confirm" text="저장" onClick={handleSave} />
        </S.ActionGroup>
=======
  return (
    <S.Container>
      <S.FilterContainer>
        <S.QuarterDropdownWrapper>
          <Dropdown<Quarter>
            placeholder="분기"
            items={QUARTER_OPTIONS}
            value={selectedQuarter}
            onChange={setSelectedQuarter}
            renderItem={(item) => `${item}분기`}
            customWidth="100px"
            customHeight="40px"
          />
        </S.QuarterDropdownWrapper>

        <S.GradeButtonGroup>
          {([1, 2, 3] as Grade[]).map(grade => (
            <S.GradeButton
              key={grade}
              $active={selectedGrade === grade}
              onClick={() => handleGradeSelect(grade)}
            >
              {grade}학년
            </S.GradeButton>
          ))}
        </S.GradeButtonGroup>
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)
      </S.FilterContainer>

      <S.ScheduleContainer>
        {schedules.map((schedule, dayIndex) => (
          <S.DayColumn key={schedule.day}>
            <S.DayHeader>{schedule.label}</S.DayHeader>
            <S.PeriodSection>
              <S.PeriodHeader>
                <S.PeriodLabel>교시</S.PeriodLabel>
                <S.AddButton onClick={() => handleAddPeriod(dayIndex)}>
                  <img src={plusIcon} alt="추가" />
<<<<<<< HEAD
                </S.AddButton>
=======
                  </S.AddButton>
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)
              </S.PeriodHeader>
              <S.PeriodList>
                {schedule.periods.map(period => (
                  <S.PeriodRow key={period.id}>
                    <S.PeriodDropdownWrapper>
                      <Dropdown<string>
                        placeholder="교시"
                        items={PERIOD_OPTIONS}
                        value={period.value}
                        onChange={(value) => handlePeriodChange(dayIndex, period.id, value)}
                        customWidth="100%"
                        customHeight="40px"
                      />
                    </S.PeriodDropdownWrapper>
                    <S.RemoveButton onClick={() => handleRemovePeriod(dayIndex, period.id)}>
                      <img src={minusIcon} alt="삭제" />
                    </S.RemoveButton>
                  </S.PeriodRow>
                ))}
              </S.PeriodList>
            </S.PeriodSection>
          </S.DayColumn>
        ))}
      </S.ScheduleContainer>
    </S.Container>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)

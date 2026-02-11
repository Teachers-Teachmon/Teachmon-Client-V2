import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Dropdown from '@/components/ui/input/dropdown';
import { DAY_LABELS, PERIOD_OPTIONS } from '@/constants/adminSelfStudy';
import type { SelfStudyPeriod, SelfStudyQuarterlyItem, SelfStudyWeekDay } from '@/types/selfStudy';
import { useSelfStudyQuarterlyQuery } from '@/services/admin/selfStudy/adminSelfStudy.query';
import { useUpdateSelfStudyQuarterlyMutation } from '@/services/admin/selfStudy/adminSelfStudy.mutation';
import plusIcon from '/icons/admin-self-study/plus.svg';
import minusIcon from '/icons/admin-self-study/minus.svg';

type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
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

export interface QuarterlySectionHandle {
  save: () => void;
  cancel: () => void;
}

const QUARTER_OPTIONS: Quarter[] = [1, 2, 3, 4];

const generateId = () => Math.random().toString(36).substring(2, 9);

const DAY_ORDER: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu'];

const UI_DAY_TO_API: Record<DayOfWeek, SelfStudyWeekDay> = {
  mon: 'MON',
  tue: 'TUE',
  wed: 'WED',
  thu: 'THU',
  fri: 'FRI',
};

const API_DAY_TO_UI: Record<SelfStudyWeekDay, DayOfWeek> = {
  MON: 'mon',
  TUE: 'tue',
  WED: 'wed',
  THU: 'thu',
  FRI: 'fri',
};

const PERIOD_TO_API: Record<string, SelfStudyPeriod> = {
  '7교시': 'SEVEN_PERIOD',
  '8~9교시': 'EIGHT_AND_NINE_PERIOD',
  '10~11교시': 'TEN_AND_ELEVEN_PERIOD',
};

const API_TO_PERIOD: Record<SelfStudyPeriod, string> = {
  ONE_PERIOD: '1교시',
  TWO_PERIOD: '2교시',
  THREE_PERIOD: '3교시',
  FOUR_PERIOD: '4교시',
  FIVE_PERIOD: '5교시',
  SIX_PERIOD: '6교시',
  SEVEN_PERIOD: '7교시',
  EIGHT_AND_NINE_PERIOD: '8~9교시',
  TEN_AND_ELEVEN_PERIOD: '10~11교시',
};

const createInitialSchedule = (): DaySchedule[] => {
  return DAY_ORDER.map(day => ({
    day,
    label: DAY_LABELS[day],
    periods: [],
  }));
};

const QuarterlySection = forwardRef<QuarterlySectionHandle>(function QuarterlySection(_props, ref) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>(1);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(1);
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => createInitialSchedule());

  const { data: quarterlyData } = useSelfStudyQuarterlyQuery(currentYear, selectedQuarter, selectedGrade);
  const { mutate: updateQuarterly } = useUpdateSelfStudyQuarterlyMutation();

  useEffect(() => {
    if (!quarterlyData) return;
    const scheduleMap = new Map<DayOfWeek, string[]>();
    DAY_ORDER.forEach((day) => scheduleMap.set(day, []));

    quarterlyData.forEach((item) => {
      const uiDay = API_DAY_TO_UI[item.week_day];
      const mappedPeriods = item.periods
        .map((period) => API_TO_PERIOD[period])
        .filter((period) => PERIOD_OPTIONS.includes(period));
      scheduleMap.set(uiDay, mappedPeriods);
    });

    setSchedules(
      DAY_ORDER.map((day) => ({
        day,
        label: DAY_LABELS[day],
        periods: (scheduleMap.get(day) ?? []).map((value) => ({
          id: generateId(),
          value,
        })),
      }))
    );
  }, [quarterlyData]);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const handleAddPeriod = (dayIndex: number) => {
    setSchedules(prev => {
      const newSchedules = [...prev];
      const currentPeriods = newSchedules[dayIndex].periods;
      if (currentPeriods.length >= PERIOD_OPTIONS.length) {
        return prev;
      }
      const usedValues = new Set(currentPeriods.map(period => period.value));
      const nextValue = PERIOD_OPTIONS.find(option => !usedValues.has(option)) ?? PERIOD_OPTIONS[0];
      newSchedules[dayIndex] = {
        ...newSchedules[dayIndex],
        periods: [
          ...currentPeriods,
          { id: generateId(), value: nextValue },
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

  const handleSave = () => {
    const payload: SelfStudyQuarterlyItem[] = schedules.map((schedule) => ({
      week_day: UI_DAY_TO_API[schedule.day],
      periods: schedule.periods
        .map((period) => PERIOD_TO_API[period.value])
        .filter((period): period is SelfStudyPeriod => !!period),
    }));

    updateQuarterly({
      params: {
        year: currentYear,
        branch: selectedQuarter,
        grade: selectedGrade,
      },
      payload,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useImperativeHandle(ref, () => ({
    save: handleSave,
    cancel: handleCancel,
  }));

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
      </S.FilterContainer>

      <S.ScheduleContainer>
        {schedules.map((schedule, dayIndex) => (
          <S.DayColumn key={schedule.day}>
            <S.DayHeader>{schedule.label}</S.DayHeader>
            <S.PeriodSection>
              <S.PeriodHeader>
                <S.PeriodLabel>교시</S.PeriodLabel>
                <S.AddButton
                  onClick={() => handleAddPeriod(dayIndex)}
                  disabled={schedule.periods.length >= PERIOD_OPTIONS.length}
                >
                  <img src={plusIcon} alt="추가" />
                </S.AddButton>
              </S.PeriodHeader>
              <S.PeriodList>
                {schedule.periods.map((period) => {
                  const availableOptions = PERIOD_OPTIONS.filter(option =>
                    option === period.value ||
                    !schedule.periods.some(item => item.value === option)
                  );

                  return (
                    <S.PeriodRow key={period.id}>
                      <S.PeriodDropdownWrapper>
                        <Dropdown<string>
                          placeholder="교시"
                          items={availableOptions}
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
                  );
                })}
              </S.PeriodList>
            </S.PeriodSection>
          </S.DayColumn>
        ))}
      </S.ScheduleContainer>
    </S.Container>
  );
});

export default QuarterlySection;

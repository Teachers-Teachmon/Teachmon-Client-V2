import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as S from './style';
import Dropdown from '@/components/ui/input/dropdown';
import { DAY_LABELS, PERIOD_OPTIONS } from '@/constants/adminSelfStudy';
import type { SelfStudyPeriod, SelfStudyQuarterlyItem } from '@/types/selfStudy';
import { useSelfStudyQuarterlyQuery } from '@/services/admin/selfStudy/adminSelfStudy.query';
import { useUpdateSelfStudyQuarterlyMutation } from '@/services/admin/selfStudy/adminSelfStudy.mutation';
import { getApiErrorMessage } from '@/utils/error';
import { API_DAY_TO_UI, API_TO_PERIOD, DAY_ORDER, PERIOD_TO_API, type DayOfWeek, UI_DAY_TO_API } from '@/utils/selfStudy';
import plusIcon from '/icons/admin-self-study/plus.svg';
import minusIcon from '/icons/admin-self-study/minus.svg';

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

  const {
    data: quarterlyData,
    error: quarterlyError,
    isError: isQuarterlyError,
  } = useSelfStudyQuarterlyQuery(currentYear, selectedQuarter, selectedGrade);
  const { mutate: updateQuarterly } = useUpdateSelfStudyQuarterlyMutation();

  useEffect(() => {
    if (!quarterlyData) return;

    const scheduleMap = new Map<DayOfWeek, string[]>();
    DAY_ORDER.forEach((day) => scheduleMap.set(day, []));

    quarterlyData.forEach((item) => {
      const uiDay = API_DAY_TO_UI[item.week_day];
      if (!uiDay) return;
      const mappedPeriods = item.periods
        .map((period) => API_TO_PERIOD[period])
        .filter((period) => PERIOD_OPTIONS.includes(period));
      scheduleMap.set(uiDay, mappedPeriods);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    if (!isQuarterlyError) return;

    toast.error(getApiErrorMessage(quarterlyError, '해당 분기의 분기 설정이 필요합니다. 분기 설정을 먼저 진행해주세요.'));
  }, [isQuarterlyError, quarterlyError]);

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
    }, {
      onSuccess: () => {
        toast.success('자습 설정이 저장되었습니다.');
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, '자습 설정 저장에 실패했습니다.'));
      },
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

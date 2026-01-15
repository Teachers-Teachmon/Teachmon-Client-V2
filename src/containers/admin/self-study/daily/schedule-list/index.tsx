import { useMemo } from 'react';
import type { SelfStudySchedule, SelfStudyScheduleGroup } from '@/types/selfStudy';
import * as S from './style';
import { colors } from '@/styles/theme';

interface ScheduleListProps {
  schedules: SelfStudySchedule[];
  onScheduleClick: (schedule: SelfStudySchedule) => void;
}

const getGradeColor = (grade: 1 | 2 | 3 | 'all'): string => {
  switch (grade) {
    case 1:
      return '#FFE5E5';
    case 2:
      return '#E5F3FF';
    case 3:
      return '#E5FFE5';
    case 'all':
      return '#FFF5E5';
    default:
      return colors.primaryBackground;
  }
};

const getGradeTextColor = (grade: 1 | 2 | 3 | 'all'): string => {
  switch (grade) {
    case 1:
      return '#FF6B6B';
    case 2:
      return '#4A90E2';
    case 3:
      return '#51CF66';
    case 'all':
      return '#FFA726';
    default:
      return colors.primary;
  }
};

const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${month}/${day} (${dayOfWeek})`;
};

const formatGrade = (grade: 1 | 2 | 3 | 'all'): string => {
  return grade === 'all' ? '전체' : `${grade}학년`;
};

export default function ScheduleList({ schedules, onScheduleClick }: ScheduleListProps) {
  const groupedSchedules = useMemo(() => {
    const groups: SelfStudyScheduleGroup[] = [];
    const dateMap = new Map<string, SelfStudySchedule[]>();

    schedules.forEach(schedule => {
      const dateKey = schedule.date.toDateString();
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }
      dateMap.get(dateKey)!.push(schedule);
    });

    dateMap.forEach((scheduleList, dateKey) => {
      const date = new Date(dateKey);
      groups.push({
        date,
        schedules: scheduleList.sort((a, b) => {
          if (a.grade === 'all' && b.grade !== 'all') return 1;
          if (a.grade !== 'all' && b.grade === 'all') return -1;
          if (typeof a.grade === 'number' && typeof b.grade === 'number') {
            return a.grade - b.grade;
          }
          return 0;
        }),
      });
    });

    return groups.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [schedules]);

  if (groupedSchedules.length === 0) {
    return (
      <S.EmptyState>
        등록된 자습 일정이 없습니다.
      </S.EmptyState>
    );
  }

  return (
    <S.Container>
      {groupedSchedules.map((group, groupIndex) => (
        <S.DateGroup key={groupIndex}>
          <S.DateHeader>{formatDate(group.date)}</S.DateHeader>
          {group.schedules.map(schedule => (
            <S.ScheduleItem
              key={schedule.id}
              onClick={() => onScheduleClick(schedule)}
              $bgColor={getGradeColor(schedule.grade)}
              $textColor={getGradeTextColor(schedule.grade)}
            >
              <S.ScheduleContent>
                <S.GradeBadge $bgColor={getGradeColor(schedule.grade)} $textColor={getGradeTextColor(schedule.grade)}>
                  {formatGrade(schedule.grade)}
                </S.GradeBadge>
                <S.PeriodsText>
                  {schedule.periods
                    .map(p => parseInt(p.replace('교시', '')))
                    .sort((a, b) => a - b)
                    .map(p => `${p}교시`)
                    .join(', ')}
                </S.PeriodsText>
              </S.ScheduleContent>
            </S.ScheduleItem>
          ))}
        </S.DateGroup>
      ))}
    </S.Container>
  );
}


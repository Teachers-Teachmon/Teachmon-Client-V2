import * as S from './style';
import type { TodayAfterSchool } from '@/types/after-school';

interface TodayClassSectionProps {
  classes: TodayAfterSchool[];
  isLoading?: boolean;
}

export default function TodayClassSection({ classes, isLoading }: TodayClassSectionProps) {
  if (isLoading) {
    return (
      <S.Container>
        <S.Title>나의 오늘 방과후</S.Title>
        <S.EmptyState>불러오는 중...</S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>나의 오늘 방과후</S.Title>
      <S.ClassList>
        {classes.length > 0 ? (
          classes.map(cls => (
            <S.Card key={cls.id}>
              <S.TopRow>
                <S.QuarterBadge>{cls.branch}분기</S.QuarterBadge>
                <S.TimeInfo>{cls.grade}학년 {cls.period}</S.TimeInfo>
              </S.TopRow>
              <S.Subject>{cls.name}</S.Subject>
              <S.Program>{cls.place.name}</S.Program>
              <S.DateInfo>{cls.day}</S.DateInfo>
            </S.Card>
          ))
        ) : (
          <S.EmptyState>나의 오늘 방과후가 없습니다</S.EmptyState>
        )}
      </S.ClassList>
    </S.Container>
  );
}

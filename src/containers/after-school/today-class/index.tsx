import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as S from './style';
import type { TodayClass } from '@/types/after-school';

interface TodayClassSectionProps {
  classes: TodayClass[];
}

export default function TodayClassSection({ classes }: TodayClassSectionProps) {
  const today = new Date();
  const dateString = format(today, "yyyy.MM.dd EEEE", { locale: ko });

  return (
    <S.Container>
      <S.Title>나의 오늘 방과후</S.Title>
      <S.ClassList>
        {classes.length > 0 ? (
          classes.map(cls => (
            <S.Card key={cls.id}>
              <S.TopRow>
                <S.QuarterBadge>{cls.quarter}분기</S.QuarterBadge>
                <S.TimeInfo>{cls.date}</S.TimeInfo>
              </S.TopRow>
              <S.Subject>{cls.subject}</S.Subject>
              <S.Program>곽제지향 프로그래밍</S.Program>
              <S.DateInfo>{dateString}</S.DateInfo>
            </S.Card>
          ))
        ) : (
          <S.EmptyState>나의 오늘 방과후가 없습니다</S.EmptyState>
        )}
      </S.ClassList>
    </S.Container>
  );
}

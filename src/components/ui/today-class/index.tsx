import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as S from './style';
import type { TodayClass } from '@/types/after-school';

interface TodayClassCardProps {
  classData: TodayClass;
}

export default function TodayClassCard({ classData }: TodayClassCardProps) {
  const today = new Date();
  const dateString = format(today, "yyyy.MM.dd EEEE", { locale: ko });

  return (
    <S.Card>
      <S.TopRow>
        <S.QuarterBadge>{classData.quarter}분기</S.QuarterBadge>
        <S.TimeInfo>{classData.date}</S.TimeInfo>
      </S.TopRow>
      <S.Subject>{classData.subject}</S.Subject>
      <S.Program>곽제지향 프로그래밍</S.Program>
      <S.DateInfo>{dateString}</S.DateInfo>
    </S.Card>
  );
}

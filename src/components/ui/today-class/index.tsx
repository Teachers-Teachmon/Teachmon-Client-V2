import * as S from './style';
import type { TodayClass } from '@/types/after-school';

interface TodayClassCardProps {
  classData: TodayClass;
}

export default function TodayClassCard({ classData }: TodayClassCardProps) {
  const today = new Date();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${days[today.getDay()]}`;

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

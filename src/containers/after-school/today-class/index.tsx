import * as S from './style';
import TodayClassCard from '@/components/ui/today-class';
import type { TodayClass } from '@/types/after-school';

interface TodayClassSectionProps {
  classes: TodayClass[];
}

export default function TodayClassSection({ classes }: TodayClassSectionProps) {
  return (
    <S.Container>
      <S.Title>나의 오늘 방과후</S.Title>
      <S.ClassList>
        {classes.length > 0 ? (
          classes.map(cls => (
            <TodayClassCard key={cls.id} classData={cls} />
          ))
        ) : (
          <S.EmptyState>데이터가 없습니다</S.EmptyState>
        )}
      </S.ClassList>
    </S.Container>
  );
}

import { useQuery } from '@tanstack/react-query';
import * as S from './style';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';

export default function TodayClassSection() {
  const { data: classes = [], isLoading } = useQuery(afterSchoolQuery.myToday());

  return (
    <S.Container>
      <S.Title>나의 오늘 방과후</S.Title>
      {isLoading ? (
        <S.LoadingText>로딩 중...</S.LoadingText>
      ) : (
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
      )}
    </S.Container>
  );
}

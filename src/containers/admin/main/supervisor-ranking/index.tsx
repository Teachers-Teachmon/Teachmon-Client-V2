import { useState } from 'react';
import * as S from './style';

export interface SupervisorRankingItem {
  rank: number;
  name: string;
  count: number;
  image?: string;
}

interface SupervisorRankingProps {
  ranking: SupervisorRankingItem[];
  isError?: boolean;
}

export default function SupervisorRanking({ ranking, isError }: SupervisorRankingProps) {
  const showEmpty = isError || ranking.length === 0;
  const [showAll, setShowAll] = useState(false);

  return (
    <S.SupervisorSection>
      <S.SectionHeader>
        <S.SectionTitle>자습감독 횟수</S.SectionTitle>
      </S.SectionHeader>
      {showEmpty ? (
        <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
      ) : (
        <>
          <S.TopThreeContainer>
            {[1, 0, 2].map((index) => {
              const item = ranking[index];
              const rank = index + 1;
              return (
                <S.TopRankCard key={rank} $isFirst={rank === 1}>
                  <S.TeacherImage>
                    <S.RankBadge>
                      <img src={item?.image || `/icons/admin/rank-${rank}.svg`} alt={`${rank}위`} />
                    </S.RankBadge>
                  </S.TeacherImage>
                  {item ? (
                    <>
                      <S.TeacherName>{item.name}</S.TeacherName>
                      <S.TeacherCount>{item.count}회</S.TeacherCount>
                    </>
                  ) : (
                    <S.TeacherName $isEmpty>데이터 없음</S.TeacherName>
                  )}
                </S.TopRankCard>
              );
            })}
          </S.TopThreeContainer>
            
          <S.RankingList $showAll={showAll}>
            {ranking.slice(3).length > 0 ? (
              ranking.slice(3).map((item) => (
                <S.RankingRow key={item.rank}>
                  <S.RankNumber>{item.rank}위</S.RankNumber>
                  <S.RankName>{item.name}</S.RankName>
                  <S.RankCount>{item.count}회</S.RankCount>
                </S.RankingRow>
              ))
            ) : (
              <S.EmptyMessage>하위 순위 데이터가 없습니다</S.EmptyMessage>
            )}
          </S.RankingList>
            
          {ranking.length > 3 && (
            <S.ShowMoreButton onClick={() => setShowAll(!showAll)}>
              {showAll ? '접기' : '더보기'}
            </S.ShowMoreButton>
          )}
        </>
      )}
    </S.SupervisorSection>
  );
}

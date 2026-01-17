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
            {[ranking[1], ranking[0], ranking[2]].filter(Boolean).map((item) => (
              <S.TopRankCard key={item.rank} $isFirst={item.rank === 1}>
                <S.RankBadge>
                  {item.image && <img src={item.image} alt={`${item.rank}위`} />}
                </S.RankBadge>
                <S.TeacherImage>
                  <S.RankText>{item.rank}등</S.RankText>
                </S.TeacherImage>
                <S.TeacherName>{item.name}</S.TeacherName>
                <S.TeacherCount>{item.count}회</S.TeacherCount>
              </S.TopRankCard>
            ))}
          </S.TopThreeContainer>
          <S.RankingList>
            {ranking.slice(3).map((item) => (
              <S.RankingRow key={item.rank}>
                <S.RankNumber>{item.rank}위</S.RankNumber>
                <S.RankName>{item.name}</S.RankName>
                <S.RankCount>{item.count}회</S.RankCount>
              </S.RankingRow>
            ))}
          </S.RankingList>
        </>
      )}
    </S.SupervisorSection>
  );
}

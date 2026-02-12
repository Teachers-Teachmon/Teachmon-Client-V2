import * as S from './style';
import type { ExitStudent } from '@/types/home';
import { formatDate, formatPeriod } from '@/utils/format';

interface WeeklyExitSectionProps {
    exits: ExitStudent[];
    isLoading: boolean;
}

export default function WeeklyExitSection({ exits, isLoading }: WeeklyExitSectionProps) {
    const exitRows = exits.reduce<ExitStudent[][]>(
        (acc, item, index) => {
            if (index % 2 === 0) {
                acc.push([item]);
            } else {
                acc[acc.length - 1].push(item);
            }
            return acc;
        },
        []
    );

    return (
        <S.SectionCard>
            <S.SectionTitle>이번 주 이탈 현황</S.SectionTitle>
            <S.SectionContent>
                {isLoading ? (
                    <S.EmptyMessage>이탈 현황을 불러오는 중입니다...</S.EmptyMessage>
                ) : exits.length > 0 ? (
                    <S.DepartureGrid>
                        {exitRows.map((row, rowIndex) => (
                            <S.DepartureRow key={rowIndex}>
                                {row.map((exit) => (
                                    <S.DepartureItem key={exit.exit_id}>
                                        <S.DepartureDate>{formatDate(exit.day)}</S.DepartureDate>
                                        <S.DepartureInfoWrapper>
                                            <S.DepartureName>{exit.number}{exit.name}</S.DepartureName>
                                            <S.DepartureTime>{formatPeriod(exit.period)}</S.DepartureTime>
                                        </S.DepartureInfoWrapper>
                                    </S.DepartureItem>
                                ))}
                            </S.DepartureRow>
                        ))}
                    </S.DepartureGrid>
                ) : (
                    <S.EmptyMessage>이번 주 이탈 현황이 없습니다.</S.EmptyMessage>
                )}
            </S.SectionContent>
        </S.SectionCard>
    );
}

import * as S from './style';
import type { ExchangeRequest } from '@/types/home';
import {
    formatDate,
    formatSupervisionType,
    getStatusStyle,
    getDisplayName,
} from '@/utils/format';

interface ExchangeRequestSectionProps {
    exchanges: ExchangeRequest[];
    isLoading: boolean;
    currentTeacherId: number;
    onOpenModal: (exchange: ExchangeRequest) => void;
}

export default function ExchangeRequestSection({
    exchanges,
    isLoading,
    currentTeacherId,
    onOpenModal,
}: ExchangeRequestSectionProps) {
    return (
        <S.SectionCard>
            <S.SectionTitle>교체 요청</S.SectionTitle>
            <S.SectionContent>
                {isLoading ? (
                    <S.EmptyMessage>교체 요청을 불러오는 중입니다...</S.EmptyMessage>
                ) : exchanges.length > 0 ? (
                    <>
                        <S.ExchangeHeader>
                            <S.ExchangeHeaderText>받는 사람</S.ExchangeHeaderText>
                            <S.ExchangeHeaderSpacer />
                            <S.ExchangeHeaderText>보내는 사람</S.ExchangeHeaderText>
                        </S.ExchangeHeader>
                        <S.ExchangeList>
                            {exchanges.map((exchange) => (
                                <S.ExchangeRow key={exchange.id}>
                                    <S.ExchangeItem status={getStatusStyle(exchange.status)}>
                                        <S.ExchangeItemLabel status={getStatusStyle(exchange.status)}>
                                            {getDisplayName(exchange.requestor.teacher.id, exchange.requestor.teacher.name, currentTeacherId)}
                                        </S.ExchangeItemLabel>
                                        <S.ExchangeItemText status={getStatusStyle(exchange.status)}>
                                            {formatDate(exchange.requestor.day)} {formatSupervisionType(exchange.requestor.type)}
                                        </S.ExchangeItemText>
                                    </S.ExchangeItem>
                                    <S.ExchangeIcon>
                                        <img src="/icons/exchange.svg" alt="교체" />
                                        <S.ExchangeIconLabel onClick={() => onOpenModal(exchange)}>
                                            자세히보기
                                        </S.ExchangeIconLabel>
                                    </S.ExchangeIcon>
                                    <S.ExchangeItem status={getStatusStyle(exchange.status)}>
                                        <S.ExchangeItemLabel status={getStatusStyle(exchange.status)}>
                                            {getDisplayName(exchange.responser.teacher.id, exchange.responser.teacher.name, currentTeacherId)}
                                        </S.ExchangeItemLabel>
                                        <S.ExchangeItemText status={getStatusStyle(exchange.status)}>
                                            {formatDate(exchange.responser.day)} {formatSupervisionType(exchange.responser.type)}
                                        </S.ExchangeItemText>
                                    </S.ExchangeItem>
                                </S.ExchangeRow>
                            ))}
                        </S.ExchangeList>
                    </>
                ) : (
                    <S.EmptyMessage>교체 요청이 없습니다.</S.EmptyMessage>
                )}
            </S.SectionContent>
        </S.SectionCard>
    );
}

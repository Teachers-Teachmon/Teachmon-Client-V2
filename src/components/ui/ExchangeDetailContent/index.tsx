import type { ExchangeDetailContentProps } from '@/types/home';
import { formatDateFull, formatSupervisionType } from '@/utils/format';
import * as S from './style';

export default function ExchangeDetailContent({
  exchange,
  currentTeacherId,
  onClose,
  onAccept,
  onReject,
}: ExchangeDetailContentProps) {
  const isReceiver = exchange.requestor.teacher.id === currentTeacherId;
  const isPending = exchange.status === 'PENDING';

  const getModalTitle = () => {
    if (isReceiver && isPending) {
      return { text: '교체요청', statusText: '', statusColor: '' };
    }
    if (exchange.status === 'REJECTED') {
      return { text: '교체요청', statusText: '거절됨', statusColor: 'rejected' };
    }
    if (exchange.status === 'ACCEPTED') {
      return { text: '교체요청', statusText: '수락됨', statusColor: 'accepted' };
    }
    return { text: '교체요청', statusText: '', statusColor: '' };
  };

  const titleInfo = getModalTitle();

  return (
    <S.Container>
      <S.Title>
        {titleInfo.text}
        {titleInfo.statusText && (
          <>
            (<S.StatusText status={titleInfo.statusColor as 'rejected' | 'accepted'}>{titleInfo.statusText}</S.StatusText>)
          </>
        )}
      </S.Title>

      <S.CardsContainer>
        <S.Card>
          <S.CardTitle>{exchange.requestor.teacher.name} 선생님</S.CardTitle>
          <S.CardInfo>
            <S.InfoRow>
              <S.InfoIcon src="/icons/Calendar.svg" alt="날짜" />
              <S.InfoText>{formatDateFull(exchange.requestor.day)}</S.InfoText>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoIcon src="/icons/ManageType.svg" alt="감독" />
              <S.InfoText>{formatSupervisionType(exchange.requestor.type)}</S.InfoText>
            </S.InfoRow>
          </S.CardInfo>
        </S.Card>

        <S.Card>
          <S.CardTitle>{exchange.responser.teacher.name} 선생님</S.CardTitle>
          <S.CardInfo>
            <S.InfoRow>
              <S.InfoIcon src="/icons/Calendar.svg" alt="날짜" />
              <S.InfoText>{formatDateFull(exchange.responser.day)}</S.InfoText>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoIcon src="/icons/ManageType.svg" alt="감독" />
              <S.InfoText>{formatSupervisionType(exchange.responser.type)}</S.InfoText>
            </S.InfoRow>
          </S.CardInfo>
        </S.Card>
      </S.CardsContainer>

      <S.ReasonSection>
        <S.ReasonLabel>교체 사유</S.ReasonLabel>
        <S.ReasonBox>
          <S.ReasonText>제가 뭐시기뭐시기뭐시기~~!!</S.ReasonText>
        </S.ReasonBox>
      </S.ReasonSection>

      <S.ButtonContainer>
        {isReceiver && isPending ? (
          <>
            <S.Button variant="secondary" onClick={onReject}>
              거절
            </S.Button>
            <S.Button variant="primary" onClick={onAccept}>
              수락
            </S.Button>
          </>
        ) : (
          <>
            <S.Button variant="secondary" onClick={onClose}>
              취소
            </S.Button>
            <S.Button variant="primary" onClick={onClose}>
              확인
            </S.Button>
          </>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

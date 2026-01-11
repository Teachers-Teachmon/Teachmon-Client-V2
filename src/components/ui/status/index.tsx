import * as S from './style';

export type StatusType = '방과후' | '자습' | '이석' | '조퇴' | '결석' | '이탈' | '취소' | '관리자' | '일반';

interface StatusBadgeProps {
    status: StatusType;
}

function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <S.BadgeContainer $status={status}>
            <S.Dot $status={status} />
            <S.Text $status={status}>{status}</S.Text>
        </S.BadgeContainer>
    );
}

export default StatusBadge;

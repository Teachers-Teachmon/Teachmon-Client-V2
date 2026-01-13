import { type StatusType } from '@/constants/status';
import * as S from './style';

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
export type { StatusType };

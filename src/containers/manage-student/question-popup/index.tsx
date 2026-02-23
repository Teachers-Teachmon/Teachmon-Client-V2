import { colors } from '@/styles/theme';
import * as S from './style';

interface LegendPopupProps {
    onClose?: () => void;
}

export default function LegendPopup({ onClose }: LegendPopupProps) {
    const legends = [
        { label: '방과후 : ', color: colors.primary200 },
        { label: '이석 : ', color: colors.movement },
        { label: '조퇴 : ', color: colors.goHome },
        { label: '이탈 : ', color: colors.exit },
        { label: '자습 : ', color: colors.selfStudy },
    ];

    return (
        <S.PopupContainer $isAnimation={true} onClick={onClose}>
            {legends.map((legend) => (
                <S.LegendItem key={legend.label}>
                    <S.LegendText>{legend.label}</S.LegendText>
                    <S.ColorBox $color={legend.color} />
                </S.LegendItem>
            ))}
        </S.PopupContainer>
    );
}

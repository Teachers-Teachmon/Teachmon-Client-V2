import { useState } from 'react';
import LegendPopup from '../question-popup';
import * as S from './style';

interface HeaderRightProps {
    isMapEnabled: boolean;
    onMapToggle: () => void;
}

export default function HeaderRight({ isMapEnabled, onMapToggle }: HeaderRightProps) {
    const [isLegendOpen, setIsLegendOpen] = useState(false);

    return (
        <S.Container $isEnabled={isMapEnabled}>
            <S.ActionButtons>
                <S.ActionButton>
                    <S.ButtonIcon src="/icons/student/table.svg" alt="record" />
                    기록
                </S.ActionButton>
                <S.ActionButton>
                    <S.WriteIcon src="/icons/student/writeMovement.svg" alt="write" />
                    이석작성
                </S.ActionButton>
            </S.ActionButtons>
            <S.MapSection>
                <S.MapGroup>
                    <S.MapIcon src="/icons/student/map.svg" alt="map" />
                    <S.MapText>지도</S.MapText>
                    <S.ToggleSwitch
                        $isEnabled={isMapEnabled}
                        onClick={onMapToggle}
                    >
                        <S.ToggleKnob $isEnabled={isMapEnabled} />
                    </S.ToggleSwitch>
                </S.MapGroup>
                <S.HelpButton onClick={() => setIsLegendOpen(!isLegendOpen)}>
                    <S.QuestionIcon src="/icons/student/question.svg" alt="help" />
                </S.HelpButton>
            </S.MapSection>
            {isLegendOpen && <LegendPopup onClose={() => setIsLegendOpen(false)} />}
        </S.Container>
    );
}

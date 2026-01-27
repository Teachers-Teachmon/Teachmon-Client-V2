import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LegendPopup from '../question-popup';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface HeaderRightProps {
    isMapEnabled: boolean;
    onMapToggle: () => void;
}

export default function HeaderRight({ isMapEnabled, onMapToggle }: HeaderRightProps) {
    const [isLegendOpen, setIsLegendOpen] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useDevice();

    const getMapIcon = () => {
        if (isMobile) {
            return isMapEnabled ? "/icons/student/frame.svg" : "/icons/student/map.svg";
        }
        return "/icons/student/map.svg";
    };

    return (
        <S.Container $isEnabled={isMapEnabled}>
            <S.ActionButtons>
                <S.ActionButton onClick={() => navigate('/manage/record')}>
                    <S.ButtonIcon src="/icons/student/table.svg" alt="record" />
                    <span>기록</span>
                </S.ActionButton>
                <S.ActionButton onClick={() => navigate('/manage/movement')}>
                    <S.WriteIcon src="/icons/student/writeMovement.svg" alt="write" />
                    <span>이석작성</span>
                </S.ActionButton>
            </S.ActionButtons>
            <S.MapSection>
                <S.MapGroup onClick={onMapToggle}>
                    <S.MapIcon 
                        src={getMapIcon()} 
                        alt="map" 
                    />
                    <S.MapText>지도</S.MapText>
                    <S.ToggleSwitch
                        $isEnabled={isMapEnabled}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMapToggle();
                        }}
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

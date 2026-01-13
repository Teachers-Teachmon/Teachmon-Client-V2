import * as S from './style';

interface ZoomControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
}

export default function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
    return (
        <S.Container>
            <S.ZoomButton onClick={onZoomIn}>
                <img src="/icons/student/zoom-in.svg" alt="zoom in" style={{ width: '30px', height: '30px' }} />
            </S.ZoomButton>
            <S.ZoomButton onClick={onReset}>
                <img src="/icons/student/mdi_reload.svg" alt="zoom out" style={{ width: '20px', height: '20px' }} />
            </S.ZoomButton>
            <S.ZoomButton onClick={onZoomOut}>
                <img src="/icons/student/zoom-out.svg" alt="zoom out" style={{ width: '30px', height: '30px' }} />
            </S.ZoomButton>
        </S.Container>
    );
}

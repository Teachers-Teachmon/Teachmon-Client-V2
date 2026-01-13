import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const StudentNames = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const StudentName = styled.span`
    font-size: clamp(14px, 1.3vw, 16px);
    font-weight: 500;
    color: ${colors.text};
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const StatusCellWrapper = styled.div`
    position: relative;
    cursor: pointer;
    min-height: 40px;
    display: flex;
    align-items: center;
`;

export const StatusClickArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const StatusPopup = styled.div<{ $position: 'top' | 'bottom' }>`
    position: absolute;
    ${({ $position }) => $position === 'top' 
        ? 'bottom: calc(100% + 8px);' 
        : 'top: calc(100% + 8px);'}
    left: 50%;
    transform: translateX(-50%);
    background: ${colors.background};
    border: 1px solid #EBF1FF;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 100;
    width: max-content;
`;

export const StatusOption = styled.div`
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

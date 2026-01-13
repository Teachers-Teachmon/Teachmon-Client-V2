import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Container = styled.div`
    max-height: 90vh;
    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 600;
    color: ${colors.text};
    line-height: 28px;
`;

export const CloseButton = styled.button`
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InfoLabel = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${colors.primary};
    line-height: 28.27px;
`;

export const InfoValue = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: ${colors.text};
    line-height: 28.27px;
`;

export const StudentsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StudentsTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${colors.primary};
    line-height: 28.27px;
`;

export const StudentGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    background-color: ${colors.background};
`;

export const StudentCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid #f5f5f5;
    background-color: ${colors.background};
    min-height: 81px;
`;

export const StudentInfo = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${colors.text};
    text-align: center;
    line-height: 20px;
    white-space: pre-line;
`;

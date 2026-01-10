import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';

export const Container = styled.div`
    background: white;
    border-radius: ${radius.lg};
    padding: 2rem;
    width: 500px;
    max-width: 90vw;
`;

export const Title = styled.h2`
    font-family: 'Paperlogy', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.n04};
    margin-bottom: 1.5rem;
`;

export const Section = styled.div`
    margin-bottom: 1.5rem;
`;

export const Label = styled.label`
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.n04};
    display: block;
    margin-bottom: 0.75rem;
`;

export const DateInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    color: ${colors.n04};
    outline: none;
    cursor: pointer;
    background: white;

    &:focus {
        border-color: ${colors.primary};
    }

    &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        font-size: 1.2rem;
    }
`;

export const SelectedText = styled.div`
    margin-top: 0.5rem;
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.primary};
`;

export const PeriodGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
`;

export const PeriodButton = styled.button<{ $isSelected: boolean }>`
    padding: 0.75rem 1rem;
    border: 2px solid ${props => props.$isSelected ? colors.primary : colors.n02};
    border-radius: ${radius.md};
    background: ${props => props.$isSelected ? colors.primary100 : 'white'};
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: ${props => props.$isSelected ? 600 : 400};
    color: ${props => props.$isSelected ? colors.primary : colors.n04};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${colors.primary};
        background: ${colors.primary100};
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 2rem;
`;

export const CancelButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    background: white;
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.n03};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${colors.n01};
    }
`;

export const ConfirmButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: ${radius.md};
    background: ${colors.primary};
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
    background: white;
    border-radius: ${radius.lg};
    padding: 2rem;
    width: 500px;
    max-width: 90vw;

    ${mq.mobile} {
        padding: 1.5rem;
        width: 100%;
        max-width: 340px;
    }
`;

export const Title = styled.h2`
    font-family: 'Paperlogy', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.n04};
    margin-bottom: 1.5rem;

    ${mq.mobile} {
        font-size: 1.25rem;
        margin-bottom: 1.25rem;
    }
`;

export const Section = styled.div`
    margin-bottom: 1.5rem;

    ${mq.mobile} {
        margin-bottom: 1.25rem;
    }
`;

export const Label = styled.label`
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.n04};
    display: block;
    margin-bottom: 0.75rem;

    ${mq.mobile} {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }
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

    ${mq.mobile} {
        padding: 0.625rem;
        font-size: 0.875rem;

        &::-webkit-calendar-picker-indicator {
            font-size: 1rem;
        }
    }
`;

export const SelectedText = styled.div`
    margin-top: 0.5rem;
    font-family: 'Paperlogy', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.primary};

    ${mq.mobile} {
        font-size: 0.875rem;
        margin-top: 0.375rem;
    }
`;

export const PeriodGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;

    ${mq.mobile} {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }
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

    ${mq.mobile} {
        padding: 0.625rem 0.75rem;
        font-size: 0.875rem;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 2rem;

    ${mq.mobile} {
        gap: 0.5rem;
        margin-top: 1.5rem;
    }
`;
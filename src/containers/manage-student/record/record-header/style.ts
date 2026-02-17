import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
`;

export const Title = styled.h1`
    font-size: clamp(24px, 2.5vw, 32px);
    font-weight: 600;
    letter-spacing: 1px;
    color: ${colors.text};
`;

export const FilterSection = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
    flex-wrap: wrap;
`;

export const DateInputWrapper = styled.div`
    width: 240px;
`;

export const SearchInputWrapper = styled.div`
    width: 391px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
`;

export const TabGroup = styled.div`
    display: flex;
    gap: 0;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
    padding: 12px 24px;
    font-family: 'Paperlogy', sans-serif;
    font-size: clamp(18px, 1.6vw, 24px);
    font-weight: 500;
    color: ${({ $isActive }) => ($isActive ? colors.primary : colors.primaryGray)};
    background-color: ${colors.background};
    border: none;
    border-bottom: 2px solid ${({ $isActive }) => ($isActive ? colors.primary : "none")};
    cursor: pointer;
    transition: all 0.2s;
    min-width: 90px;

    &:hover {
        color: ${colors.primary};
    }
`;

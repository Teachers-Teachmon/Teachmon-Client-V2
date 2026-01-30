import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 0;
  flex: 1;

  ${mq.mobile} {
    height: 20vh;
    gap: 0.5rem;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
  
  @media (max-width: 1400px) {
    font-size: ${fontSizes.H4};
  }
`;



export const GradeTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GradeTab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  background: transparent;
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  border: none;
  font-size: ${fontSizes.H3};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s;
  
  @media (max-width: 1024px) {
    padding: 0.5rem 1.5rem;
    font-size: ${fontSizes.Body};
  }

  ${mq.mobile} {
    padding: 0.25rem 0.75rem;
    font-size: ${fontSizes.Small};
  }
`;

export const Container = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.lg};
  padding: 1rem 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 0;
  flex: 1;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.n02};
    border-radius: 3px;
  }

  ${mq.mobile} {
    padding: 0.5rem;
    height: 25vh;
    min-height: 0;
    overflow-y: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${mq.mobile} {
    table-layout: fixed;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.n02};
  
  &:last-child {
    border-bottom: none;
  }

  ${mq.mobile} {
    border-bottom-width: 0.5px;
  }
`;

export const TableCell = styled.td`
  padding: 1.25rem 0.75rem;
  vertical-align: middle;

  &:first-of-type {
    padding-left: 2rem;
  }
  
  &:last-child {
    position: relative;
    padding-right: 2rem;
    text-align: right;
    width: 80px;
    overflow: visible;
  }
  
  @media (max-width: 1024px) {
    padding: 1rem 0.5rem;
    
    &:first-of-type {
      padding-left: 1rem;
    }
    
    &:last-child {
      padding-right: 1rem;
    }
  }

  ${mq.mobile} {
    padding: 0.4rem 0.15rem;

    &:first-of-type {
    padding-left: 1rem;
    width: 8%;
  }
  
  &:nth-of-type(2) {
    width: 15%;
  }
  
  &:nth-of-type(3) {
    width: 27%;
  }
  
  &:nth-of-type(4) {
    width: 15%;
  }
  
  &:last-child {
    position: relative;
    padding-right: 0.5rem;
    text-align: right;
    width: 5%;
    overflow: visible;
  }
  }
`;

export const DayText = styled.span`
  font-size: ${fontSizes.H4};
  font-weight: 400;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TimeTag = styled.span`
  background: ${colors.primary100};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  font-weight: 400;
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 12px;
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: center;
  }
`;

export const ClassText = styled.span`
  font-size: ${fontSizes.H4};
  font-weight: 400;
  color: ${colors.text};

  ${mq.mobile} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    margin-left: 0.3rem;
  }
`;

export const ProgramText = styled.span`
  font-size: ${fontSizes.H4};
  color: ${colors.text};
  font-weight: 400;

  ${mq.mobile} {
    font-size: 12px;
    overflow: hidden;
    margin-top: 0.4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 60px;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 20px;
    height: 20px;
  }

  ${mq.mobile} {
    padding: 0.1rem 0.2rem;

    img {
      width: 10px;
      height: 10px;
    }
  }
`;

export const MenuDropdown = styled.div<{ $openUp?: boolean }>`
  position: absolute;
  right: 0.5rem;
  ${({ $openUp }) => $openUp ? `
    bottom: 100%;
    margin-bottom: 0;
  ` : `
    top: 100%;
    margin-top: -0.5rem;
  `}
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  min-width: 80px;

  ${mq.mobile} {
    min-width: 3rem;

    ${({ $openUp }) => $openUp ? `
    bottom: 100%;
    margin-bottom: -1rem;
  ` : `
    top: 100%;
    margin-top: -0.7rem;
  `}
  }
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: ${colors.primary};
  }

  ${mq.mobile} {
    padding: 0.5rem;
    font-size: ${fontSizes.Caption};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
  text-align: center;
  min-height: 200px;
`;

import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  height: 100%;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 600;
  color: ${colors.text};
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
`;

export const Container = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.lg};
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
`;

export const DayNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const DayNavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;

  img {
    width: 36px;
    height: 36px;
  }

  &:hover img {
    filter: brightness(0) saturate(100%) invert(44%) sepia(85%) saturate(1200%) hue-rotate(200deg) brightness(95%) contrast(95%);
  }
`;

export const DayText = styled.span`
  font-size: ${fontSizes.H3};
  font-weight: 700;
  color: ${colors.primary};
  min-width: 140px;
  text-align: center;
`;

export const TimeSlotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimeSlotSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 350px;
`;

export const TimeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

export const TimeText = styled.span`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
`;

export const ArrowButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover:not(:disabled) img {
    filter: brightness(0) saturate(100%) invert(44%) sepia(85%) saturate(1200%) hue-rotate(200deg) brightness(95%) contrast(95%);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const ClassList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(140px, auto);
  gap: 1rem;
`;

export const ClassCard = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  padding: 1.5rem 1.25rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ClassSubject = styled.h4`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.text};
`;

export const ClassInfo = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.n03};
`;

export const TeacherName = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.n03};
  margin-top: auto;
`;
export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
  text-align: center;
  min-height: 300px;
`;
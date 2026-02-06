import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 1.5rem;
  position: relative;

  ${mq.mobile} {
    padding: 0.1rem 0;
    flex-direction: column;
    gap: 0.5rem;
    overflow: visible;
    flex: none;
  }
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  background: ${colors.background};
  border-radius: ${radius.lg};

  ${mq.mobile} {
    flex: none;
    width: 100%;
    min-height: auto;
  }
`;

export const SidePanel = styled.div`
  width: 280px;
  background: ${colors.background};
  border-radius: ${radius.lg};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  margin-top: 20px;

  animation: slideUp 0.3s ease-out;

  ${mq.mobile} {
    width: 100%;
    margin-top: 0;
    align-self: stretch;
    padding: 0.75rem;
    gap: 0.75rem;
    min-height: 0;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const PanelSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${mq.mobile} {
    gap: 0.5rem;
  }
`;

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.text};
  margin: 0;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const GradeTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GradeTab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${radius.md};
  background: ${props => props.$active ? colors.primary100 : 'transparent'};
  color: ${props => props.$active ? colors.primary : colors.n03};
  font-size: ${fontSizes.Body};
  font-weight: ${props => props.$active ? 600 : 400};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? colors.primary100 : colors.n02};
  }

  ${mq.mobile} {
    padding: 0.5rem 0.75rem;
    font-size: ${fontSizes.Small};
  }
`;

export const PeriodDropdownWrapper = styled.div`
  width: 100%;
`;

export const PeriodDropdown = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  background: ${colors.background};
  color: ${colors.text};
  font-size: ${fontSizes.Body};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
  }

  img {
    width: 14px;
    height: 14px;
  }

  ${mq.mobile} {
    padding: 0.6rem 0.8rem;
    font-size: ${fontSizes.Small};
    
    img {
      width: 12px;
      height: 12px;
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${mq.mobile} {
    max-height: 150px;
  }
`;

export const DropdownItem = styled.div<{ $selected: boolean }>`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: ${props => props.$selected ? colors.primary100 : 'transparent'};
  color: ${colors.text};
  font-size: ${fontSizes.Small};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$selected ? colors.primary100 : colors.n02};
  }

  ${mq.mobile} {
    padding: 0.6rem 0.8rem;
    font-size: 12px;
    gap: 0.4rem;
  }
`;

export const Checkbox = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.$checked ? colors.primary : colors.n03};
  border-radius: 3px;
  background: ${props => props.$checked ? colors.primary : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 14px;
    height: 14px;
    font-size: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;

  ${mq.mobile} {
    margin-top: 1rem;
  }
`;

export const SelectedPeriodsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;

  ${mq.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
`;

export const SelectedPeriodTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${colors.primary100};
  border-radius: ${radius.sm};
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 500;

  ${mq.mobile} {
    padding: 0.4rem 0.6rem;
    font-size: 11px;
    gap: 0.3rem;
  }
`;

export const RemovePeriodButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${colors.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const CancelButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const CancelButtonInCalendar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ExistingSettingTag = styled.div`
  background: ${colors.primaryBackground};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Small};
  display: inline-block;
  margin: 0.25rem;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s;

  &:hover {
    background: ${colors.primaryBackground};
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  margin-left: 8px;
  font-size: ${fontSizes.Small};

  &:hover {
    color: ${colors.primaryBackground};
  }
`;

export const CancelButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;

  ${mq.mobile} {
    margin-bottom: 0.25rem;
  }
`;
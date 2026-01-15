import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

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

  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const PanelSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
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
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;
`;

export const SelectedPeriodsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
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


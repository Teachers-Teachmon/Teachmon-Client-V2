import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${colors.background};
`;

export const Content = styled.div`
  flex: 1;
  padding: 3rem 3rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H2};
  font-weight: 700;
  color: ${colors.text};
  margin: 0 0 2rem 0;
  width: 100%;
  max-width: 800px;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 800px;
  flex: 1;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${colors.background};
  padding: 2rem;
  border-radius: ${radius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.n01};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.n03};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.primaryGray};
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.Medium};
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ToggleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Toggle = styled.div<{ $active: boolean }>`
  width: 50px;
  height: 28px;
  background-color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  border-radius: 14px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
`;

export const ToggleCircle = styled.div<{ $active: boolean }>`
  width: 22px;
  height: 22px;
  background-color: ${colors.background};
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${({ $active }) => ($active ? 'calc(100% - 25px)' : '3px')};
  transition: left 0.2s;
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  margin-top: 1rem;
`;

export const StudentDropdown = styled.div`
  width: 100%;
  background-color: ${colors.background};
  border-radius: ${radius.sm};
  overflow: hidden;
  margin-top: -8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StudentDropdownItem = styled.div`
  width: 100%;
  height: 45px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  background-color: ${colors.background};
  cursor: pointer;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  
  &:hover {
    background-color: ${colors.n01};
  }
`;

export const StudentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: transparent;
  border: 1px solid ${colors.n02};
  transition: border-color 0.2s;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StudentNumber = styled.span`
  font-size: ${fontSizes.Medium};
  font-weight: 600;
  color: ${colors.text};
`;

export const StudentName = styled.span`
  font-size: ${fontSizes.Medium};
  font-weight: 500;
  color: ${colors.text};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primaryGray};
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  
  &:hover {
    color: #EF4444;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 3rem;
  margin-top: -3rem;
`;
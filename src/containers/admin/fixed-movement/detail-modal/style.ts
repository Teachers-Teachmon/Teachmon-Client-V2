import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  background-color: ${colors.background};
  border-radius: ${radius.lg};
  width: 600px;
  max-width: 90vw;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover span {
    color: ${colors.text};
  }
`;

export const CloseIcon = styled.span`
  font-size: 24px;
  color: ${colors.primaryGray};
  transition: color 0.2s;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: -0.5rem;
  max-height: 40vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.n03};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const InfoLabel = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.primary};
`;

export const InfoValue = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.text};
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`;

export const StudentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid ${colors.n02};
`;

export const StudentNumber = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.text};
`;

export const StudentName = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.text};
`;

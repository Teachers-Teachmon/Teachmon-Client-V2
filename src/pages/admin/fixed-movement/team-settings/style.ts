import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid ${colors.n02};
  background: ${colors.background};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  font-weight: 500;

  &:hover {
    background-color: ${colors.primaryBackground};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    white-space: nowrap;
  }
`;

export const Container = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100vh;
  min-height: 0;
  box-sizing: border-box;
  justify-content: stretch;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H2};
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 3rem;
  width: 100%;
  max-width: 60rem;
  margin: 1.2rem auto 0 auto;

  > button {
    flex: 1;
    max-width: 500px;
  }
`;

export const TableWrapper = styled.div`
  flex: 1;
  height: 100%;
  min-height: 0;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 1.5rem;
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const StudentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

export const StudentTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${colors.primaryBackground};
  color: ${colors.text};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  white-space: nowrap;
`;

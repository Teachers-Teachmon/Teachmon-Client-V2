import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Content = styled.div`
  width: 805px;

  ${mq.mobile} {
    width: 100%;
    max-width: 340px;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 40px 0;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: 20px;
    margin: 0 0 24px 0;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 40px;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }
`;

export const DayItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 26px 28px;
  border: 1px solid ${({ $selected }) => ($selected ? colors.primary : colors.primaryGray)};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${colors.background};

  &:hover {
    border-color: ${colors.primary};
  }

  ${mq.mobile} {
    padding: 16px 20px;
    gap: 8px;
  }
`;

export const DayLabel = styled.span<{ $selected: boolean }>`
  font-size: 24px;
  font-weight: 500;
  color: ${({ $selected }) => ($selected ? colors.primary : colors.primaryGray)};

  ${mq.mobile} {
    font-size: 18px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  button {
    flex: 1;
    height: 45px;
  }

  ${mq.mobile} {
    gap: 10px;

    button {
      height: 40px;
      font-size: ${fontSizes.Small};
    }
  }
`;

import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 50px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 391px;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 16px;
  width: 24px;
  height: 24px;
  z-index: 1;
`;
export const AddButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 283px;
  height: 50px;
  background: ${colors.background};
  border: 1px solid ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    font-size: ${fontSizes.H4};
    font-weight: 600;
    color: ${colors.primary};
  }

  ${mq.mobile}{
    bottom: 100px;
  }

  &:hover {
    background: ${colors.primary100};
  }
`;

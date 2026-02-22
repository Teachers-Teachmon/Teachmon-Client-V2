import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 8px;

  ${mq.mobile} {
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 8px;
    overflow: visible;

    & > button {
      width: auto;
      flex: 0 0 auto;
      padding: 8px 12px;
    }
  }
`;

export const ToggleWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;

  ${mq.mobile} {
    align-self: center;
  }
`;

export const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const ToggleTrack = styled.span<{ $checked: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 9999px;
  background: ${({ $checked }) => ($checked ? '#2E6FF2' : '#D9D9D9')};
  position: relative;
  transition: background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transform: ${({ $checked }) => ($checked ? 'translateX(24px)' : 'translateX(0)')};
    transition: transform 0.2s ease;
  }
`;

export const ToggleLabel = styled.span`
  font-size: 14px;
  color: #333333;

  ${mq.mobile} {
    font-size: 13px;
  }
`;

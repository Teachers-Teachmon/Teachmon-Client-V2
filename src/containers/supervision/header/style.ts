import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ToggleWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
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
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 320px;
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div<{ $isEnabled: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  border-radius: ${radius.md};
  padding: 12px 16px;
  gap: 12px;
  z-index: 150;
  align-items: flex-end;
  position: relative;
  ${(props) => props.$isEnabled ? 'box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);' : 'none'};

  ${mq.mobile} {
    background: transparent;
    padding: 0;
    gap: 12px;
    box-shadow: none;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  padding: 12px;
  background: ${colors.background};
  border: 1px solid #EAEAEA;
  border-radius: ${radius.sm};

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
    padding: 0;
    background: transparent;
    border: none;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(16px, 1.3vw, 20px);
  font-weight: 400;
  color: ${colors.text};
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  ${mq.mobile} {
    width: 56px;
    height: 56px;
    background: ${colors.background};
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    justify-content: center;
    padding: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    span {
      display: none;
    }
  }
`;

export const ButtonIcon = styled.img`
  width: 28px;
  height: 28px;

  ${mq.mobile} {
    width: 32px;
    height: 32px;
  }
`;

export const WriteIcon = styled.img`
  width: 28px;
  height: 28px;

  ${mq.mobile} {
    width: 32px;
    height: 32px;
  }
`;

export const MapSection = styled.div`
  display: flex;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
    padding: 0;
    width: auto;
  }
`;

export const MapGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${mq.mobile} {
    width: 56px;
    height: 56px;
    background: ${colors.background};
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    justify-content: center;
    padding: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 0;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary100};
    }
  }
`;

export const MapIcon = styled.img`
  width: 28px;
  height: 22px;

  ${mq.mobile} {
    display: block;
    width: 32px;
    height: 26px;
  }
`;

export const MapText = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(16px, 1.3vw, 20px);
  font-weight: 400;
  color: ${colors.text};
  line-height: 1.2;

  ${mq.mobile} {
    display: none;
  }
`;

export const ToggleSwitch = styled.div<{ $isEnabled: boolean }>`
  position: relative;
  width: 46px;
  height: 24px;
  background: ${(props) => props.$isEnabled ? colors.primary : '#EFEFEF'};
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;

  ${mq.mobile} {
    display: none;
  }
`;

export const ToggleKnob = styled.div<{ $isEnabled: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(props) => props.$isEnabled ? '24px' : '2px'};
  width: 20px;
  height: 20px;
  background: linear-gradient(180deg, #FFFFFF 0%, #E8EAEA 100%);
  border-radius: 50%;
  transition: left 0.3s;

  ${mq.mobile} {
    display: none;
  }
`;

export const HelpButton = styled.button`
  width: 28px;
  height: 28px;
  background: ${colors.primary};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${mq.mobile} {
    width: 56px;
    height: 56px;
    background: ${colors.background};
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const QuestionIcon = styled.img`
  width: 16px;
  height: 16px;

  ${mq.mobile} {
    width: 28px;
    height: 28px;
    filter: brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(207deg) brightness(97%) contrast(91%);
  }
`;

import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
  background: rgba(221, 231, 255, 0.1);
  border: 1px solid #E8EFFF;
  border-radius: ${radius.md};
  padding: 32px 24px;
  ${mq.mobile}{
    padding: 24px 12px;
  }
`;

export const ClassTitle = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.text};
  line-height: 20px;
  text-align: center;
  ${mq.mobile}{
    font-size: 24px;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
  width: 100%;
  height: 70%;

  ${mq.mobile}{
    height: 80%;
  }
`;

export const StudentCard = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.background};
  border: 1px solid #F5F5F5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  padding: 8px 4px;

  &:hover {
    border-color: ${colors.primary};
    background: ${colors.primary100};
  }
`;

export const StudentNumber = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(12px, 1.2vw, 18px);
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.2;
  text-align: center;
`;

export const StudentName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(11px, 1.1vw, 15px);
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.3;
  text-align: center;
`;

export const StatusPopupContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.background};
  border: 1px solid #EBF1FF;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 100;
  width: max-content;
`;

export const StatusBadgeWrapper = styled.div`
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 39px;
  width: 685px;
  max-height: 80vh;
  overflow: visible;

  ${mq.mobile} {
    width: 100%;
    max-width: 340px;
    gap: 24px;
    max-height: 70vh;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #101828;
  line-height: 28px;
  margin: 0;

  ${mq.mobile} {
    font-size: 24px;
    line-height: 28px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }

  ${mq.mobile} {
    width: 32px;
    height: 32px;
  }
`;

export const CloseIcon = styled.img`
  width: 24px;
  height: 24px;

  ${mq.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 29px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const StudentCount = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.primary};
  line-height: 28px;

  ${mq.mobile} {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const HintText = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.subcolor};
  line-height: 18px;

  ${mq.mobile} {
    font-size: 13px;
    line-height: 16px;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: visible;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.n03};
    border-radius: 3px;
    
    &:hover {
      background: ${colors.n04};
    }
  }

  ${mq.mobile} {
    grid-template-columns: repeat(3, 1fr);
    max-height: 300px;
    padding-right: 6px;

    &::-webkit-scrollbar {
      width: 4px;
    }
  }
`;

export const StudentCard = styled.div<{ $status?: string }>`
  width: 100%;
  height: 81px;
  background: ${({ $status }) => 
    $status === '이탈' ? '#CCBCFF' : 
    $status === '조퇴' ? '#FFD6A5' : 
    colors.background
  };
  border: 1px solid #F5F5F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: visible;

  &:hover {
    border-color: ${colors.primary};
    opacity: 0.9;
  }

  ${mq.mobile} {
    height: 70px;
    border-radius: 6px;
  }
`;

export const StudentInfo = styled.div`
  font-family: 'Paperlogy', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.4;
  text-align: center;
  padding: 8px;

  ${mq.mobile} {
    font-size: 14px;
    line-height: 1.3;
    padding: 6px;
  }
`;

export const StatusButtons = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 8px;

  ${mq.mobile} {
    gap: 6px;
    padding: 6px;
  }
`;

export const StatusButton = styled.button`
  flex: 1;
  background: ${colors.primary};
  border: none;
  border-radius: 6px;
  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.primary};
    opacity: 0.8;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  ${mq.mobile} {
    font-size: 14px;
    border-radius: 4px;
  }
`;

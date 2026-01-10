import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  align-items: center;
  background: rgba(221, 231, 255, 0.1);
  border: 1px solid #E8EFFF;
  border-radius: ${radius.md};
  padding: 32px 24px;
`;

export const ClassTitle = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.text};
  line-height: 20px;
  text-align: center;
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
  width: 100%;
  height: 60%;
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
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

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
  font-size: clamp(10px, 1vw, 14px);
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.2;
  text-align: center;
  margin-top: 2px;
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

export const StatusBadge = styled.div<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${({ $status }) => {
        const statusConfig: { [key: string]: string } = {
            '방과후': '#ECF3FD',
            '자습': '#ECFDF3',
            '이석': '#F0ECFD',
            '조퇴': '#FFF6E4',
            '결석': '#FDF0EC',
            '이탈': '#FFEBEA',
            '취소': '#F5F5F5',
        };
        return statusConfig[$status] || '#F5F5F5';
    }};
    border-radius: 20px;
    width: fit-content;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

export const StatusDot = styled.div<{ $status: string }>`
    width: 7px;
    height: 7px;
    background: ${({ $status }) => {
        const statusConfig: { [key: string]: string } = {
            '방과후': colors.primary,
            '자습': '#14BA6D',
            '이석': '#6A1EC1',
            '조퇴': '#FF9000',
            '결석': colors.subcolor,
            '이탈': colors.exit,
            '취소': '#9CA4BA',
        };
        return statusConfig[$status] || '#9CA4BA';
    }};
    border-radius: 50%;
`;

export const StatusText = styled.span<{ $status: string }>`
    font-family: 'Paperlogy', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: ${({ $status }) => {
        const statusConfig: { [key: string]: string } = {
            '방과후': colors.primary,
            '자습': '#037847',
            '이석': '#6A1EC1',
            '조퇴': '#FF9000',
            '결석': colors.subcolor,
            '이탈': colors.exit,
            '취소': '#9CA4BA',
        };
        return statusConfig[$status] || '#9CA4BA';
    }};
    line-height: 20px;
`;

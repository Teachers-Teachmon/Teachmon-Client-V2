import { colors } from '@/styles/theme';
import styled from '@emotion/styled';

export const AbsentStudentSection = styled.div`
  width: 100%;
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #f2f3f6;
  border-radius: 16px;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px 0 28px;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #000000;
  margin: 0;
`;

export const AbsentStudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const AbsentStudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #f2f3f6;
  box-sizing: border-box;
  border-right: 1px solid #f2f3f6;
  
  &:nth-of-type(2n) {
    border-right: none;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const StudentDate = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  min-width: 75px;
`;

export const StudentName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.primaryGray};
  flex: 1;
`;


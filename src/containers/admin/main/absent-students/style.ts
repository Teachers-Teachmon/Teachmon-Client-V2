import styled from '@emotion/styled';
export const AbsentStudentSection = styled.div`
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
export const PaginationArrows = styled.div`
  display: flex;
  gap: 8px;
`;
export const ArrowButton = styled.button<{ $active?: boolean }>`
  width: 18px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
export const AbsentStudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  flex: 1;
  overflow: hidden;
  min-height: 0;
`;
export const AbsentStudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-bottom: 1px solid #f2f3f6;
  width: 100%;
  max-height: 100px;
  box-sizing: border-box;
  border-right: 1px solid #f2f3f6;
  &:nth-last-of-type(-n+2) {
    padding-bottom: 20px;
  }
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
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  flex: 1;
`;
export const DeleteButton = styled.button`
  background-color: #f87067;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e65c53;
  }
`;

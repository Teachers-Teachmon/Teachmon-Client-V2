import styled from '@emotion/styled';
export const QuarterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-color: #ffffff;
  border: 1px solid #f2f3f6;
  border-radius: 16px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const QuarterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f2f3f6;
`;
export const QuarterTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const SectionTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #000000;
  margin: 0;
`;
export const YearSelectorWrapper = styled.div`
  position: relative;
`;

export const YearSelector = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #9ca4ba;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: #7a82a0;
  }
  
  img {
    width: 16px;
    height: 16px;
  }
`;

export const YearPopup = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 100px;
  overflow: hidden;
`;

export const YearOption = styled.div<{ $selected: boolean }>`
  padding: 10px 16px;
  font-family: 'Paperlogy', sans-serif;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  font-size: 16px;
  color: ${({ $selected }) => ($selected ? '#2e6ff2' : '#000000')};
  background: ${({ $selected }) => ($selected ? '#ebf1ff' : '#ffffff')};
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ $selected }) => ($selected ? '#ebf1ff' : '#f5f5f5')};
  }
`;
export const EditButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: #2e6ff2;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2558c9;
  }
  img {
    width: 18px;
    height: 18px;
  }
`;
export const QuarterList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const QuarterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f2f3f6;
  flex: 1;
  &:last-child {
    border-bottom: none;
  }
`;
export const QuarterName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;
export const QuarterDates = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  .to {
    color: #000000;
  }
`;

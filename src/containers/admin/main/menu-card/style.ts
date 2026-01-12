import styled from '@emotion/styled';
export const MenuCardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  min-height: 0;
  width:100%;
  overflow: auto;
`;
export const MenuCard = styled.div`
  background-color: #fbfcff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;
export const MenuCardIcon = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
  img {
    width: 3.5vw;
    height: 3.5vw;
    object-fit: contain;
  }
`;
export const MenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const MenuCardBottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export const MenuCardTitle = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #2e6ff2;
  margin: 0;
`;
export const MenuCardDescription = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(93, 93, 93, 0.75);
  margin: 0;
`;
export const MenuCardArrow = styled.div`
  width: 22px;
  height: 22px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

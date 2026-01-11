import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 700px;
  background: #ffffff;
  border-radius: 8px;
  padding: 40px 77px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 47px;
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 36px;
  line-height: normal;
  color: #000000;
  text-align: center;
  margin: 0;
`;

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const DateSeparator = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #999999;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 23px;
  width: 100%;
`;


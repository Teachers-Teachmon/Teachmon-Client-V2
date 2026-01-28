import styled from "@emotion/styled";
import { mq } from "@/styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 300px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  overflow-x: hidden;

  ${mq.mobile} {
    min-width: 0;
    max-width: 92vw;
    gap: 1rem;
  }
`

export const Title = styled.h2`
width:100%;
text-align: center;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`

export const Message = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  text-align: center;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  & > button {
    flex: 1;
  }
`

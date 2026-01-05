import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 300px;
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
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`

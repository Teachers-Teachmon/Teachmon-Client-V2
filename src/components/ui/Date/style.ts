import styled from '@emotion/styled';

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
  background: #fafafa;
  padding-top: 0.4rem;
`;

export const InputWrapper = styled.div<{ $isFocused?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid ${({ $isFocused }) => ($isFocused ? '#1A73E8' : '#ccc')};
  transition: border-color 0.2s ease-in-out;
  padding-top: 1rem;
`;

export const Label = styled.label<{ $isFocused?: boolean }>`
  position: absolute;
  top: ${({ $isFocused }) => ($isFocused ? '0px' : '24px')};
  left: 10px;
  font-size: ${({ $isFocused }) => ($isFocused ? '12px' : '18px')};
  color: ${({ $isFocused }) => ($isFocused ? '#1A73E8' : '#999')};
  transition: all 0.15s ease-in-out;
  pointer-events: none;
`;

export const StyledInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  color: #212121;
  padding: 5px 10px;
  width: 100%;
  cursor: pointer;
`;

export const HiddenDateInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

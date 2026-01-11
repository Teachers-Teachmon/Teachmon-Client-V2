import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F8F9FA;
  border-radius: 8px;
  padding: 10px 16px;
  width: 300px;
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #AAA;
  }
`;

import styled from '@emotion/styled';

export const CheckboxWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const CheckboxBase = styled.div<{ $checked: boolean; $disabled?: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid ${({ $checked }) => ($checked ? '#0070ff' : '#999999')};
    background-color: ${({ $checked }) => ($checked ? '#0070ff' : 'transparent')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        border-color: ${({ $disabled }) => ($disabled ? '#999999' : '#0070ff')};
    }
`;

export const CheckIcon = styled.svg`
    width: 14px;
    height: 14px;
`;

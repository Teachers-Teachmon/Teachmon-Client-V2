import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fbfcff;
    padding: 40px 160px;
    display: flex;
    flex-direction: column;
`;

export const ContentWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 7fr 2fr;
    gap: 20px;
    flex: 1;
    margin-bottom: 20px;
`;

export const FormSection = styled.div`
    width: 100%;
    flex: 1;
    background-color: #ffffff;
    border: 1px solid #c8dbff;
    border-radius: 8px;
    padding: 32px 44px;
`;

export const FormTitle = styled.h1`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: #101828;
    margin: 0 0 24px 0;
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Label = styled.label`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 18px;
    letter-spacing: 0.6px;
    color: #000000;
`;

export const InputRow = styled.div`
    display: flex;
    gap: 19px;
`;

export const DropdownWrapper = styled.div`
    flex: 1;
`;

export const TextAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px 20px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18.84px;
    color: #000000;
    resize: none;
    
    &::placeholder {
        color: #858585;
    }
    
    &:focus {
        outline: none;
        border-color: #2e6ff2;
    }
`;

export const StudentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

export const TeamToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    
    span {
        font-family: 'Paperlogy', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 20px;
        color: #000000;
    }
`;

export const Switch = styled.div<{ $isOn: boolean }>`
    width: 50px;
    height: 22.5px;
    background-color: ${({ $isOn }) => ($isOn ? '#2e6ff2' : '#e5e7eb')};
    border-radius: 12.5px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;
`;

export const SwitchKnob = styled.div<{ $isOn: boolean }>`
    width: 17.5px;
    height: 17.5px;
    background: linear-gradient(180deg, #ffffff 0%, #e8eaea 100%);
    border-radius: 50%;
    position: absolute;
    top: 2.5px;
    left: ${({ $isOn }) => ($isOn ? '30px' : '2.5px')};
    transition: left 0.2s;
`;

export const StudentDropdown = styled.div`
    width: 100%;
    max-width: 594px;
    background-color: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    margin-top: -8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StudentDropdownItem = styled.div`
    width: 100%;
    height: 45px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    cursor: pointer;
    
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.36px;
    color: #000000;
    
    &:hover {
        background-color: #d0d0d0;
    }
`;

export const SelectedStudentsSection = styled.div`
    width: 203px;
    min-width: 203px;
    background-color: #ffffff;
    border: 1px solid #c8dbff;
    border-radius: 8px;
    padding: 32px 17px;
`;

export const SelectedTitle = styled.h2`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: #101828;
    margin: 0 0 16px 0;
`;

export const SelectedStudentCard = styled.div`
    width: 169px;
    height: 50px;
    border: 1px solid #2e6ff2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 8px;
    
    &:hover {
        background-color: #f0f5ff;
    }
`;

export const StudentName = styled.span`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 21.2px;
    color: #2e6ff2;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

export const CancelButton = styled.button`
    flex: 1;
    height: 45px;
    background-color: #f3f3f3;
    border: none;
    border-radius: 10px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.2px;
    color: #999999;
    cursor: pointer;
    
    &:hover {
        background-color: #e8e8e8;
    }
`;

export const NextButton = styled.button`
    flex: 1;
    height: 45px;
    background-color: #2e6ff2;
    border: none;
    border-radius: 8px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.2px;
    color: #ffffff;
    cursor: pointer;
    
    &:hover {
        background-color: #2558c9;
    }
`;

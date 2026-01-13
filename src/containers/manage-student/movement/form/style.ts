import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.primaryBackground};
    padding: 40px 160px;
    display: flex;
    flex-direction: column;
`;

export const ContentWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 7fr 3fr;
    gap: 20px;
    flex: 1;
    margin-bottom: 20px;
`;

export const FormSection = styled.div`
    width: 100%;
    flex: 1;
    background-color: ${colors.background};
    border: 1px solid ${colors.primary200};
    border-radius: ${radius.md};
    padding: 32px 44px;
`;

export const FormTitle = styled.h1`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: ${colors.text};
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
    font-size: ${fontSizes.H4};
    line-height: 18px;
    letter-spacing: 0.6px;
    color: ${colors.text};
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
    background-color: ${colors.background};
    border: 1px solid ${colors.n02};
    border-radius: ${radius.md};
    padding: 12px 20px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 400;
    font-size: ${fontSizes.Body};
    line-height: 18.84px;
    color: ${colors.text};
    resize: none;
    
    &::placeholder {
        color: ${colors.primaryGray};
    }
    
    &:focus {
        outline: none;
        border-color: ${colors.primary};
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
        font-size: ${fontSizes.H4};
        line-height: 20px;
        color: ${colors.text};
    }
`;

export const Switch = styled.div<{ $isOn: boolean }>`
    width: 50px;
    height: 22.5px;
    background-color: ${({ $isOn }) => ($isOn ? colors.primary : colors.n02)};
    border-radius: 12.5px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;
`;

export const SwitchKnob = styled.div<{ $isOn: boolean }>`
    width: 17.5px;
    height: 17.5px;
    background: linear-gradient(180deg, ${colors.n01} 0%, #e8eaea 100%);
    border-radius: 50%;
    position: absolute;
    top: 2.5px;
    left: ${({ $isOn }) => ($isOn ? '30px' : '2.5px')};
    transition: left 0.2s;
`;

export const StudentDropdown = styled.div`
    width: 100%;
    background-color: ${colors.background};
    border-radius: ${radius.sm};
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
    background-color: ${colors.background};
    cursor: pointer;
    
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: ${fontSizes.Body};
    letter-spacing: 0.36px;
    color: ${colors.text};
    
    &:hover {
        background-color: ${colors.n03};
    }
`;

export const SelectedStudentsSection = styled.div`
    width: 100%;
    background-color: ${colors.background};
    border: 1px solid ${colors.primary200};
    border-radius: ${radius.md};
    padding: 32px 17px;
    display: flex;
    flex-direction: column;
`;

export const SelectedTitle = styled.h2`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: ${colors.text};
    margin: 0 0 16px 0;
`;

export const SelectedStudentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
`;

export const SelectedStudentCard = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid ${colors.primary};
    border-radius: ${radius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        background-color: ${colors.primary100};
    }
`;

export const StudentName = styled.span`
    font-family: 'Paperlogy', sans-serif;
    font-weight: 400;
    font-size: clamp(14px, 1.1vw, 18px);
    line-height: 21.2px;
    color: ${colors.primary};
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
    color: ${colors.primaryGray};
    cursor: pointer;
    
    &:hover {
        background-color: #e8e8e8;
    }
`;

export const NextButton = styled.button`
    flex: 1;
    height: 45px;
    background-color: ${colors.primary};
    border: none;
    border-radius: ${radius.md};
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.2px;
    color: ${colors.background};
    cursor: pointer;
    
    &:hover {
        background-color: #2558c9;
    }
`;

import * as S from './style';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

function Checkbox({ checked, onChange, disabled }: CheckboxProps) {
    return (
        <S.CheckboxWrapper onClick={() => !disabled && onChange(!checked)}>
            <S.CheckboxBase $checked={checked} $disabled={disabled}>
                {checked && (
                    <S.CheckIcon viewBox="0 0 14 14">
                        <path
                            d="M2 7L5.5 10.5L12 4"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </S.CheckIcon>
                )}
            </S.CheckboxBase>
        </S.CheckboxWrapper>
    );
}

export default Checkbox;

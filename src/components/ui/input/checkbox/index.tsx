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
                {checked && <S.CheckIcon src="/icons/common/check.svg" alt="check" />}
            </S.CheckboxBase>
        </S.CheckboxWrapper>
    );
}

export default Checkbox;

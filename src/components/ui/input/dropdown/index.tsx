import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import bottomArrow from "/icons/bottomArrow.svg";

interface DropdownProps<T = string> {
  label?: string;
  placeholder?: string;
  items: T[];
  value?: T;
  onChange: (value: T) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  customHeight?: string;
  customBorderRadius?: string;
  customMaxHeight?: string;
  renderItem?: (item: T) => React.ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
}

export default function Dropdown<T = string>({
  label,
  placeholder = "선택해주세요",
  items,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  customHeight,
  customBorderRadius,
  customMaxHeight,
  renderItem,
  getItemKey
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasError = !!error;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: T) => {
    onChange(item);
    setIsOpen(false);
  };

  const displayValue = value !== undefined && value !== null ? String(value) : null;
  const defaultRenderItem = (item: T) => String(item);
  const itemRenderer = renderItem || defaultRenderItem;
  const keyGenerator = getItemKey || ((item: T, index: number) => index);

  return (
    <S.DropdownWrapper ref={dropdownRef}>
      {label && <S.Label>{label}</S.Label>}
      
      <S.DropdownContainer
        $hasError={hasError}
        $disabled={disabled}
        $isOpen={isOpen}
        $height={customHeight}
        $borderRadius={customBorderRadius}
        onClick={handleToggle}
      >
        <S.SelectedText $placeholder={!displayValue}>
          {displayValue || placeholder}
        </S.SelectedText>
        
        <S.ArrowIcon $isOpen={isOpen} src={bottomArrow} alt="arrow" />

        {isOpen && !disabled && (
          <S.DropdownMenu 
            $maxHeight={customMaxHeight}
            $borderRadius={customBorderRadius}
          >
            {items.map((item, index) => (
              <S.DropdownItem
                key={keyGenerator(item, index)}
                $selected={value === item}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
              >
                {itemRenderer(item)}
              </S.DropdownItem>
            ))}
          </S.DropdownMenu>
        )}
      </S.DropdownContainer>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.DropdownWrapper>
  );
}

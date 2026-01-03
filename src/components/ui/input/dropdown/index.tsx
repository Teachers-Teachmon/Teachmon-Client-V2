import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import bottomArrow from "/icons/bottomArrow.svg";

interface DropdownProps<T = string> {
  /** Dropdown 상단에 표시될 라벨 텍스트 */
  label?: string;
  placeholder?: string;
  /** 드롭다운에 표시될 항목 배열 */
  items: T[];
  /** 현재 선택된 값 */
  value?: T;
  /** 항목 선택 시 호출되는 함수 */
  onChange: (value: T) => void;
  /** 에러 메시지 (존재하면 빨간색 스타일 적용) */
  error?: string;
  /** Dropdown 하단에 표시될 도움말 텍스트 */
  helperText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  // 얘네는 웬만하면 안건들여도됨
  /** 항목을 커스텀 렌더링하는 함수 */
  renderItem?: (item: T) => React.ReactNode;
  /** 항목의 고유 key를 생성하는 함수 */
  getItemKey?: (item: T, index: number) => string | number;
  
  // 스타일 커스텀
  customWidth?: string;
  customHeight?: string;
  customBorderRadius?: string;
  customMaxHeight?: string;
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
  customWidth,
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
  const keyGenerator = getItemKey || ((_item: T, index: number) => index);

  return (
    <S.DropdownWrapper ref={dropdownRef} $width={customWidth}>
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
            {items.map((item, index) => {
              const isSelected = value === item;
              const itemKey = keyGenerator(item, index);
              const renderedItem = itemRenderer(item);
              
              return (
                <S.DropdownItem
                  key={itemKey}
                  $selected={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                >
                  {renderedItem}
                </S.DropdownItem>
              );
            })}
          </S.DropdownMenu>
        )}
      </S.DropdownContainer>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.DropdownWrapper>
  );
}

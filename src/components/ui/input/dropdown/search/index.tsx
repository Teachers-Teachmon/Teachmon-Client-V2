import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import bottomArrow from "/icons/bottomArrow.svg";

interface SearchDropdownProps<T = string> {
  /** Dropdown 상단에 표시될 라벨 텍스트 */
  label?: string;
  /** 선택되지 않았을 때 표시될 placeholder 텍스트 */
  placeholder?: string;
  /** 검색 Input의 placeholder 텍스트 */
  searchPlaceholder?: string;
  /** 드롭다운에 표시될 항목 배열 (백엔드에서 필터링된 결과) */
  items: T[];
  /** 현재 선택된 값 */
  value?: T;
  /** 항목 선택 시 호출되는 함수 */
  onChange: (value: T) => void;
  /** 검색어 (제어 컴포넌트로 사용시) */
  searchQuery?: string;
  /** 검색어 변경 시 호출되는 함수 (백엔드 API 호출용) */
  onSearchChange?: (query: string) => void;
  /** 에러 메시지 (존재하면 빨간색 스타일 적용) */
  error?: string;
  /** Dropdown 하단에 표시될 도움말 텍스트 */
  helperText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 검색 결과가 없을 때 표시될 텍스트 */
  noResultText?: string;

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

export default function SearchDropdown<T = string>({
  label,
  placeholder = "선택해주세요",
  searchPlaceholder = "검색...",
  items,
  value,
  onChange,
  searchQuery: externalSearchQuery,
  onSearchChange,
  error,
  helperText,
  disabled = false,
  customWidth,
  customHeight,
  customBorderRadius,
  customMaxHeight,
  renderItem,
  getItemKey,
  noResultText = "검색 결과가 없습니다"
}: SearchDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasError = !!error;

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

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

  // 드롭다운 열릴 때 검색창에 포커스
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
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

  const handleSearchChange = (query: string) => {
    if (onSearchChange) {
      onSearchChange(query);
    } else {
      setInternalSearchQuery(query);
    }
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
            $borderRadius={customBorderRadius}
          >
            <S.SearchInput
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            
            <S.ItemList $maxHeight={customMaxHeight}>
              {items.length > 0 ? (
                items.map((item, index) => {
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
                })
              ) : (
                <S.NoResult>{noResultText}</S.NoResult>
              )}
            </S.ItemList>
          </S.DropdownMenu>
        )}
      </S.DropdownContainer>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.DropdownWrapper>
  );
}

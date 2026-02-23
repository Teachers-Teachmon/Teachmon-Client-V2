import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import bottomArrow from "/icons/bottomArrow.svg";
import type { SearchDropdownProps } from "@/types/dropdown";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchDropdown<T = string>({
  label,
  placeholder = "선택해주세요",
  searchPlaceholder = "검색...",
  items,
  value,
  onChange,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onDebouncedSearchChange,
  debounceDelay = 300,
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
  const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

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

  // 디바운스된 검색어로 API 호출
  useEffect(() => {
    if (onDebouncedSearchChange && isOpen) {
      onDebouncedSearchChange(debouncedSearchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, isOpen]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && items.length > 0) {
      e.preventDefault();
      handleSelect(items[0]);
    }
  };

  const defaultRenderItem = (item: T) => String(item);
  const itemRenderer = renderItem || defaultRenderItem;
  const displayValue = value !== undefined && value !== null ? itemRenderer(value) : null;
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
              onKeyDown={handleKeyDown}
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

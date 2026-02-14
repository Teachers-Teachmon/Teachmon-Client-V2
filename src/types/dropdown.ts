export interface DropdownProps<T = string> {
  /** Dropdown 상단에 표시될 라벨 텍스트 */
  label?: string;
  /** 선택되지 않았을 때 표시될 placeholder 텍스트 */
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

export interface SearchDropdownProps<T = string> {
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
  /** 검색어 변경 시 호출되는 함수 (즉시 실행) */
  onSearchChange?: (query: string) => void;
  /** 디바운스된 검색어로 호출되는 함수 (API 호출용) */
  onDebouncedSearchChange?: (query: string) => void;
  /** 디바운스 지연 시간 (ms, 기본값: 300) */
  debounceDelay?: number;
  /** 에러 메시지 (존재하면 빨간색 스타일 적용) */
  error?: string;
  /** Dropdown 하단에 표시될 도움말 텍스트 */
  helperText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 항목을 커스텀 렌더링하는 함수 */
  renderItem?: (item: T) => React.ReactNode;
  /** 항목의 고유 key를 생성하는 함수 */
  getItemKey?: (item: T, index: number) => string | number;
  /** 검색 결과가 없을 때 표시될 텍스트 */
  noResultText?: string;
  
  // 스타일 커스텀
  customWidth?: string;
  customHeight?: string;
  customBorderRadius?: string;
  customMaxHeight?: string;
}

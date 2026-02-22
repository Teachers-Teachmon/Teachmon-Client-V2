import {
  WEEKDAYS_KOREAN,
  WEEKDAY_KOREAN_TO_SHORT,
  WEEKDAY_KOREAN_TO_API,
  type WeekdayKorean,
} from './common';

// 요일 목록 - common에서 가져옴
export const DAYS = WEEKDAYS_KOREAN;

// 요일 매핑 (한글 -> 짧은 형식) - common에서 가져옴
export const DAY_MAPPING = WEEKDAY_KOREAN_TO_SHORT;

// 요일 매핑 (한글 -> 영문) - common에서 가져옴 (월~목만)
export const DAY_TO_ENGLISH: Record<WeekdayKorean, string> = {
  '월요일': WEEKDAY_KOREAN_TO_API['월요일'],
  '화요일': WEEKDAY_KOREAN_TO_API['화요일'],
  '수요일': WEEKDAY_KOREAN_TO_API['수요일'],
  '목요일': WEEKDAY_KOREAN_TO_API['목요일'],
  '금요일': WEEKDAY_KOREAN_TO_API['금요일'],
  '토요일': WEEKDAY_KOREAN_TO_API['토요일'],
  '일요일': WEEKDAY_KOREAN_TO_API['일요일'],
} as const;

export const ITEMS_PER_PAGE = 4;

export const MENU_OPTIONS = ['출장', '보강', '종료'] as const;

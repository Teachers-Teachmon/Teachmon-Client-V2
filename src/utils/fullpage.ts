// Fullpage.js helper functions

// 섹션으로 이동
export const moveToSection = (anchor: string | number) => {
  if (window.fullpage_api) {
    window.fullpage_api.moveTo(anchor);
  }
};

// 다음 섹션으로 이동
export const moveToNextSection = () => {
  if (window.fullpage_api) {
    window.fullpage_api.moveSectionDown();
  }
};

// 이전 섹션으로 이동
export const moveToPrevSection = () => {
  if (window.fullpage_api) {
    window.fullpage_api.moveSectionUp();
  }
};

// 전역 타입 선언
declare global {
  interface Window {
    fullpage_api: any;
  }
}

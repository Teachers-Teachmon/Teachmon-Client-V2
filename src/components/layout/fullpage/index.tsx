import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
// @ts-ignore
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import { FullPageWrapper } from './style';

// fullpage_api 전역 선언
declare const fullpage_api: any;

export interface FullPageSection {
  id: string;
  anchor?: string;
  content: ReactNode;
  backgroundColor?: string;
}

export interface FullPageLayoutProps {
  sections: FullPageSection[];
  licenseKey?: string;
  navigation?: boolean;
  autoScrolling?: boolean;
  scrollingSpeed?: number;
  fitToSection?: boolean;
  credits?: boolean;
  hasHeader?: boolean;
  onLeave?: (origin: any, destination: any, direction: string) => void;
  onSectionChange?: (sectionIndex: number) => void;
  customOptions?: any;
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({
  sections,
  licenseKey = 'OPEN-SOURCE-GPLV3-LICENSE',
  navigation = true,
  autoScrolling = true,
  scrollingSpeed = 700,
  fitToSection = true,
  credits = false,
  hasHeader = false,
  onLeave,
  onSectionChange,
  customOptions = {},
}) => {
  const [fpInstance, setFpInstance] = useState<any>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const anchors = sections
      .map((section) => section.anchor || section.id)
      .filter(Boolean);

    const instance = new fullpage('#fullpage', {
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      autoScrolling: true,
      navigation: false,
      credits: false,
      anchors,
      scrollingSpeed: 700,
      onLeave: (origin: any, destination: any, direction: string) => {
        if (isScrolling.current) {
          return false;
        }

        isScrolling.current = true;
        
        onSectionChange?.(destination.index);
        onLeave?.(origin, destination, direction);

        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      },
    });

    setFpInstance(instance);

    return () => {
      if (instance) {
        instance.destroy('all');
      }
      if (fpInstance) {
        fpInstance.destroy('all');
      }
    };
  }, []);

  return (
    <FullPageWrapper hasHeader={hasHeader}>
      <div id="fullpage">
        {sections.map((section) => (
          <div
            key={section.id}
            className="section"
            style={{
              backgroundColor: section.backgroundColor,
            }}
            data-anchor={section.anchor || section.id}
          >
            {section.content}
          </div>
        ))}
      </div>
    </FullPageWrapper>
  );
};

export default FullPageLayout;

// 헬퍼 함수: 섹션으로 이동
export const moveToSection = (anchor: string | number) => {
  if (window.fullpage_api) {
    window.fullpage_api.moveTo(anchor);
  }
};

// 헬퍼 함수: 다음 섹션으로 이동
export const moveToNextSection = () => {
  if (window.fullpage_api) {
    window.fullpage_api.moveSectionDown();
  }
};

// 헬퍼 함수: 이전 섹션으로 이동
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

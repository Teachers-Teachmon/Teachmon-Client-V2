import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import { FullPageWrapper } from './style';
import type { FullPageLayoutProps, FullPageSection } from '@/types/fullpage';

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
}) => {
  const [fpInstance, setFpInstance] = useState<any>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const anchors = sections
      .map((section) => section.anchor || section.id)
      .filter(Boolean);

    const instance = new fullpage('#fullpage', {
      licenseKey,
      autoScrolling,
      navigation,
      credits,
      anchors,
      scrollingSpeed,
      fitToSection,
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
export type { FullPageSection };
import type { ReactNode } from 'react';

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

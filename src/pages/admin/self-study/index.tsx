import { useState } from 'react';
import * as S from './style';
import DailySection from '@/containers/admin/self-study/daily';
import QuarterlySection from '@/containers/admin/self-study/quarterly';

type TabType = 'daily' | 'quarterly';

export default function SelfStudyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  return (
    <S.Container>
      <S.TabContainer $isQuarterly={activeTab === 'quarterly'}>
        <S.Tab
          $active={activeTab === 'daily'}
          onClick={() => setActiveTab('daily')}
        >
          일별
        </S.Tab>
        <S.Tab
          $active={activeTab === 'quarterly'}
          onClick={() => setActiveTab('quarterly')}
        >
          분기별
        </S.Tab>
      </S.TabContainer>

      {activeTab === 'daily' ? <DailySection /> : <QuarterlySection />}
    </S.Container>
  );
}

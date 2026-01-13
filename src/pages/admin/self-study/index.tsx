import { useState } from 'react';
import * as S from './style';
import DailySection from '@/containers/admin/self-study/daily';
import QuarterlySection from '@/containers/admin/self-study/quarterly';

type TabType = 'daily' | 'quarterly';

export default function SelfStudyPage() {
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState<TabType>('daily');
=======
  const [activeTab, setActiveTab] = useState<TabType>('quarterly');
>>>>>>> 03d895d (feat/TC-25 :: 어드민 추가 자습 설정 페이지 퍼블리싱)

  return (
    <S.Container>
      <S.TabContainer>
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

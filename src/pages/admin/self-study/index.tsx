import { useRef, useState } from 'react';
import * as S from './style';
import DailySection from '@/containers/admin/self-study/daily';
import QuarterlySection from '@/containers/admin/self-study/quarterly';
import Button from '@/components/ui/button';
import type { QuarterlySectionHandle } from '@/containers/admin/self-study/quarterly';

type TabType = 'daily' | 'quarterly';

export default function SelfStudyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const quarterlyRef = useRef<QuarterlySectionHandle | null>(null);

  return (
    <S.Container>
      <S.HeaderRow $isQuarterly={activeTab === 'quarterly'}>
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
        {activeTab === 'quarterly' && (
          <S.ActionGroup>
            <Button variant="confirm" text="돌아가기" onClick={() => quarterlyRef.current?.cancel()} />
            <Button variant="confirm" text="저장" onClick={() => quarterlyRef.current?.save()} />
          </S.ActionGroup>
        )}
      </S.HeaderRow>

      {activeTab === 'daily' ? <DailySection /> : <QuarterlySection ref={quarterlyRef} />}
    </S.Container>
  );
}

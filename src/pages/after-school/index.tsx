import { useState } from 'react';
import * as S from './style';
import TodayClassSection from '@/containers/after-school/today-class';
import AllClassSection from '@/containers/after-school/all-class';
import MyClassTable from '@/containers/after-school/my-class';

export default function AfterSchoolPage() {
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);

  return (
    <S.PageContainer>
      <S.MainLayout>
        <S.LeftColumn>
          <TodayClassSection />
          <MyClassTable />
        </S.LeftColumn>

        <S.RightColumn>
          <AllClassSection
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
          />
        </S.RightColumn>
      </S.MainLayout>
    </S.PageContainer>
  );
}

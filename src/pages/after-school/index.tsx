import { useState } from 'react';
import * as S from './style';
import TodayClassSection from '@/containers/after-school/today-class';
import AllClassSection from '@/containers/after-school/all-class';
import MyClassTable from '@/containers/after-school/my-class';
import { MOCK_TODAY_CLASSES, MOCK_MY_CLASSES, MOCK_ALL_CLASSES } from '@/constants/after-school';

export default function AfterSchoolPage() {
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);

  return (
    <S.PageContainer>
      <S.MainLayout>
        <S.LeftColumn>
          <TodayClassSection classes={MOCK_TODAY_CLASSES} />
          <MyClassTable classes={MOCK_MY_CLASSES} />
        </S.LeftColumn>

        <S.RightColumn>
          <AllClassSection
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
            classes={MOCK_ALL_CLASSES.filter(c => c.grade === selectedGrade)}
          />
        </S.RightColumn>
      </S.MainLayout>
    </S.PageContainer>
  );
}

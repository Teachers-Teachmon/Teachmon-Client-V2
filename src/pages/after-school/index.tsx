import { useState } from 'react';
import * as S from './style';
import TodayClassCard from '@/components/ui/today-class';
import AllClassSection from '@/containers/after-school/all-class';
import MyClassTable from '@/containers/after-school/my-class';
import { MOCK_TODAY_CLASSES, MOCK_MY_CLASSES, MOCK_ALL_CLASSES } from '@/constants/after-school';

export default function AfterSchoolPage() {
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);

  return (
    <S.PageContainer>
      <S.MainLayout>
        <S.LeftColumn>
          <S.TodaySection>
            <S.SectionTitle>나의 오늘 방과후</S.SectionTitle>
            <S.TodayClassList>
              {MOCK_TODAY_CLASSES.length > 0 ? (
                MOCK_TODAY_CLASSES.map(cls => (
                  <TodayClassCard key={cls.id} classData={cls} />
                ))
              ) : (
                <S.EmptyState>데이터가 없습니다</S.EmptyState>
              )}
            </S.TodayClassList>
          </S.TodaySection>

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

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './style';
import TodayClassSection from '@/containers/after-school/today-class';
import AllClassSection from '@/containers/after-school/all-class';
import MyClassTable from '@/containers/after-school/my-class';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';

export default function AfterSchoolPage() {
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);

  const { data: todayClasses = [], isLoading: isTodayLoading } = useQuery(afterSchoolQuery.myToday());

  return (
    <S.PageContainer>
      <S.MainLayout>
        <S.LeftColumn>
          <TodayClassSection classes={todayClasses} isLoading={isTodayLoading} />
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

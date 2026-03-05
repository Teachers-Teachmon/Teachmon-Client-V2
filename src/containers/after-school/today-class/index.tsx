import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './style';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';
import AfterSchoolDetailModal from '@/containers/after-school/detail-modal';
import type { TodayAfterSchool } from '@/types/after-school';

export default function TodayClassSection() {
  const { data: classes = [], isLoading } = useQuery(afterSchoolQuery.myToday());
  const [selectedClass, setSelectedClass] = useState<TodayAfterSchool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.Container>
      <S.Title>나의 오늘 방과후</S.Title>
      {isLoading ? (
        <S.LoadingText>로딩 중...</S.LoadingText>
      ) : (
        <S.ClassList>
          {classes.length > 0 ? (
            classes.map(cls => (
              <S.Card key={cls.id} onClick={() => { setSelectedClass(cls); setIsModalOpen(true); }} style={{ cursor: 'pointer' }}>
                <S.TopRow>
                  <S.QuarterBadge>{cls.branch}분기</S.QuarterBadge>
                  <S.TimeInfo>{cls.grade}학년 {cls.period}</S.TimeInfo>
                </S.TopRow>
                <S.Subject>{cls.name}</S.Subject>
                <S.Program>{cls.place.name}</S.Program>
                <S.DateInfo>{cls.day}</S.DateInfo>
              </S.Card>
            ))
          ) : (
            <S.EmptyState>나의 오늘 방과후가 없습니다</S.EmptyState>
          )}
        </S.ClassList>
      )}
      <AfterSchoolDetailModal
        classData={selectedClass}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedClass(null); }}
      />
    </S.Container>
  );
}

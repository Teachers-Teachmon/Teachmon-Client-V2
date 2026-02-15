import { useState } from 'react';
import * as S from './style';
import QuarterSettingsModal from '../quarter-settings-modal';

export interface QuarterSettingItem {
  quarter: number;
  startDate: string;
  endDate: string;
  rawStartDate?: string; // YYYY-MM-DD 형식
  rawEndDate?: string; // YYYY-MM-DD 형식
  afterSchoolEndDate?: string; // 방과후 종료일
  rawAfterSchoolEndDate?: string;
}

interface QuarterSettingsProps {
  quarters: QuarterSettingItem[];
  onCreateBranch: (quarter: number, startDate: string, endDate: string, afterSchoolEndDate?: string) => void;
  isError?: boolean;
}

export default function QuarterSettings({ quarters, onCreateBranch, isError }: QuarterSettingsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (quarter: string, startDate: string, endDate: string, afterSchoolEndDate?: string) => {
    const quarterNumber = parseInt(quarter.replace('분기', ''));
    onCreateBranch(quarterNumber, startDate, endDate, afterSchoolEndDate);
  };

  return (
    <>
      <S.QuarterSection>
        <S.QuarterHeader>
          <S.SectionTitle>분기설정</S.SectionTitle>
          <S.EditButton onClick={handleEditClick}>
            <img src="/icons/admin/rewrite.svg" alt="edit" />
          </S.EditButton>
        </S.QuarterHeader>
        {isError ? (
          <S.EmptyMessage>분기 데이터를 불러올 수 없습니다</S.EmptyMessage>
        ) : (
          <S.QuarterList>
            {[1, 2, 3, 4].map((quarterNum) => {
              const quarterData = quarters.find((q) => q.quarter === quarterNum);
              return (
                <S.QuarterRow key={quarterNum}>
                  <S.QuarterName>{quarterNum}분기</S.QuarterName>
                  <S.QuarterDatesContainer>
                    <S.QuarterDates>
                      {quarterData ? (
                        <>
                          <span>{quarterData.startDate}</span>
                          <span className="to">to</span>
                          <span>{quarterData.endDate}</span>
                        </>
                      ) : (
                        <span>X</span>
                      )}
                    </S.QuarterDates>
                    <S.AfterSchoolEndDate>
                      방과후 종료일: {quarterData?.afterSchoolEndDate || 'X'}
                    </S.AfterSchoolEndDate>
                  </S.QuarterDatesContainer>
                </S.QuarterRow>
              );
            })}
          </S.QuarterList>
        )}
      </S.QuarterSection>

      <QuarterSettingsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        existingQuarters={quarters.map(q => ({
          quarter: q.quarter,
          startDate: q.rawStartDate || q.startDate,
          endDate: q.rawEndDate || q.endDate,
          afterSchoolEndDate: q.rawAfterSchoolEndDate || q.afterSchoolEndDate
        }))}
      />
    </>
  );
}

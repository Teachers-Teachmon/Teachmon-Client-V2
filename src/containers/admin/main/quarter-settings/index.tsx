import { useState } from 'react';
import * as S from './style';
import QuarterSettingsModal from '../quarter-settings-modal';

export interface QuarterSettingItem {
  quarter: number;
  startDate: string;
  endDate: string;
}

interface QuarterSettingsProps {
  quarters: QuarterSettingItem[];
  onCreateBranch: (quarter: number, startDate: string, endDate: string) => void;
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

  const handleConfirm = (quarter: string, startDate: string, endDate: string) => {
    const quarterNumber = parseInt(quarter.replace('분기', ''));
    onCreateBranch(quarterNumber, startDate, endDate);
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
        {isError || quarters.length === 0 ? (
          <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
        ) : (
          <S.QuarterList>
            {quarters.map((quarter) => (
              <S.QuarterRow key={quarter.quarter}>
                <S.QuarterName>{quarter.quarter}분기</S.QuarterName>
                <S.QuarterDates>
                  <span>{quarter.startDate}</span>
                  <span className="to">to</span>
                  <span>{quarter.endDate}</span>
                </S.QuarterDates>
              </S.QuarterRow>
            ))}
          </S.QuarterList>
        )}
      </S.QuarterSection>

      <QuarterSettingsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

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
}

export default function QuarterSettings({ quarters }: QuarterSettingsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (quarter: string, startDate: string, endDate: string) => {
    console.log('분기 설정:', { quarter, startDate, endDate });
    // TODO: 실제 저장 로직 추가
  };

  return (
    <>
      <S.QuarterSection>
        <S.QuarterHeader>
          <S.QuarterTitleGroup>
            <S.SectionTitle>분기설정</S.SectionTitle>
            <S.YearSelector>
              2026
              <img src="/icons/admin/leftArrowGray.svg" alt="dropdown" style={{ transform: 'rotate(-90deg)', marginLeft: '8px' }} />
            </S.YearSelector>
          </S.QuarterTitleGroup>
          <S.EditButton onClick={handleEditClick}>
            <img src="/icons/admin/rewrite.svg" alt="edit" />
          </S.EditButton>
        </S.QuarterHeader>
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
      </S.QuarterSection>

      <QuarterSettingsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

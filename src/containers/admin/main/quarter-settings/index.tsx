import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import QuarterSettingsModal from '../quarter-settings-modal';
import { AVAILABLE_YEARS, DEFAULT_YEAR } from '@/constants/quarterSettings';

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
  const [isYearPopupOpen, setIsYearPopupOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const yearPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearPopupRef.current && !yearPopupRef.current.contains(event.target as Node)) {
        setIsYearPopupOpen(false);
      }
    };

    if (isYearPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isYearPopupOpen]);

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

  const handleYearClick = () => {
    setIsYearPopupOpen(!isYearPopupOpen);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearPopupOpen(false);
    // TODO: 연도 변경 로직 추가
    console.log('선택된 연도:', year);
  };

  return (
    <>
      <S.QuarterSection>
        <S.QuarterHeader>
          <S.QuarterTitleGroup>
            <S.SectionTitle>분기설정</S.SectionTitle>
            <S.YearSelectorWrapper ref={yearPopupRef}>
              <S.YearSelector onClick={handleYearClick}>
                {selectedYear}
                <img 
                  src="/icons/admin/leftArrowGray.svg" 
                  alt="dropdown" 
                  style={{ 
                    transform: isYearPopupOpen ? 'rotate(90deg)' : 'rotate(-90deg)', 
                    marginLeft: '8px',
                    transition: 'transform 0.2s'
                  }} 
                />
              </S.YearSelector>
              {isYearPopupOpen && (
                <S.YearPopup>
                  {AVAILABLE_YEARS.map((year) => (
                    <S.YearOption
                      key={year}
                      $selected={year === selectedYear}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </S.YearOption>
                  ))}
                </S.YearPopup>
              )}
            </S.YearSelectorWrapper>
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

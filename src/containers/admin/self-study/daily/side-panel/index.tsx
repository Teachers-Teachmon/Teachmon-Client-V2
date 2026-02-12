import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/button';
import type { Grade } from '@/types/selfStudy';
import { PERIODS } from '@/constants/adminSelfStudy';
import * as S from './style';

interface SidePanelProps {
  selectedGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  selectedPeriods: string[];
  onPeriodToggle: (period: string) => void;
  onComplete: () => void;
}

export default function SidePanel({
  selectedGrade,
  onGradeChange,
  selectedPeriods,
  onPeriodToggle,
  onComplete,
}: SidePanelProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <S.SidePanel>
      <S.PanelSection>
        <S.SectionTitle>학년</S.SectionTitle>
        <S.GradeTabsContainer>
          <S.GradeTab 
            $active={selectedGrade === 1} 
            onClick={() => onGradeChange(1)}
          >
            1학년
          </S.GradeTab>
          <S.GradeTab 
            $active={selectedGrade === 2} 
            onClick={() => onGradeChange(2)}
          >
            2학년
          </S.GradeTab>
          <S.GradeTab 
            $active={selectedGrade === 3} 
            onClick={() => onGradeChange(3)}
          >
            3학년
          </S.GradeTab>
          <S.GradeTab 
            $active={selectedGrade === 'all'} 
            onClick={() => onGradeChange('all')}
          >
            전체
          </S.GradeTab>
        </S.GradeTabsContainer>
      </S.PanelSection>

      <S.PanelSection>
        <S.SectionTitle>교시 선택</S.SectionTitle>
        <S.PeriodDropdownWrapper>
          <S.PeriodDropdown ref={dropdownRef}>
            <S.DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              교시
              <img src="/icons/bottomArrow.svg" alt="arrow" />
            </S.DropdownButton>
            {isDropdownOpen && (
              <S.DropdownMenu>
                {PERIODS.map(period => (
                  <S.DropdownItem 
                    key={period}
                    $selected={selectedPeriods.includes(period)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPeriodToggle(period);
                    }}
                  >
                    <S.Checkbox $checked={selectedPeriods.includes(period)}>
                      {selectedPeriods.includes(period) && '✓'}
                    </S.Checkbox>
                    {period}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
          </S.PeriodDropdown>
          {selectedPeriods.length > 0 && (
            <S.SelectedPeriodsWrapper>
              {selectedPeriods
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(period => (
                  <S.SelectedPeriodTag key={period}>
                    {period}
                    <S.RemovePeriodButton onClick={() => onPeriodToggle(period)}>
                      ✕
                    </S.RemovePeriodButton>
                  </S.SelectedPeriodTag>
                ))}
            </S.SelectedPeriodsWrapper>
          )}
        </S.PeriodDropdownWrapper>
      </S.PanelSection>

      <S.ButtonWrapper $hasMany={selectedPeriods.length >= 7}>
        <Button 
          text="완료" 
          variant="confirm" 
          width="100%" 
          onClick={onComplete}
        />
      </S.ButtonWrapper>
    </S.SidePanel>
  );
}


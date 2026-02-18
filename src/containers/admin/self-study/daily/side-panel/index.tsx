import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/button';
import type { Grade } from '@/types/selfStudy';
import { PERIODS } from '@/constants/adminSelfStudy';
import * as S from './style';

type NumberGrade = Exclude<Grade, 'all'>;

interface SidePanelProps {
  selectedGrades: NumberGrade[];
  onGradesChange: (grades: NumberGrade[]) => void;
  selectedPeriods: string[];
  onPeriodToggle: (period: string) => void;
  onComplete: () => void;
}

export default function SidePanel({
  selectedGrades,
  onGradesChange,
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
            $active={selectedGrades.includes(1)} 
            onClick={() => {
              const has = selectedGrades.includes(1);
              const next = has
                ? selectedGrades.filter((g) => g !== 1)
                : [...selectedGrades, 1 as NumberGrade];
              onGradesChange(next);
            }}
          >
            1학년
          </S.GradeTab>
          <S.GradeTab 
            $active={selectedGrades.includes(2)} 
            onClick={() => {
              const has = selectedGrades.includes(2);
              const next = has
                ? selectedGrades.filter((g) => g !== 2)
                : [...selectedGrades, 2 as NumberGrade];
              onGradesChange(next);
            }}
          >
            2학년
          </S.GradeTab>
          <S.GradeTab 
            $active={selectedGrades.includes(3)} 
            onClick={() => {
              const has = selectedGrades.includes(3);
              const next = has
                ? selectedGrades.filter((g) => g !== 3)
                : [...selectedGrades, 3 as NumberGrade];
              onGradesChange(next);
            }}
          >
            3학년
          </S.GradeTab>
          <S.GradeTab 
            $active={([1, 2, 3] as NumberGrade[]).every((g) => selectedGrades.includes(g))}
            onClick={() => {
              const allSelected = ([1, 2, 3] as NumberGrade[]).every((g) => selectedGrades.includes(g));
              if (allSelected) {
                onGradesChange([]);
              } else {
                onGradesChange([1, 2, 3] as NumberGrade[]);
              }
            }}
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


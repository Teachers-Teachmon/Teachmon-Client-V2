import * as S from './style';

export interface QuarterSettingItem {
  quarter: number;
  startDate: string;
  endDate: string;
}

interface QuarterSettingsProps {
  quarters: QuarterSettingItem[];
}

export default function QuarterSettings({ quarters }: QuarterSettingsProps) {
  return (
    <S.QuarterSection>
      <S.QuarterHeader>
        <S.QuarterTitleGroup>
          <S.SectionTitle>분기설정</S.SectionTitle>
          <S.YearSelector>
            2026
            <img src="/icons/admin/leftArrowGray.svg" alt="dropdown" style={{ transform: 'rotate(-90deg)', marginLeft: '8px' }} />
          </S.YearSelector>
        </S.QuarterTitleGroup>
        <S.EditButton>
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
  );
}

import React from 'react';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import * as S from '@/pages/admin/after-school/style';

interface Props {
  selectedQuarter: string;
  setSelectedQuarter: (q: string) => void;
  selectedGrade: 1 | 2 | 3;
  setSelectedGrade: (g: 1 | 2 | 3) => void;
  googleSheetUrl: string;
  setGoogleSheetUrl: (url: string) => void;
  handleGoogleSheetSync: () => void;
  handleGoogleSheetUpload: () => void;
}

const AdminAfterSchoolHeaderContainer = ({
  selectedQuarter,
  setSelectedQuarter,
  selectedGrade,
  setSelectedGrade,
  googleSheetUrl,
  setGoogleSheetUrl,
  handleGoogleSheetSync,
  handleGoogleSheetUpload,
}: Props) => (
  <S.Header>
    <S.LeftSection>
      <S.QuarterDropdown>
        <Dropdown
          items={['1분기', '2분기', '3분기', '4분기']}
          value={selectedQuarter}
          onChange={setSelectedQuarter}
          placeholder="분기 선택"
        />
      </S.QuarterDropdown>
      <S.GradeTabs>
        <S.GradeTab $active={selectedGrade === 1} onClick={() => setSelectedGrade(1)}>1학년</S.GradeTab>
        <S.GradeTab $active={selectedGrade === 2} onClick={() => setSelectedGrade(2)}>2학년</S.GradeTab>
        <S.GradeTab $active={selectedGrade === 3} onClick={() => setSelectedGrade(3)}>3학년</S.GradeTab>
      </S.GradeTabs>
    </S.LeftSection>
    <S.HeaderButtons>
      <TextInput
        placeholder="구글스프레드시트"
        value={googleSheetUrl}
        onChange={(e) => setGoogleSheetUrl(e.target.value)}
      />
      <S.GoogleSheetActionButton onClick={handleGoogleSheetSync}>시트 동기화</S.GoogleSheetActionButton>
      <S.GoogleSheetActionButton onClick={handleGoogleSheetUpload}>시트 업로드</S.GoogleSheetActionButton>
    </S.HeaderButtons>
  </S.Header>
);

export default AdminAfterSchoolHeaderContainer;

import Dropdown from '@/components/ui/input/dropdown';
import Button from '@/components/ui/button';
import * as S from '@/pages/admin/after-school/style';

interface Props {
  quarterItems: string[];
  selectedQuarter: string;
  setSelectedQuarter: (q: string) => void;
  selectedGrade: 1 | 2 | 3;
  setSelectedGrade: (g: 1 | 2 | 3) => void;
  handlePdfDownload: () => void;
  isPdfLoading: boolean;
}

const AdminAfterSchoolHeaderContainer = ({
  quarterItems,
  selectedQuarter,
  setSelectedQuarter,
  selectedGrade,
  setSelectedGrade,
  handlePdfDownload,
  isPdfLoading,
}: Props) => (
  <S.Header>
    <S.LeftSection>
      <S.QuarterDropdown>
        <Dropdown
          items={quarterItems}
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
      <Button
        text="PDF 다운로드"
        variant="confirm"
        width="150px"
        onClick={handlePdfDownload}
        isLoading={isPdfLoading}
      />
    </S.HeaderButtons>
  </S.Header>
);

export default AdminAfterSchoolHeaderContainer;

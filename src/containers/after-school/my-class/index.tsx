import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@/components/layout/modal/confirm';
import * as S from './style';
import type { AfterSchoolClass } from '@/types/after-school';
import { MENU_OPTIONS } from '@/constants/after-school';
import { colors } from '@/styles/theme';

interface MyClassTableProps {
  classes: AfterSchoolClass[];
}

export default function MyClassTable({ classes }: MyClassTableProps) {
  const navigate = useNavigate();
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [selectedClassForTerminate, setSelectedClassForTerminate] = useState<AfterSchoolClass | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const menuButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filteredClasses = classes.filter(cls => cls.grade === selectedGrade);

  useEffect(() => {
    if (!menuOpenId) return;

    const handleClickOutside = () => {
      setMenuOpenId(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpenId]);

  const handleMenuToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (menuOpenId === id) {
      setMenuOpenId(null);
    } else {
      const button = menuButtonRefs.current[id];
      if (button) {
        const rect = button.getBoundingClientRect();
        setMenuPosition({ top: rect.bottom + 4, left: rect.right - 55 });
      }
      setMenuOpenId(id);
    }
  };

  const handleMenuItemClick = (e: React.MouseEvent, option: string, classData: AfterSchoolClass) => {
    e.stopPropagation();
    setMenuOpenId(null);
    
    if (option === '출장') {
      navigate('/after-school/business-trip', { state: { classData } });
    } else if (option === '보강') {
      console.log('보강:', classData);
    } else if (option === '종료') {
      setSelectedClassForTerminate(classData);
      setIsTerminateModalOpen(true);
    }
  };

  const handleTerminateConfirm = () => {
    setIsTerminateModalOpen(false);
    setSelectedClassForTerminate(null);
  };

  return (
    <S.Wrapper>
      <S.TitleSection>
        <S.Title>나의 방과후({filteredClasses.length})</S.Title>
        <S.GradeTabs>
                  <S.GradeTab $active={selectedGrade === 1} onClick={() => setSelectedGrade(1)}>1학년</S.GradeTab>
                  <S.GradeTab $active={selectedGrade === 2} onClick={() => setSelectedGrade(2)}>2학년</S.GradeTab>
                  <S.GradeTab $active={selectedGrade === 3} onClick={() => setSelectedGrade(3)}>3학년</S.GradeTab>
                </S.GradeTabs>
      </S.TitleSection>

      <S.Container>
        {filteredClasses.length > 0 ? (
          <S.Table>
            <tbody>
              {filteredClasses.map((cls, index) => (
                <S.TableRow key={cls.id}>
                  <S.TableCell>
                    <S.DayText>{cls.day}</S.DayText>
                  </S.TableCell>
                  <S.TableCell>
                    <S.TimeTag>{cls.time}</S.TimeTag>
                  </S.TableCell>
                  <S.TableCell>
                    <S.ClassText>{cls.subject}</S.ClassText>
                  </S.TableCell>
                  <S.TableCell>
                    <S.ProgramText>{cls.program}</S.ProgramText>
                  </S.TableCell>
                  <S.TableCell>
                    <S.MenuButton 
                      ref={(el) => { menuButtonRefs.current[cls.id] = el; }}
                      onClick={(e) => handleMenuToggle(e, cls.id)}
                    >
                      <img src="/icons/common/expand.svg" alt="메뉴" />
                    </S.MenuButton>
                    {menuOpenId === cls.id && (
                      <S.MenuDropdown 
                        $openUp={index >= filteredClasses.length - 2}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {MENU_OPTIONS.map((option) => (
                          <S.MenuItem 
                            key={option}
                            onClick={(e) => handleMenuItemClick(e, option, cls)}
                          >
                            {option}
                          </S.MenuItem>
                        ))}
                      </S.MenuDropdown>
                    )}
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        ) : (
          <S.EmptyState>데이터가 없습니다</S.EmptyState>
        )}
      </S.Container>

      <ConfirmModal
        isOpen={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        onConfirm={handleTerminateConfirm}
        title="종료"
        message={
          <div style={{ fontSize: '1.125rem', lineHeight: '1.6', textAlign: 'center' }}>
            정말로{' '}
            <span style={{ color: colors.primary, fontWeight: 600, fontSize: '1.25rem' }}>
              {selectedClassForTerminate?.subject}
            </span>
            {' '}방과후를<br />종료하시겠습니까?
          </div>
        }
        cancelText="취소"
        confirmText="종료"
      />
    </S.Wrapper>
  );
}

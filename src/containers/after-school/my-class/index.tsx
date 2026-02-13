import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ConfirmModal from '@/components/layout/modal/confirm';
import * as S from './style';
import type { MyAfterSchool } from '@/types/after-school';
import { MENU_OPTIONS } from '@/constants/after-school';
import { colors } from '@/styles/theme';
import { afterSchoolQuery } from '@/services/after-school/afterSchool.query';

export default function MyClassTable() {
  const navigate = useNavigate();
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [selectedClassForTerminate, setSelectedClassForTerminate] = useState<MyAfterSchool | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const { data: classes = [], isLoading } = useQuery(afterSchoolQuery.my(selectedGrade));

  const filteredClasses = classes;

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
      setMenuOpenId(id);
    }
  };

  const handleMenuItemClick = (e: React.MouseEvent, option: string, classData: MyAfterSchool) => {
    e.stopPropagation();
    setMenuOpenId(null);
    
    if (option === '출장') {
      navigate('/after-school/business-trip', { state: { classData } });
    } else if (option === '보강') {
      navigate('/after-school/extra', { state: { classData } });
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
        <S.Title>나의 방과후({isLoading ? '...' : filteredClasses.length})</S.Title>
        <S.GradeTabs>
                  <S.GradeTab $active={selectedGrade === 1} onClick={() => setSelectedGrade(1)}>1학년</S.GradeTab>
                  <S.GradeTab $active={selectedGrade === 2} onClick={() => setSelectedGrade(2)}>2학년</S.GradeTab>
                  <S.GradeTab $active={selectedGrade === 3} onClick={() => setSelectedGrade(3)}>3학년</S.GradeTab>
                </S.GradeTabs>
      </S.TitleSection>

      <S.Container>
        {filteredClasses.length > 0 ? (
          <>
            {/* 모바일용 카드 리스트 */}
            <S.MobileCardList>
              {filteredClasses.map((cls) => (
                <S.MobileCard key={cls.id}>
                  <S.MobileCardTop>
                    <S.MobileTimeTag>{cls.period}</S.MobileTimeTag>
                    <S.MobileMenuButton
                      onClick={(e) => handleMenuToggle(e, cls.id)}
                    >
                      <img src="/icons/common/expand.svg" alt="메뉴" />
                    </S.MobileMenuButton>
                    {menuOpenId === cls.id && (
                      <S.MenuDropdown 
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
                  </S.MobileCardTop>
                  <S.MobileCardSubject>{cls.name}</S.MobileCardSubject>
                  <S.MobileCardInfo>{cls.week_day} · {cls.place.name}</S.MobileCardInfo>
                </S.MobileCard>
              ))}
            </S.MobileCardList>

            {/* 데스크톱용 테이블 */}
            <S.Table>
              <tbody>
                {filteredClasses.map((cls, index) => (
                  <S.TableRow key={cls.id}>
                    <S.TableCell>
                      <S.DayText>{cls.week_day}</S.DayText>
                    </S.TableCell>
                    <S.TableCell>
                      <S.TimeTag>{cls.period}</S.TimeTag>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ClassText>{cls.name}</S.ClassText>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ProgramText>{cls.place.name}</S.ProgramText>
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
          </>
        ) : (
          <S.EmptyState>나의 방과후가 없습니다</S.EmptyState>
        )}
      </S.Container>

      <ConfirmModal
        isOpen={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        onConfirm={handleTerminateConfirm}
        title="종료"
        message={
          <div style={{ fontSize: '1.125rem', lineHeight: '1.6', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', lineHeight: '1.4', textAlign: 'center' }}>
              정말로{' '}
              <span style={{ color: colors.primary, fontWeight: 600, fontSize: '16px' }}>
                {selectedClassForTerminate?.name}
              </span>
              {' '}방과후를<br />종료하시겠습니까?
            </div>
          </div>
        }
        cancelText="취소"
        confirmText="종료"
      />
    </S.Wrapper>
  );
}

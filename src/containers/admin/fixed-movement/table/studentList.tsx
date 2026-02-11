import { useState, useRef, useEffect, useCallback } from 'react';
import { breakpoints } from '@/styles/media';
import * as S from './style';

interface Student {
  studentNumber: string;
  name: string;
}

interface StudentListWithOverflowProps {
  students: Student[];
  maxVisible?: number;
}

export default function StudentListWithOverflow({ 
  students, 
  maxVisible = 5 
}: StudentListWithOverflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(maxVisible);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= breakpoints.mobile);
  }, []);

  const calculateVisibleCount = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // 모바일이면 모든 학생 표시
    if (window.innerWidth <= breakpoints.mobile) {
      setVisibleCount(students.length);
      return;
    }

    const containerWidth = container.offsetWidth;
    const tags = container.querySelectorAll('[data-student-tag]');
    const moreTag = container.querySelector('[data-more-tag]');
    const moreTagWidth = moreTag ? (moreTag as HTMLElement).offsetWidth + 8 : 50; // 8은 gap
    
    let totalWidth = 0;
    let count = 0;
    const availableWidth = containerWidth - moreTagWidth;

    tags.forEach((tag, index) => {
      if (index >= students.length) return;
      const tagWidth = (tag as HTMLElement).offsetWidth + 8; // 8은 gap
      if (totalWidth + tagWidth <= availableWidth) {
        totalWidth += tagWidth;
        count++;
      }
    });

    // 최소 1명은 표시
    setVisibleCount(Math.max(1, Math.min(count, maxVisible, students.length)));
  }, [students.length, maxVisible]);

  useEffect(() => {
    checkMobile();
    // 초기에 모든 태그를 렌더링한 후 계산
    const timer = setTimeout(calculateVisibleCount, 0);
    
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
      calculateVisibleCount();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, [calculateVisibleCount, checkMobile]);

  const displayedStudents = isMobile ? students : students.slice(0, visibleCount);
  const hasMore = !isMobile && students.length > visibleCount;

  return (
    <S.StudentListContainer ref={containerRef} $isMobile={isMobile}>
      <S.StudentListInner $isMobile={isMobile}>
        {displayedStudents.map((student, idx) => (
          <S.StudentTag key={idx} data-student-tag>
            {student.studentNumber} {student.name}
          </S.StudentTag>
        ))}
        {hasMore && (
          <S.MoreTag data-more-tag>...</S.MoreTag>
        )}
      </S.StudentListInner>
      {/* 측정용 숨겨진 태그들 (PC에서만 필요) */}
      {!isMobile && (
        <S.HiddenMeasure>
          {students.slice(0, maxVisible).map((student, idx) => (
            <S.StudentTag key={idx} data-student-tag>
              {student.studentNumber} {student.name}
            </S.StudentTag>
          ))}
          <S.MoreTag data-more-tag>...</S.MoreTag>
        </S.HiddenMeasure>
      )}
    </S.StudentListContainer>
  );
}

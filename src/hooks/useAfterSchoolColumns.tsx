import React, { useMemo, useState, useEffect } from 'react';
import type { TableColumn } from '@/components/layout/table/index';
import type { AdminAfterSchoolClass } from '@/types/after-school';

export const useAfterSchoolColumns = (): { columns: TableColumn<AdminAfterSchoolClass>[] } => {
  const [maxStudentsToShow, setMaxStudentsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1200) {
        setMaxStudentsToShow(1);
      } else if (width < 1600) {
        setMaxStudentsToShow(2);
      } else {
        setMaxStudentsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStudents = (students: string[]) => {
    const displayStudents = students.slice(0, maxStudentsToShow);
    const hasMore = students.length > maxStudentsToShow;
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        gap: '0.3rem',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        minWidth: '0',
        whiteSpace: 'nowrap',
        width: '100%',
      }
    }, [
      ...displayStudents.map((student, idx) =>
        React.createElement('span', {
          key: idx,
          style: {
            padding: '0.1rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            color: '#333',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, color 0.2s',
            cursor: 'pointer',
          }
        }, student)
      ),
      hasMore && React.createElement('span', {
        style: {
          color: '#999',
          fontSize: '1.1rem',
        }
      }, '...')
    ]);
  };

  const columns: TableColumn<AdminAfterSchoolClass>[] = useMemo(() => [
    {
      key: 'teacher',
      header: '담당교사',
      width: '120px',
      render: (row: AdminAfterSchoolClass) =>
        React.createElement('span', {
          style: {
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }
        }, row.teacher),
    },
    {
      key: 'period',
      header: '교시',
      width: '100px',
      render: (row: AdminAfterSchoolClass) =>
        React.createElement('span', {
          style: {
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }
        }, row.period),
    },
    {
      key: 'location',
      header: '장소이름',
      width: '180px',
      render: (row: AdminAfterSchoolClass) =>
        React.createElement('span', {
          style: {
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            display: 'inline-block',
          }
        }, row.location),
    },
    {
      key: 'subject',
      header: '이름',
      width: '200px',
      render: (row: AdminAfterSchoolClass) =>
        React.createElement('span', {
          style: {
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            display: 'inline-block',
          }
        }, row.subject),
    },
    {
      key: 'students',
      header: '학생',
      width: '1fr',
      render: (row: AdminAfterSchoolClass) => renderStudents(row.students),
    },
  ], [maxStudentsToShow, renderStudents]);

  return { columns };
};

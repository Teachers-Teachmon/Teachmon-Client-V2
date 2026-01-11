import { useState, useRef, useEffect } from 'react';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import Button from '@/components/ui/button';
import TextInput from '@/components/ui/input/text-input';
import * as S from './style';
import * as PageS from '@/pages/admin/users/style';

export interface Student {
  id: string;
  grade: number;
  classNum: number;
  number: number;
  name: string;
}

interface StudentsProps {
  searchQuery: string;
}

const mockStudents: Student[] = [
  { id: '1', grade: 1, classNum: 4, number: 10, name: '윤도훈' },
  { id: '2', grade: 2, classNum: 2, number: 9, name: '윤도훈' },
];

export default function Students({ searchQuery }: StudentsProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent({ ...student });
    setEditingIds((prev) => new Set(prev).add(student.id));
    setOpenMenuId(null);
  };

  const handleSave = (studentId: string) => {
    if (!editingStudent || editingStudent.id !== studentId) return;
    setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
    setEditingStudent(null);
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(studentId);
      return newSet;
    });
  };

  const handleCancel = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student && !student.name) {
      setStudents(students.filter((s) => s.id !== studentId));
    }
    if (editingStudent?.id === studentId) {
      setEditingStudent(null);
    }
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(studentId);
      return newSet;
    });
  };

  const handleDelete = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(studentId);
      return newSet;
    });
    setOpenMenuId(null);
  };

  const handleAdd = () => {
    const newStudent: Student = {
      id: String(Date.now()),
      grade: 1,
      classNum: 1,
      number: 1,
      name: '',
    };
    setStudents([...students, newStudent]);
    setEditingStudent(newStudent);
    setEditingIds((prev) => new Set(prev).add(newStudent.id));
  };

  const filteredStudents = students.filter(
    (student) => student.name.includes(searchQuery) || String(student.grade).includes(searchQuery)
  );

  const columns: TableColumn<Student>[] = [
    {
      key: 'grade',
      header: '학년',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.grade : row.grade}
            onChange={(e) => {
              if (editingStudent?.id === row.id) {
                setEditingStudent({ ...editingStudent, grade: Number(e.target.value) });
              } else {
                setEditingStudent({ ...row, grade: Number(e.target.value) });
              }
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.grade
        ),
    },
    {
      key: 'classNum',
      header: '반',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.classNum : row.classNum}
            onChange={(e) => {
              if (editingStudent?.id === row.id) {
                setEditingStudent({ ...editingStudent, classNum: Number(e.target.value) });
              } else {
                setEditingStudent({ ...row, classNum: Number(e.target.value) });
              }
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.classNum
        ),
    },
    {
      key: 'number',
      header: '번호',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.number : row.number}
            onChange={(e) => {
              if (editingStudent?.id === row.id) {
                setEditingStudent({ ...editingStudent, number: Number(e.target.value) });
              } else {
                setEditingStudent({ ...row, number: Number(e.target.value) });
              }
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.number
        ),
    },
    {
      key: 'name',
      header: '이름',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.name : row.name}
            onChange={(e) => {
              if (editingStudent?.id === row.id) {
                setEditingStudent({ ...editingStudent, name: e.target.value });
              } else {
                setEditingStudent({ ...row, name: e.target.value });
              }
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.name
        ),
    },
  ];

  const renderActions = (row: Student) => (
    <S.ActionCell>
      {editingIds.has(row.id) ? (
        <S.EditButtonGroup>
          <Button text="취소" variant="cancel" onClick={() => handleCancel(row.id)} />
          <Button text="저장" variant="confirm" onClick={() => handleSave(row.id)} />
        </S.EditButtonGroup>
      ) : (
        <div ref={openMenuId === row.id ? menuRef : null}>
          <S.KebabButton onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}>
            <img src="/icons/common/kebabMenu.svg" alt="메뉴" />
          </S.KebabButton>
          {openMenuId === row.id && (
            <S.DropdownMenu>
              <S.DropdownItem $danger onClick={() => handleDelete(row.id)}>
                삭제
              </S.DropdownItem>
              <S.DropdownItem onClick={() => handleEdit(row)}>수정</S.DropdownItem>
            </S.DropdownMenu>
          )}
        </div>
      )}
    </S.ActionCell>
  );

  return (
    <>
      <S.TableWrapper>
        <TableLayout columns={columns} data={filteredStudents} renderActions={renderActions} />
      </S.TableWrapper>
      <PageS.AddButton onClick={handleAdd}>
        <img src="/icons/common/plusBlue.svg" alt="추가" />
        <span>추가</span>
      </PageS.AddButton>
    </>
  );
}

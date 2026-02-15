import { useEffect } from 'react';
import StatusBadge from '@/components/ui/status';
import type { StatusType } from '@/components/ui/status';
import * as S from './style';

interface Student {
    id: number;
    number: number;
    name: string;
    status?: StatusType;
}

interface ClassCardProps {
    classNum: number;
    students: Student[];
    selectedStudentId: number | null;
    onStudentSelect: (id: number | null) => void;
}

export default function ClassCard({ classNum, students, selectedStudentId, onStudentSelect }: ClassCardProps) {
    useEffect(() => {
        const handleClickOutside = () => onStudentSelect(null);
        if (selectedStudentId) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [selectedStudentId, onStudentSelect]);

    const getStatusOptions = (student: Student): StatusType[] => {
        if (student.status === '조퇴' || student.status === '이탈') {
            return ['취소' as StatusType];
        }
        return ['조퇴', '이탈'];
    };

    return (
        <S.Container>
            <S.ClassTitle>{classNum}반</S.ClassTitle>
            <S.StudentsGrid>
                {students.map((student) => (
                    <S.StudentCard 
                        key={student.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onStudentSelect(student.id);
                        }}
                    >
                        <S.StudentNumber>{student.number}</S.StudentNumber>
                        <S.StudentName>{student.name}</S.StudentName>
                        {selectedStudentId === student.id && (
                            <S.StatusPopupContainer onClick={(e) => e.stopPropagation()}>
                                {getStatusOptions(student).map((status, index) => (
                                    <S.StatusBadgeWrapper key={index}>
                                        <StatusBadge status={status} />
                                    </S.StatusBadgeWrapper>
                                ))}
                            </S.StatusPopupContainer>
                        )}
                    </S.StudentCard>
                ))}
            </S.StudentsGrid>
        </S.Container>
    );
}

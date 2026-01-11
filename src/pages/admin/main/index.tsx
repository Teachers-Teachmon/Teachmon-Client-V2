import * as React from 'react';
import * as S from './style';
import MenuCard from '@/containers/admin/main/menu-card';
import { MENU_CARDS } from '@/constants/menuCards';
import SupervisorRanking from '@/containers/admin/main/supervisor-ranking';
import AbsentStudents from '@/containers/admin/main/absent-students';
import QuarterSettings from '@/containers/admin/main/quarter-settings';

// 메뉴 카드 데이터는 constants/menuCards.ts에서 관리

import { absentStudents, supervisorRanking, quarterSettings } from './data';

export default function AdminMain() {
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(absentStudents.length / itemsPerPage);
    
    const handleDelete = (id: number) => {
        console.log('삭제:', id);
    };
    
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };
    
    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    };
    
    const currentStudents = absentStudents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <S.Container>
            <S.ContentArea>
                {/* 첫 번째 행: 메뉴 카드 + 자습감독 횟수 */}
                <S.Row>
                    <MenuCard items={MENU_CARDS} />
                    <SupervisorRanking ranking={supervisorRanking} />
                </S.Row>
                {/* 두 번째 행: 이탈학생 + 분기설정 */}
                <S.Row>
                    <AbsentStudents
                        students={currentStudents}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        onDelete={handleDelete}
                    />
                    <QuarterSettings quarters={quarterSettings} />
                </S.Row>
            </S.ContentArea>
        </S.Container>
    );
}

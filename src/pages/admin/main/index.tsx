import * as S from './style';
import MenuCard from '@/containers/admin/main/menu-card';
import { MENU_CARDS } from '@/constants/adminMenuCards';
import SupervisorRanking from '@/containers/admin/main/supervisor-ranking';
import AbsentStudents from '@/containers/admin/main/absent-students';
import QuarterSettings from '@/containers/admin/main/quarter-settings';
import { useQuery } from '@tanstack/react-query';
import { supervisionQuery } from '@/services/supervision/supervision.query';
import { manageQuery } from '@/services/manage/manage.query';
import { useDeleteExitHistoryMutation } from '@/services/manage/manage.mutation';
import { branchQuery } from '@/services/branch/branch.query';
import { useCreateBranchMutation } from '@/services/branch/branch.mutation';

export default function AdminMain() {
    const { data: supervisionData, isError: isSupervisionError } = useQuery(supervisionQuery.rank());
    const { data: exitHistoryData, isError: isExitHistoryError } = useQuery(manageQuery.weeklyExitHistory());
    const { data: branchData, isError: isBranchError } = useQuery(branchQuery.list());
    
    const deleteExitHistoryMutation = useDeleteExitHistoryMutation();
    const createBranchMutation = useCreateBranchMutation();

    const handleDelete = (id: number) => {
        deleteExitHistoryMutation.mutate(id);
    };

    const handleCreateBranch = (quarter: number, startDate: string, endDate: string) => {
        createBranchMutation.mutate({
            number: quarter,
            start_day: startDate,
            end_day: endDate,
        });
    };

    // 감독 순위 데이터 변환
    const supervisorRanking = supervisionData?.map((item, index) => ({
        rank: item.rank,
        name: item.name,
        count: item.total_supervision_count,
        image: index === 0 ? '/icons/admin/first.svg' : 
               index === 1 ? '/icons/admin/second.svg' : 
               index === 2 ? '/icons/admin/third.svg' : undefined,
    })) || [];

    // 이탈 학생 데이터 변환
    const absentStudents = exitHistoryData?.map((item) => ({
        id: item.exit_history_id,
        date: item.period.replace('_', ' '),
        name: `${item.student_number} ${item.student_name}`,
    })) || [];

    // 분기 설정 데이터 변환
    const quarterSettings = branchData?.map((item) => ({
        quarter: item.number,
        startDate: new Date(item.start_day).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        endDate: new Date(item.end_day).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
    })) || [];

    return (
        <S.Container>
            <S.ContentArea>
                {/* 첫 번째 행: 메뉴 카드 + 자습감독 횟수 */}
                <S.Row>
                    <MenuCard items={MENU_CARDS} />
                    <SupervisorRanking 
                        ranking={supervisorRanking} 
                        isError={isSupervisionError}
                    />
                </S.Row>
                {/* 두 번째 행: 이탈학생 + 분기설정 */}
                <S.Row>
                    <AbsentStudents
                        students={absentStudents}
                        onDelete={handleDelete}
                        isError={isExitHistoryError}
                    />
                    <QuarterSettings 
                        quarters={quarterSettings}
                        onCreateBranch={handleCreateBranch}
                        isError={isBranchError}
                    />
                </S.Row>
            </S.ContentArea>
        </S.Container>
    );
}

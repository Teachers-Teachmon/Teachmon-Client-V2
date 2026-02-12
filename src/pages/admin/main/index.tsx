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
import { toast } from 'react-toastify';
import { formatDateShort, formatPeriod } from '@/utils/format';

export default function AdminMain() {
    const { data: supervisionData, isError: isSupervisionError } = useQuery(supervisionQuery.rank());
    const { data: exitHistoryData, isError: isExitHistoryError } = useQuery(manageQuery.weeklyExitHistory());
    const { data: branchData, isError: isBranchError } = useQuery(branchQuery.list());
    
    const deleteExitHistoryMutation = useDeleteExitHistoryMutation();
    const createBranchMutation = useCreateBranchMutation();

    const handleDelete = (id: number) => {
        deleteExitHistoryMutation.mutate(id, {
            onSuccess: () => {
                toast.success('이탈 기록이 삭제되었습니다.');
            },
            onError: (error) => {
                console.error('삭제 실패:', error);
                toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
            }
        });
    };

    const handleCreateBranch = (quarter: number, startDate: string, endDate: string) => {
        createBranchMutation.mutate({
            number: quarter,
            start_day: startDate,
            end_day: endDate,
        }, {
            onSuccess: () => {
                toast.success('분기가 설정되었습니다.');
            },
            onError: (error) => {
                console.error('분기 설정 실패:', error);
                toast.error('분기 설정에 실패했습니다. 다시 시도해주세요.');
            }
        });
    };

    // 감독 순위 데이터 변환
    const supervisorRanking = supervisionData?.map((item) => ({
        rank: item.rank,
        name: item.name,
        count: item.total_supervision_count,
        image: item.rank === 1 ? '/icons/admin/rank-1.svg' : 
               item.rank === 2 ? '/icons/admin/rank-2.svg' : 
               item.rank === 3 ? '/icons/admin/rank-3.svg' : undefined,
    })) || [];

    // 이탈 학생 데이터 변환
    const absentStudents = exitHistoryData?.map((item) => ({
        id: item.exit_id,
        date: `${formatDateShort(item.day)} ${formatPeriod(item.period)}`,
        name: `${item.number} ${item.name}`,
    })) || [];

    // 분기 설정 데이터 변환
    const quarterSettings = branchData?.map((item) => ({
        quarter: item.number,
        startDate: new Date(item.start_day).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        endDate: new Date(item.end_day).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        rawStartDate: item.start_day,
        rawEndDate: item.end_day,
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

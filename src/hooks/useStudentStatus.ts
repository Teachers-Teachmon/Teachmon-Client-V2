import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStudentSchedule, cancelStudentSchedule } from '@/services/manage/manage.api';
import type { StudentState } from '@/types/manage';
import type { StatusType } from '@/components/ui/status';

const mapStatusToState = (status: StatusType): StudentState | null => {
    switch (status) {
        case '조퇴':
            return 'AWAY';
        case '이탈':
            return 'EXIT';
        default:
            return null;
    }
};

export const useStudentStatus = () => {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['manage.studentSchedule'] });
        queryClient.invalidateQueries({ queryKey: ['manage.placeSchedule'] });
        queryClient.invalidateQueries({ queryKey: ['manage.scheduleHistory'] });
    };

    const updateMutation = useMutation({
        mutationFn: updateStudentSchedule,
        onSuccess: (data) => {
            toast.success(data.message || '상태가 변경되었습니다.');
            invalidateAll();
        },
        onError: (error) => {
            console.error('Update error:', error);
            toast.error('상태 변경에 실패했습니다.');
        },
    });

    const cancelMutation = useMutation({
        mutationFn: ({ scheduleId, state }: { scheduleId: string; state: StudentState }) =>
            cancelStudentSchedule(scheduleId, state),
        onSuccess: (data) => {
            toast.success(data.message || '취소되었습니다.');
            invalidateAll();
        },
        onError: (error) => {
            console.error('Cancel error:', error);
            toast.error('취소에 실패했습니다.');
        },
    });

    const changeStatus = (scheduleId: string, status: StatusType, currentState?: StudentState | null) => {
        if (status === '취소' && currentState) {
            cancelMutation.mutate({ scheduleId, state: currentState });
        } else {
            const newState = mapStatusToState(status);
            if (newState) {
                updateMutation.mutate({ schedule_id: scheduleId, state: newState });
            }
        }
    };

    const changeBulkStatus = async (
        scheduleData: Array<{ scheduleId: string; status: StatusType; currentState?: StudentState }>
    ) => {
        const promises = scheduleData.map(({ scheduleId, status, currentState }) => {
            if (status === '취소' && currentState) {
                return cancelStudentSchedule(scheduleId, currentState);
            } else {
                const newState = mapStatusToState(status);
                if (newState) {
                    return updateStudentSchedule({ schedule_id: scheduleId, state: newState });
                }
            }
            return Promise.resolve();
        });

        try {
            await Promise.all(promises);
            toast.success(`${scheduleData.length}명의 상태가 변경되었습니다.`);
            invalidateAll();
        } catch (error) {
            console.error('Bulk update error:', error);
            toast.error('일부 상태 변경에 실패했습니다.');
        }
    };

    return { changeStatus, changeBulkStatus };
};

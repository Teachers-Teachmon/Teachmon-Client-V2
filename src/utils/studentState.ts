import type { StudentState } from '@/services/manage/manage.api';
import { STATUS_CONFIG, STATUS_TYPES } from '@/constants/status';
import type { StatusType } from '@/components/ui/status';

export interface StudentStateInfo {
    label: string;
    color: string;
    backgroundColor: string;
}

// StatusType을 StudentState로 변환
export const mapStatusToState = (status: StatusType): StudentState | null => {
    switch (status) {
        case '조퇴':
            return 'AWAY';
        case '이탈':
            return 'EXIT';
        default:
            return null;
    }
};

// StudentState를 StatusType으로 변환
export const mapStateToStatus = (state: StudentState | null): StatusType | undefined => {
    if (!state) return undefined;
    
    switch (state) {
        case 'AFTER_SCHOOL':
            return STATUS_TYPES.AFTER_SCHOOL;
        case 'SELF_STUDY':
        case 'ADDITIONAL_SELF_STUDY':
            return STATUS_TYPES.SELF_STUDY;
        case 'LEAVE_SEAT':
            return STATUS_TYPES.LEAVE_SEAT;
        case 'AWAY':
        case 'EARLY_LEAVE':
            return STATUS_TYPES.EARLY_LEAVE;
        case 'EXIT':
        case 'EVASION':
            return STATUS_TYPES.DROPOUT;
        default:
            return undefined;
    }
};

export const getStudentStateInfo = (state?: StudentState | null): StudentStateInfo | null => {
    if (!state) return null;

    switch (state) {
        case 'LEAVE_SEAT':
            return {
                label: STATUS_TYPES.LEAVE_SEAT,
                color: STATUS_CONFIG[STATUS_TYPES.LEAVE_SEAT].textColor,
                backgroundColor: STATUS_CONFIG[STATUS_TYPES.LEAVE_SEAT].background,
            };
        case 'AWAY':
        case 'EARLY_LEAVE':
            return {
                label: STATUS_TYPES.EARLY_LEAVE,
                color: STATUS_CONFIG[STATUS_TYPES.EARLY_LEAVE].textColor,
                backgroundColor: STATUS_CONFIG[STATUS_TYPES.EARLY_LEAVE].background,
            };
        case 'EXIT':
        case 'EVASION':
            return {
                label: STATUS_TYPES.DROPOUT,
                color: STATUS_CONFIG[STATUS_TYPES.DROPOUT].textColor,
                backgroundColor: STATUS_CONFIG[STATUS_TYPES.DROPOUT].background,
            };
        case 'AFTER_SCHOOL':
            return {
                label: STATUS_TYPES.AFTER_SCHOOL,
                color: STATUS_CONFIG[STATUS_TYPES.AFTER_SCHOOL].textColor,
                backgroundColor: STATUS_CONFIG[STATUS_TYPES.AFTER_SCHOOL].background,
            };
        case 'SELF_STUDY':
        case 'ADDITIONAL_SELF_STUDY':
            return {
                label: STATUS_TYPES.SELF_STUDY,
                color: STATUS_CONFIG[STATUS_TYPES.SELF_STUDY].textColor,
                backgroundColor: STATUS_CONFIG[STATUS_TYPES.SELF_STUDY].background,
            };
        default:
            return null;
    }
};

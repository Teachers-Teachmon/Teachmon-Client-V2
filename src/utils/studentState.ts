import type { StudentState } from '@/types/manage';
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
        case 'AFTER_SCHOOL_REINFORCEMENT':
            return STATUS_TYPES.AFTER_SCHOOL_REINFORCEMENT;
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

export const getStudentStateInfo = (state?: StudentState | null, useMapColors = false): StudentStateInfo | null => {
    if (!state) return null;

    const getBackgroundColor = (statusType: StatusType) => {
        return useMapColors ? STATUS_CONFIG[statusType].mapBackground : STATUS_CONFIG[statusType].background;
    };

    switch (state) {
        case 'LEAVE_SEAT':
            return {
                label: STATUS_TYPES.LEAVE_SEAT,
                color: STATUS_CONFIG[STATUS_TYPES.LEAVE_SEAT].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.LEAVE_SEAT),
            };
        case 'AWAY':
        case 'EARLY_LEAVE':
            return {
                label: STATUS_TYPES.EARLY_LEAVE,
                color: STATUS_CONFIG[STATUS_TYPES.EARLY_LEAVE].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.EARLY_LEAVE),
            };
        case 'EXIT':
        case 'EVASION':
            return {
                label: STATUS_TYPES.DROPOUT,
                color: STATUS_CONFIG[STATUS_TYPES.DROPOUT].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.DROPOUT),
            };
        case 'AFTER_SCHOOL':
            return {
                label: STATUS_TYPES.AFTER_SCHOOL,
                color: STATUS_CONFIG[STATUS_TYPES.AFTER_SCHOOL].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.AFTER_SCHOOL),
            };
        case 'AFTER_SCHOOL_REINFORCEMENT':
            return {
                label: STATUS_TYPES.AFTER_SCHOOL_REINFORCEMENT,
                color: STATUS_CONFIG[STATUS_TYPES.AFTER_SCHOOL_REINFORCEMENT].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.AFTER_SCHOOL_REINFORCEMENT),
            };
        case 'SELF_STUDY':
        case 'ADDITIONAL_SELF_STUDY':
            return {
                label: STATUS_TYPES.SELF_STUDY,
                color: STATUS_CONFIG[STATUS_TYPES.SELF_STUDY].textColor,
                backgroundColor: getBackgroundColor(STATUS_TYPES.SELF_STUDY),
            };
        default:
            return null;
    }
};

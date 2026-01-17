import { useState } from 'react';
import MovementForm from '@/containers/manage-student/movement/form';
import MovementMap from '@/containers/manage-student/movement/map';
import type { Period, Reason } from '@/constants/movement';

export interface MovementFormData {
    period: Period;
    reason: Reason;
    items: string;
    students: string[];
}

export default function Movement() {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState<MovementFormData | null>(null);

    const handleCancel = () => {
        window.history.back();
    };

    const handleNext = (data: MovementFormData) => {
        setFormData(data);
        setStep(2);
    };

    const handleBackToStep1 = () => {
        setStep(1);
    };

    if (step === 2 && formData) {
        return <MovementMap onBack={handleBackToStep1} formData={formData} />;
    }

    return <MovementForm onNext={handleNext} onCancel={handleCancel} />;
}

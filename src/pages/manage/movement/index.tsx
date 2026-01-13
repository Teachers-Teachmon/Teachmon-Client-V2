import { useState } from 'react';
import MovementForm from '@/containers/manage-student/movement/form';
import MovementMap from '@/containers/manage-student/movement/map';

export default function Movement() {
    const [step, setStep] = useState<1 | 2>(1);

    const handleCancel = () => {
        window.history.back();
    };

    const handleNext = () => {
        setStep(2);
    };

    const handleBackToStep1 = () => {
        setStep(1);
    };

    if (step === 2) {
        return <MovementMap onBack={handleBackToStep1} />;
    }

    return <MovementForm onNext={handleNext} onCancel={handleCancel} />;
}

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovementForm from '@/containers/manage-student/movement/form';
import MovementMap from '@/containers/manage-student/movement/map';
import { movementQuery } from '@/services/movement/movement.query';
import type { MovementFormData } from '@/constants/movement';

export default function Movement() {
    const [searchParams] = useSearchParams();
    const isEditMode = searchParams.get('edit') === 'true';
    const editId = searchParams.get('id');
    
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState<MovementFormData | null>(null);

    // 수정 모드일 때 이석 상세 조회
    const { data: editData } = useQuery({
        ...movementQuery.detail(editId!),
        enabled: isEditMode && !!editId,
    });

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

    return <MovementForm onNext={handleNext} onCancel={handleCancel} initialData={editData} savedFormData={formData ?? undefined} />;
}

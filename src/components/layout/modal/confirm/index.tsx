import Modal from "..";
import * as S from "./style";

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    cancelText?: string
    confirmText?: string
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    cancelText = "취소",
    confirmText = "확인"
}: ConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding="2.5rem">
            <S.Container>
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
                <S.ButtonGroup>
                    {/* 여기있는 버튼은 나중 컴포넌트 버튼으로대체 */}
                    <button onClick={onClose}>
                        {cancelText}
                    </button>
                    <button onClick={handleConfirm}>
                        {confirmText}
                    </button>
                </S.ButtonGroup>
            </S.Container>
        </Modal>
    )
}
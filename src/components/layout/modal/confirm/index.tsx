import Modal from "..";
import Button from "@/components/ui/button";
import * as S from "./style";

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string | React.ReactNode
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
    return (
        <Modal isOpen={isOpen} onClose={onClose} padding="2.5rem">
            <S.Container>
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
                <S.ButtonGroup>
                    <Button variant="cancel" text={cancelText} onClick={onClose} />
                    <Button variant="confirm" text={confirmText} onClick={onConfirm} />
                </S.ButtonGroup>
            </S.Container>
        </Modal>
    )
}
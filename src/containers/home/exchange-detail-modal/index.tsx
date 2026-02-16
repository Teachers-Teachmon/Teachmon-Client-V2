import Modal from '@/components/layout/modal';
import ExchangeDetailContent from '@/components/ui/exchange-detail-content';
import type { ExchangeRequest } from '@/types/supervision';

interface ExchangeDetailModalProps {
    isOpen: boolean;
    exchange: ExchangeRequest | null;
    currentTeacherId: number;
    onClose: () => void;
    onAccept: () => void;
    onReject: () => void;
}

export default function ExchangeDetailModal({
    isOpen,
    exchange,
    currentTeacherId,
    onClose,
    onAccept,
    onReject,
}: ExchangeDetailModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} padding="52px 0">
            {exchange && (
                <ExchangeDetailContent
                    exchange={exchange}
                    currentTeacherId={currentTeacherId}
                    onClose={onClose}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            )}
        </Modal>
    );
}

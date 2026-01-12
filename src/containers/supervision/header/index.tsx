import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/ui/button';
import TextInput from '@/components/ui/input/text-input';
import * as S from './style';

interface SupervisionHeaderProps {
    exchangeMode: boolean;
    onExchangeClick: () => void;
}

export default function SupervisionHeader({
    exchangeMode,
    onExchangeClick,
}: SupervisionHeaderProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || '';
    const [value, setValue] = useState(queryParam);

    useEffect(() => {
        setValue(queryParam);
    }, [queryParam]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newParams = new URLSearchParams(searchParams);
            if (value.trim()) {
                newParams.set('query', value.trim());
            } else {
                newParams.delete('query');
            }
            setSearchParams(newParams, { replace: true });
        }
    };

    return (
        <S.Header>
            <S.SearchContainer>
                <TextInput
                    placeholder="이름을 입력해주세요."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    customHeight={"2.5rem"}
                />
            </S.SearchContainer>
            <Button
                text={exchangeMode ? '교체 취소' : '교체하기'}
                variant="confirm"
                onClick={onExchangeClick}
            />
        </S.Header>
    );
}

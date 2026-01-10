import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function QuickLinkSection() {
    const navigate = useNavigate();

    return (
        <S.QuickLinkCard onClick={() => navigate('/manage/movement')}>
            <S.QuickLinkHeader>
                <S.QuickLinkTextContainer>
                    <S.QuickLinkTitle>이석작성 바로가기</S.QuickLinkTitle>
                    <S.QuickLinkDescription>
                        학생관리를 거쳐서 가지 않아도 돼요.
                    </S.QuickLinkDescription>
                </S.QuickLinkTextContainer>
                <S.ArrowButton>
                    <img src="/icons/RightArrow.svg" alt="바로가기" />
                </S.ArrowButton>
            </S.QuickLinkHeader>
            <S.PencilIcon>
                <img src="/icons/BigPencil.svg" alt="연필" />
            </S.PencilIcon>
        </S.QuickLinkCard>
    );
}

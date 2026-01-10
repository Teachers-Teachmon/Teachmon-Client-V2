import * as S from './style';

export default function WelcomeSection() {
    return (
        <S.WelcomeCard bgImage="/assets/mainBg.png">
            <S.WelcomeContent>
                <S.WelcomeTitle>티치몬에 오신 것을 환영합니다.</S.WelcomeTitle>
                <S.WelcomeBottom>
                    <S.WelcomeMessage>오늘은 이석 감독이 있는 날입니다.</S.WelcomeMessage>
                    <S.SupervisionCount>총 감독 횟수: 48회</S.SupervisionCount>
                </S.WelcomeBottom>
            </S.WelcomeContent>
        </S.WelcomeCard>
    );
}

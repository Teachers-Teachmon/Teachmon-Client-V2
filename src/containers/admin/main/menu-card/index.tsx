import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { useDevice } from '@/hooks/useDevice';

import type { MenuCardItem } from '@/constants/adminMenuCards';

type MenuCardProps = {
  items: MenuCardItem[];
};


export default function MenuCard({ items }: MenuCardProps) {
  const navigate = useNavigate();
  const { isMobile } = useDevice();

  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <S.MenuCardGrid>
      {items.map((card) => (
        <S.MenuCard key={card.id} onClick={() => handleClick(card.url)}>
          <S.MenuCardIcon>
            <img src={card.icon} alt={card.title} />
          </S.MenuCardIcon>
          <S.MenuCardBottom>
            <S.MenuCardContent>
              <S.MenuCardTitle>
                {isMobile && card.mobileTitle ? card.mobileTitle : card.title}
              </S.MenuCardTitle>
              <S.MenuCardDescription>
                {isMobile && card.mobileDescription ? card.mobileDescription : card.description}
              </S.MenuCardDescription>
            </S.MenuCardContent>
            <S.MenuCardArrow>
              <img src="/icons/admin/goOut.svg" alt="go" />
            </S.MenuCardArrow>
          </S.MenuCardBottom>
        </S.MenuCard>
      ))}
    </S.MenuCardGrid>
  );
}

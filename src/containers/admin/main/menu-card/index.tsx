import { useNavigate } from 'react-router-dom';
import * as S from './style';

import type { MenuCardItem } from '@/constants/adminMenuCards';

type MenuCardProps = {
  items: MenuCardItem[];
};


export default function MenuCard({ items }: MenuCardProps) {
  const navigate = useNavigate();
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
              <S.MenuCardTitle>{card.title}</S.MenuCardTitle>
              <S.MenuCardDescription>{card.description}</S.MenuCardDescription>
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

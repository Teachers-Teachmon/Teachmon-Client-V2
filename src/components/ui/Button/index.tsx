import * as S from './style';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  // 취소, 확인(저장), 삭제
  variant: 'cancel' | 'confirm' | 'delete';
  width?: string;
  isLoading?: boolean;
}

export default function Button({ text, onClick, variant, width, isLoading = false }: ButtonProps) {
  const handleClick = () => {
    if (isLoading) return;
    onClick?.();
  };

  return (
    <S.Container
      onClick={handleClick}
      $variant={variant}
      $width={width}
      $disabled={isLoading}
    >
      <S.Name>
        {isLoading ? '로딩 중...' : text}
      </S.Name>
    </S.Container>
  );
}
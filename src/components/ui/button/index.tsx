import * as S from './style';

interface ButtonProps {
  text: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // 취소, 확인(저장), 삭제
  variant: 'cancel' | 'confirm' | 'delete';
  width?: string;
  isLoading?: boolean;
}

export default function Button({ text, onClick, variant, width, isLoading = false }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{ all: 'unset', cursor: isLoading ? 'not-allowed' : 'pointer' }}
    >
      <S.Container
        as="div"
        $variant={variant}
        $width={width}
        $disabled={isLoading}
      >
        <S.Name>
          {isLoading ? '로딩 중...' : text}
        </S.Name>
      </S.Container>
    </button>
  );
}
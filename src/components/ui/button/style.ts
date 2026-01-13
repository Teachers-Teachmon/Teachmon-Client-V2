import styled from '@emotion/styled'
import { colors, radius, fontSizes } from '@/styles/theme';

export type ButtonVariant = 'cancel' | 'confirm' | 'delete';

const variantStyle = {
  cancel: {
    bg: colors.n02,
    text: colors.n03,
    border: colors.n02,
  },
  confirm: {
    bg: colors.primary,
    text: colors.background,
    border: colors.primary,
  },
  delete: {
    bg: colors.subcolor,
    text: colors.background,
    border: colors.subcolor,
  },
};

export const Container = styled.button<{
  $variant: keyof typeof variantStyle;
  $width?: string;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ $width }) => $width || 'auto'};
  padding: 8px 16px;
  border-radius: ${radius.md};

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  background-color: ${({ $variant, $disabled }) =>
    $disabled ? '#ccc' : variantStyle[$variant].bg};

  color: ${({ $variant, $disabled }) =>
    $disabled ? '#666' : variantStyle[$variant].text};

  border: 1px solid
    ${({ $variant, $disabled }) =>
      $disabled ? '#ccc' : variantStyle[$variant].border};
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  white-space: nowrap;
`;
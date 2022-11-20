import { css } from 'styled-components';
import media from './media';

const FONT_SIZES = {
  xs: 1.5,
  sm: 1.75,
  regular: 2,
  lg: 2.25,
  xl: 2.5,
  xxl: 3,
  '3xl': 3.75,
};

const FONT_UNIT = 'rem';

export const fontSize = (size: keyof typeof FONT_SIZES = 'regular') =>
  `${FONT_SIZES[size]}${FONT_UNIT}`;

export const fontStyle = {
  CURSIVE: css`
    font-family: 'Dancing Script', cursive;
  `,
  IMPACT: css`
    font-family: 'Roboto Slab', cursive;
  `,
  IMPACT_THIN: css`
    font-family: 'eratolig';
    text-transform: uppercase;
    word-spacing: 2px;

    ${media.medium} {
      letter-spacing: 1px;
    word-spacing: 3px;
  }
  `,
};

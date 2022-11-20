import { css } from 'styled-components';
import { Color, getColor } from '../palette';

const UNDERLINE_BUTTON_ANIMATION = { DURATION: `350ms`, DELAY: `50ms` };

export const underline = (color: Color, additionalTransitions?: string) => css`
  display: block;
  white-space: nowrap;
  background: linear-gradient(
    to bottom,
    ${getColor(color)} 0%,
    ${getColor(color)} 100%
  );
  background-position: 100% 90%;
  background-repeat: repeat-x;
  background-size: 1px 0px;
  transition: color ${UNDERLINE_BUTTON_ANIMATION.DURATION}
      ${UNDERLINE_BUTTON_ANIMATION.DELAY},
    background-size ease-in-out ${UNDERLINE_BUTTON_ANIMATION.DURATION},
    opacity 150ms${additionalTransitions ? `, ${additionalTransitions}` : ''};

  &:hover,
  &:focus {
    background-size: 1px 2px;
  }
`;

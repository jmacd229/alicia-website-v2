import { css } from 'styled-components';
import { Color, getColor } from '../palette';

const WIPE_BUTTON_ANIMATION = { DURATION: `400ms`, DELAY: `100ms` };

export const wipe = (
  fromColor: Color,
  toColor: Color,
  backgroundColor: Color
) => css`
  display: block;
  color: ${getColor(fromColor)};
  white-space: nowrap;
  background: linear-gradient(
    to bottom,
    ${getColor(backgroundColor)} 0%,
    ${getColor(backgroundColor)} 100%
  );
  background-position: 0 0;
  background-repeat: repeat-x;
  background-size: 4px 0px;
  transition: color ${WIPE_BUTTON_ANIMATION.DURATION}
      ${WIPE_BUTTON_ANIMATION.DELAY},
    background-size ease-in-out ${WIPE_BUTTON_ANIMATION.DURATION}, opacity 150ms,
    text-shadow ${WIPE_BUTTON_ANIMATION.DURATION};

  svg * {
    transition: stroke ${WIPE_BUTTON_ANIMATION.DURATION}
      ${WIPE_BUTTON_ANIMATION.DELAY};
  }

  &:hover,
  &:focus {
    color: ${getColor(toColor)};
    background-size: 100% 50px;
    svg * {
      stroke: ${getColor(toColor)};
    }
  }
`;

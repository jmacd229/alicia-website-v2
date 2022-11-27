import styled, { css } from 'styled-components';
import { fontSize, fontStyle } from 'styles/font';
import media from 'styles/media';
import colors from 'styles/palette';
import { DEFAULT_SHADOW } from 'styles/shadows';
import spacing from 'styles/spacing';

const buttonStyle = css`
  border: 2px solid ${colors.white};
  color: ${colors.black};
  background-color: ${colors.blue.a};
  padding: 0 ${spacing(0.5)};
  border-radius: ${spacing(4)};
  ${fontStyle.IMPACT};
  font-size: ${fontSize('sm')};
  ${DEFAULT_SHADOW}
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: ${colors.blue.b};
  }

  ${media.medium} {
    padding: ${spacing(1)} ${spacing(2)};
    font-size: ${fontSize('regular')};
    border-width: 3px;
  }
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;

export const StyledLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})`
  ${buttonStyle}
`;

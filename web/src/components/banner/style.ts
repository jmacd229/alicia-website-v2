import styled, { css } from 'styled-components';
import { fontSize } from 'styles/font';
import media from 'styles/media';
import colors, { rgbColors } from 'styles/palette';
import { DEFAULT_SHADOW } from 'styles/shadows';
import spacing from 'styles/spacing';

const BANNER_HEIGHT = '550px';
const TEXT_CONTENT_PADDING = spacing(4);
const TEXT_BOX_BORDER_RADIUS = spacing(4);

const BORDER_STYLE = (color: string) => css`
  border-top: 12px solid ${color};
  border-bottom: 8px solid ${color};
`;

export const Banner = styled.div`
  flex-direction: column;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${colors.tan.a};
  ${media.medium} {
    ${BORDER_STYLE(colors.tan.b)};
    flex-direction: row;
  }
  ${media.large} {
    height: ${BANNER_HEIGHT};
    flex-direction: row;
    border:none;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  > div {
    height: 100%;
  }

  border: 8px solid ${colors.tan.b};

  ${media.medium} {
    flex: 50%;
    margin-left: ${spacing(3)};
    border-radius: ${spacing(4)};
    > div {
      border-radius: ${spacing(3)};
    }
  }

  ${media.large} {
    height: 100%;
    margin-left: 0;
    border: none;
    border-radius: 0;
    > div {
      border-radius:0;
    }
  }
`;

export const TextBoxContainer = styled.div`
  flex: 50%;
  top: 4vw;
  right: ${spacing(4)};
  display: flex;
  max-width: 700px;
  z-index: 1;
  ${media.large} {
    position: absolute;
    width: 40%;
    ${DEFAULT_SHADOW}
    border-radius: ${spacing(8)};
    ${BORDER_STYLE(`rgba(${rgbColors.tan.c},0.6)`)}
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.tan.a};
  ${media.large} {
    ${BORDER_STYLE(colors.tan.b)}
    border-radius: ${TEXT_BOX_BORDER_RADIUS};
  }
`;

export const Title = styled.h2`
  background-color: ${colors.white};
  text-align: center;
  padding: ${spacing(2)} ${TEXT_CONTENT_PADDING};
  border-radius: ${TEXT_BOX_BORDER_RADIUS};
  margin: ${spacing(3)};
  margin-bottom: 0;
  line-height: ${fontSize('3xl')};
  ${media.large} {
    margin: 0;
    border-top: 8px solid ${colors.tan.a};
    border-bottom: 8px solid ${colors.tan.b};
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const TextBoxContent = styled.div`
  padding: ${spacing(1)} ${TEXT_CONTENT_PADDING};
  font-size: ${fontSize('sm')};
`;

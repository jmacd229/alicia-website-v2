import styled, { css } from 'styled-components';
import colors from 'styles/palette';
import { fontSize, fontStyle } from 'styles/font';
import spacing from 'styles/spacing';
import media from 'styles/media';
import { DEFAULT_SHADOW } from 'styles/shadows';
import zIndex from 'styles/zIndex';
import { underline } from 'styles/animations/underline';
import Button from 'components/shared/Button';

const NAV_HEIGHT = { EXPANDED: `125px`, COLLAPSED: '75px' };
const MOBILE_NAV_HEIGHT = { EXPANDED: `75px`, COLLAPSED: '28px' };

const COLLAPSE_ANIMATION = 'ease-in-out 150ms';
const FLIP_ANIMATION = 'ease-in-out 250ms';

const calculateBackToTopPosition = (isMobile?: boolean) =>
  `calc(calc(-${
    isMobile ? MOBILE_NAV_HEIGHT.COLLAPSED : NAV_HEIGHT.COLLAPSED
  } / 2) - ${spacing(isMobile ? 3 : 2)})`;

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: ${zIndex.NAVIGATION};
`;

export const NavContainer = styled.div<{ collapsed: boolean }>`
  display: grid;
  grid-template-areas: 'logo links';
  grid-template-columns: ${({ collapsed }) => (collapsed ? '15%' : '35%')} auto;
  grid-template-rows: auto;
  align-items: center;
  padding: ${spacing(0.5)};
  top: 0;
  background-color: ${colors.grey.a};
  border-bottom: 2px solid ${colors.blue.b};
  height: ${({ collapsed }) => (collapsed ? '110%' : '100%')};
  ${DEFAULT_SHADOW}
  transition: height ${COLLAPSE_ANIMATION}, padding ${COLLAPSE_ANIMATION};

  ${media.medium} {
    padding: ${({ collapsed }) => spacing(collapsed ? 1 : 2)} ${spacing(4)};
    grid-template-areas: 'logo links socials';
    grid-template-columns: ${({ collapsed }) => (collapsed ? '20%' : '35%')} auto 10%;
  }
`;

export const NavList = styled.div.attrs({ role: 'navigation' })`
  grid-area: links;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  position: relative;
  padding: ${spacing(0.5)} 0;

  ${media.medium} {
    flex-wrap: nowrap;
    padding: 0;
    gap: 5%;
  }
`;

export const NavItem = styled.button<{ collapsed: boolean }>`
  color: ${colors.black};
  font-size: ${({ collapsed }) => fontSize(collapsed ? 'sm' : 'regular')};
  ${fontStyle.IMPACT_THIN};
  padding: ${spacing(0.5)} ${spacing(1)};
  ${underline('jade-a', `font-size ${COLLAPSE_ANIMATION}`)}
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  ${media.medium} {
    font-size: ${({ collapsed }) => fontSize(collapsed ? 'regular' : 'lg')};
  }
`;

export const BackToTopButton = styled.button.attrs<{ collapsed: boolean }>(
  ({ collapsed }) => ({
    disabled: !collapsed,
    'aria-hidden': !collapsed,
  })
)<{ collapsed: boolean }>`
  position: absolute;
  bottom: ${calculateBackToTopPosition(true)};
  ${DEFAULT_SHADOW}
  color: ${colors.white};
  background-color: ${colors.jade.b};
  padding: 0 ${spacing(0.5)};
  z-index: -1;
  span {
    display: none;
  }
  display: flex;
  align-items: center;
  gap: ${spacing()};

  &:hover {
    background-color: ${colors.jade.c};
  }

  ${({ collapsed }) =>
    collapsed
      ? css`
          opacity: 1;
          cursor: pointer;
          transform: perspective(600px) rotateX(0deg);
        `
      : css`
          opacity: 0;
          cursor: auto;
          transform: perspective(600px) rotateX(180deg);
        `}

  ${media.medium} {
    bottom: ${calculateBackToTopPosition()};
    padding: 0 ${spacing(2)};
    span {
      display: block;
    }
  }

  transition: transform ${FLIP_ANIMATION}, opacity ${FLIP_ANIMATION},
    top ${COLLAPSE_ANIMATION}, background-color linear 150ms;
`;

export const ChevronAnimationContainer = styled.div`
  height: 32px;
  width: 32px;
  transform: rotate(180deg);
`;

export const Title = styled.h1<{ collapsed: boolean }>`
  grid-area: logo;
  overflow: hidden;
  height: ${({ collapsed }) =>
    collapsed ? MOBILE_NAV_HEIGHT.COLLAPSED : MOBILE_NAV_HEIGHT.EXPANDED};
  transition: height ${COLLAPSE_ANIMATION};
  > img {
    height: ${({ collapsed }) => (collapsed ? '110%' : '100%')};
    transition: height ${COLLAPSE_ANIMATION};
  }

  ${media.medium} {
    height: ${({ collapsed }) =>
      collapsed ? NAV_HEIGHT.COLLAPSED : NAV_HEIGHT.EXPANDED};
  }
`;

export const Socials = styled.div<{ collapsed: boolean }>`
  grid-area: socials;
  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ collapsed }) => spacing(collapsed ? 0.5 : 1)};
  transition: gap ${COLLAPSE_ANIMATION};
  > a {
    font-size: ${({ collapsed }) => fontSize(collapsed ? 'regular' : 'xxl')};
    text-decoration: none;
    color: ${colors.blue.a};
    transition: color 500ms, font-size ${COLLAPSE_ANIMATION};
    &:hover {
      color: ${colors.blue.c};
    }
  }

  ${media.medium} {
    display: flex;
  }
`;

export const WorkButton = styled(Button)`
  display: flex;
  align-items: center;
  height: 32px;
  margin-left: ${spacing(1)};
  cursor: pointer;
  overflow: hidden;
  transform: translateZ(0); // Fix for Safari
  > span {
    z-index: 1;
  }
  &:hover {
    svg * {
      stroke: #71dedf;
      transition: stroke linear 100ms;
    }
  }

  ${media.medium} {
    height: 48px;
    margin-left: 0;
  }
`;

export const BrainAnimationContainer = styled.div`
  width: 0;
  margin-top: 26%;
  margin-left: -42%;
  > div {
    width: 96px;
  }
`;

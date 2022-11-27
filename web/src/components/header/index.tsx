import React, { useEffect, useRef, useState } from 'react';
import logoImg from '../../images/alicia_naturopathic_doctor_logo.svg';
import lottie, { AnimationItem } from 'lottie-web';
import chevron from '../../animations/chevron.json';
import brain from '../../animations/brain.json';
import {
  NavContainer,
  NavList,
  NavItem,
  BackToTopButton,
  BrainAnimationContainer,
  ChevronAnimationContainer,
  Title,
  Socials,
  HeaderContainer,
  WorkButton,
  Anchor,
} from './style';
import { AnimationConfig } from '../../types/animation';
import { useStaticQuery, graphql } from 'gatsby';

const SCROLL_HEIGHT_FOR_BACK_TO_TOP = 500;

const MATERIAL_ICONS = {
  email: 'email',
  instagram: 'camera_alt',
  facebook: 'facebook',
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

const Header = ({ sections }: { sections: { id: string; link: string }[] }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [animations, setAnimations] = useState<{
    [name: string]: AnimationItem;
  }>();
  const {
    sanityContact: { methods },
  } = useStaticQuery(graphql`
    query headerQuery {
      sanityContact {
        methods {
          sanityId
          label
          title
          url
        }
      }
    }
  `);

  const animationConfigs: { [name: string]: AnimationConfig } = {
    chevron: {
      name: 'chevron',
      container: useRef<HTMLDivElement>(),
      data: chevron,
    },
    brain: {
      name: 'brain',
      container: useRef<HTMLDivElement>(),
      data: brain,
    },
  };

  const workSection = sections.find(section => section.id === 'work');

  useEffect(() => {
    Object.entries(animationConfigs).forEach(([key, animationConfig]) => {
      if (animationConfig.container.current && !animations?.[key]) {
        setAnimations(animations => ({
          ...animations,
          [key]: lottie.loadAnimation({
            name: animationConfig.name,
            container: animationConfig.container.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationConfig.data,
          }),
        }));
      }
    });
    return () =>
      Object.keys(animationConfigs).forEach(animationName =>
        lottie.destroy(animationName)
      );
  }, []);

  useEffect(() => {
    const onScroll = e =>
      setIsNavCollapsed(
        e.target.documentElement.scrollTop > SCROLL_HEIGHT_FOR_BACK_TO_TOP
      );
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function playAnimation(name: string) {
    if (animations[name]?.isPaused) {
      console.log(animations[name]);
      animations[name].play();
      animations[name].resetSegments(true);
    }
  }

  return (
    <>
    <HeaderContainer >
      <NavContainer collapsed={isNavCollapsed}>
        <Title collapsed={isNavCollapsed}>
          <img src={logoImg} alt='Dr. Alicia - Naturopathic Doctor' />
        </Title>
        <NavList>
          {sections
            ?.filter(section => section.id !== 'work')
            .map((section, index) => (
              <NavItem
                key={index}
                onClick={() => scrollToSection(section.id)}
                collapsed={isNavCollapsed}>
                {section.link}
              </NavItem>
            ))}
          {workSection && (
            <WorkButton
              onMouseEnter={() => playAnimation('brain')}
              onFocus={() => playAnimation('brain')}
              onClick={() => scrollToSection(workSection.id)}
              >
              <span>{workSection.link}</span>
              <BrainAnimationContainer>
                <div ref={animationConfigs.brain.container} />
              </BrainAnimationContainer>
            </WorkButton>
          )}
          <BackToTopButton
            collapsed={isNavCollapsed}
            onMouseEnter={() => playAnimation('chevron')}
            onFocus={() => playAnimation('chevron')}
            onClick={scrollToTop}>
            <ChevronAnimationContainer
              ref={animationConfigs.chevron.container}
            />
            <span>Back to top</span>
          </BackToTopButton>
        </NavList>
        <Socials collapsed={isNavCollapsed}>
          {methods
            .filter(method =>
              Object.keys(MATERIAL_ICONS).includes(method.sanityId)
            )
            .map(method => (
              <a
                key={method.sanityId}
                href={method.url}
                aria-label={`${method.title} ${method.label}`}
                target='_blank'
                rel='noreferrer'
                className='material-icons'>
                {MATERIAL_ICONS[method.sanityId]}
              </a>
            ))}
        </Socials>
      </NavContainer>
    </HeaderContainer>
    <Anchor collapsed={isNavCollapsed}/>
    </>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from 'react';
import logoImg from '../../images/alicia_naturopathic_doctor_logo.svg';
import lottie, { AnimationItem } from 'lottie-web';
import chevron from '../../animations/chevron.json';
import {
  NavContainer,
  NavList,
  NavItem,
  BackToTopButton,
  AnimationContainer,
  Title,
  Socials,
  HeaderContainer,
} from './style';
import { AnimationConfig } from '../../types/animation';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
  const [animation, setAnimation] = useState<AnimationItem>();
  const animationConfig: AnimationConfig = {
    name: 'chevron',
    container: useRef<HTMLDivElement>({} as HTMLDivElement),
    data: chevron,
  };

  const {
    sanityContact: { methods },
  } = useStaticQuery(graphql`
    query footerQuery {
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

  useEffect(() => {
    if (animationConfig.container.current) {
      setAnimation(
        lottie.loadAnimation({
          name: animationConfig.name,
          container: animationConfig.container.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: animationConfig.data,
        })
      );
    }
    return () => lottie.destroy(animationConfig.name);
  }, [animationConfig.container, animationConfig.name, animationConfig.data]);

  useEffect(() => {
    const onScroll = e =>
      setIsNavCollapsed(
        e.target.documentElement.scrollTop > SCROLL_HEIGHT_FOR_BACK_TO_TOP
      );
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function playAnimation() {
    if (animation) {
      animation.play();
      animation.resetSegments(true);
    }
  }

  return (
    <HeaderContainer>
      <NavContainer collapsed={isNavCollapsed}>
        <Title collapsed={isNavCollapsed}>
          <img src={logoImg} alt='Dr. Alicia - Naturopathic Doctor' />
        </Title>
        <NavList>
          {sections?.map((section, index) => (
            <NavItem
              key={index}
              onClick={() => scrollToSection(section.id)}
              collapsed={isNavCollapsed}>
              {section.link}
            </NavItem>
          ))}
          <BackToTopButton
            collapsed={isNavCollapsed}
            onMouseEnter={playAnimation}
            onFocus={playAnimation}
            onClick={scrollToTop}>
            <AnimationContainer
              ref={animationConfig.container}/>
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
  );
};

export default Header;

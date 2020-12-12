import PropTypes from 'prop-types';
import React, { createRef, useEffect, useState } from 'react';
import logoImg from '../../images/logo.svg';
import lottie from 'lottie-web';
import chevron from '../../animations/chevron.json';
import './header.scss';
import { Fade } from 'react-bootstrap';

const Header = ({ sections }) => {
  const [scrollTop, setScrollTop] = useState(false);
  const [animation, setAnimation] = useState({
    item: null,
    container: createRef<HTMLDivElement>(),
    data: chevron,
  });

  useEffect(() => {
    if (!animation.item) {
      setAnimation({
        ...animation,
        item: lottie.loadAnimation({
          container: animation.container.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: animation.data,
        }),
      });
    }
    setScrollTop(window.scrollY >= 500);
  }, []);

  useEffect(() => {
    const onScroll = e =>
      setScrollTop(e.target.documentElement.scrollTop >= 500);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  function playAnimation() {
    if (animation.item) {
      animation.item.play();
      animation.item.resetSegments(true);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='header'>
      <header>
        <div className='nav-wrapper'>
          <div className='nav-menu'>
            <div>
            {sections?.map((section, i) => (
                <button
                  className='btn'
                  key={i}
                  onClick={() => scrollToSection(section.id)}>
                {section.link}
              </button>
            ))}
            </div>
          </div>
          <Fade in={scrollTop}>
            <button
            disabled={!scrollTop}
              aria-hidden={!scrollTop}
              className='btn back-to-top'
              onMouseEnter={playAnimation}
              onFocus={playAnimation}
              onClick={scrollToTop}>
              <div className='chevron' ref={animation.container}></div>
              <span>Back to top</span>
            </button>
          </Fade>
        </div>
        <h1>
          <img src={logoImg} alt='Alicia MacDougall' />
        </h1>
        <div className='triangle light'></div>
      </header>
      <div className='d-flex justify-content-center'>
        <div className='triangle'></div>
      </div>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

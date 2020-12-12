import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import virtual from '../../animations/virtual.json';
import book from '../../animations/book.json';
import lottie, { AnimationItem } from 'lottie-web';
import './work.scss';

const Work = () => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      allSanityWork {
        edges {
          node {
            title
            _rawBody
            bookVisible
            bookLink {
              text
              url
            }
            virtualVisible
            virtualLink {
              text
              url
            }
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `).allSanityWork.edges[0].node;
  const animations = {
    book: { item: null, container: createRef<HTMLDivElement>(), data: book },
    virtual: {
      item: null,
      container: createRef<HTMLDivElement>(),
      data: virtual,
    },
  };

  useEffect(() => {
    Object.values(animations).forEach(animation => {
      animation.item = lottie.loadAnimation({
        container: animation.container.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animation.data,
      });
      animation.item.setDirection(-1);
      animation.item.setSpeed(0.75);
    });
  }, []);

  function playBookAnimation() {
    playAnimation('book');
  }
  function playVirtualAnimation() {
    playAnimation('virtual');
  }

  function playAnimation(id) {
    const anim: AnimationItem = animations[id]?.item;
    if (anim) {
      anim.play();
      anim.setDirection(anim.playDirection === -1 ? 1 : -1);
    }
  }

  return (
    <div id='work' className='work'>
      <div className='main'>
        <div className='left'></div>
        <div className='caption'>
          <h2>{data.title}</h2>
          <div className='caption-body'>
            <BlockContent blocks={data._rawBody}></BlockContent>
            <div className='d-flex flex-column align-items-center'>
              {data.bookVisible ? (
                <a
                  onMouseEnter={playBookAnimation}
                  onMouseLeave={playBookAnimation}
                  onFocus={playBookAnimation}
                  onBlur={playBookAnimation}
                  className='booking mb-3'
                  href={data.bookLink.url}
                  target="_blank"
                  rel="noreferrer">
                  <div className='mr-2' ref={animations.book.container}></div>
                  {data.bookLink.text}
                </a>
              ) : null}
              {data.virtualVisible ? (
                <a
                  onMouseEnter={playVirtualAnimation}
                  onMouseLeave={playVirtualAnimation}
                  onFocus={playVirtualAnimation}
                  onBlur={playVirtualAnimation}
                  className='booking'
                  href={data.virtualLink.url}
                  target="_blank"
                  rel="noreferrer">
                  {data.virtualLink.text}
                  <div
                    className='ml-2'
                    ref={animations.virtual.container}></div>
                </a>
              ) : null}
            </div>
          </div>
          <div className='line'></div>
        </div>
        <div className='img-container'>
          <div className='img-bg'></div>
          <img src={data.image.asset.url} alt='' role='presentation' />
        </div>
      </div>
    </div>
  );
};

export default Work;

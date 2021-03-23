import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import virtual from '../../animations/virtual.json';
import lottie, { AnimationItem } from 'lottie-web';
import Img from 'gatsby-image';
import './work.scss';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { Weekdays } from '../../models/weekdays.enum';

const Work = () => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      sanityWork {
        title
        _rawBody
        bookLink {
          location {
            sanityId
            title
            days
          }
          url
        }
        virtualVisible
        virtualLink {
          text
          url
        }
        image {
          asset {
            fluid(maxHeight: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  `).sanityWork;
  const animations = {
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

  function getDays(days: Array<string>) {
    return days.map((day, i) => {
      return (
        <div className="text-center" key={i}>
          {i !== 0 && i === days.length - 1 ? (
            <div className='and'>&</div>
          ) : null}
          <div key={day}>{Weekdays[day]}s</div>
          </div>
      );
    });
  }

  return (
    <div id='work' className='work'>
      <div className='main'>
        <div
          className='left'
          data-sal='slide-right'
          data-sal-duration='500'></div>
        <div
          className='caption'
          data-sal='zoom-out'
          data-sal-duration='1000'
          data-sal-delay='200'>
          <h3 className='mt-2'>{data.title}</h3>
          <div className='sanity-body'>
            <BlockContent blocks={data._rawBody}></BlockContent>
            <div className='d-flex flex-column h-100 justify-content-center my-3 my-sm-5'>
              {data.virtualVisible ? (
                <OutboundLink
                  onMouseEnter={playVirtualAnimation}
                  onMouseLeave={playVirtualAnimation}
                  onFocus={playVirtualAnimation}
                  onBlur={playVirtualAnimation}
                  className='booking'
                  href={data.virtualLink.url}
                  target='_blank'
                  rel='noreferrer'>
                  {data.virtualLink.text}
                  <div
                    className='ml-2'
                    ref={animations.virtual.container}></div>
                </OutboundLink>
              ) : null}
              {data.bookLink.map(booking => {
                return (
                  <div
                    className='in-person-booking'
                    key={booking.location.sanityId}>
                    <OutboundLink
                      className='booking'
                      href={booking.url}
                      target='_blank'
                      rel='noreferrer'>
                      {booking.location.title}
                    </OutboundLink>
                    <div className='days'>{getDays(booking.location.days)}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='line'></div>
        </div>
        <div
          className='img-container'
          data-sal='slide-left'
          data-sal-duration='500'
          data-sal-delay='100'>
          <div className='img-bg'></div>
          <Img fluid={data.image.asset.fluid} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Work;

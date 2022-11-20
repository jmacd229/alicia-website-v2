import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import virtual from '../../animations/virtual.json';
import lottie, { AnimationItem } from 'lottie-web';
import './work.scss';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { Weekdays, ShortWeekdays } from '../../types/weekdays.enum';
import { GatsbyImage } from 'gatsby-plugin-image';

const Work = () => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      sanityWork {
        title
        _rawBody
        bookLink {
          location {
            id
            title
            days
            daysVirtual
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
            gatsbyImageData(height: 500, placeholder: BLURRED)
          }
        }
      }
    }
  `).sanityWork;
  const animations = [
    {
      name: 'virtual',
      item: null,
      container: createRef<HTMLDivElement>(),
      data: virtual,
    },
  ];

  useEffect(() => {
    animations.forEach(animation => {
      animation.item = lottie.loadAnimation({
        name: animation.name,
        container: animation.container.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animation.data,
      });
      animation.item.setDirection(-1);
      animation.item.setSpeed(0.75);
    });
    return () =>
      animations.forEach(animation => lottie.destroy(animation.name));
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

  function getDays(location) {
    const days = location.days
      .map(day => ({ text: day, virtual: false }))
      .concat(location.daysVirtual.map(day => ({ text: day, virtual: true })));
    return days.map((day, i) => {
      return (
        <div className='text-center' key={i}>
          {i !== 0 && i === days.length - 1 ? (
            <div className='and'>&</div>
          ) : null}
          <div className="text-nowrap">
          {day.virtual ? ShortWeekdays[day.text] : Weekdays[day.text] + 's'}
          {day.virtual && <span className='virtual'> virtually</span>}
          </div>
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
                  <div className='ml-2' ref={animations[0].container}></div>
                </OutboundLink>
              ) : null}
              {data.bookLink.map(booking => (
                <div
                  className='in-person-booking'
                  key={booking.location.id}>
                  <OutboundLink
                    className='booking'
                    href={booking.url}
                    target='_blank'
                    rel='noreferrer'>
                    {booking.location.title}
                  </OutboundLink>
                  {booking.location.days && (
                    <div className='days'>{getDays(booking.location)}</div>
                  )}
                </div>
              ))}
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
          <GatsbyImage image={data.image.asset.gatsbyImageData} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Work;

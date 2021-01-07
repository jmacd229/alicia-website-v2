import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, RefObject, useEffect } from 'react';
import './contact.scss';
import lottie, { AnimationItem } from 'lottie-web';
import email from '../../animations/email.json';
import phone from '../../animations/phone.json';
import location1 from '../../animations/location-1.json';
import location2 from '../../animations/location-2.json';
import facebook from '../../animations/facebook.json';
import instagram from '../../animations/instagram.json';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { Weekdays } from '../../models/weekdays.enum';

class Animation {
  constructor(data) {
    this.data = data;
    this.container = createRef<HTMLDivElement>();
  }
  container: RefObject<HTMLDivElement>;
  data: any;
  item = null;
}

interface Method {
  sanityId: string;
  label: string[];
  title: string;
  url: string;
  visible: boolean;
}

function getMethodFontSizes(id: string, isLabel = true) {
  switch (id) {
    case 'email':
      if (isLabel) {
        return 'clamp(1.1rem, 1.8vw, 1.25rem)';
      }
      break;
    case 'location1':
      if (isLabel) {
        return 'clamp(1.2rem, 2vw, 1.25rem)';
      } else {
        return '32px';
      }
    case 'location2':
      if (isLabel) {
        return 'clamp(1.2rem, 2vw, 1.25rem)';
      }
      break;
    default:
      if (isLabel) {
        return 'clamp(1.2rem, 2vw, 1.5rem)';
      } else {
        return '48px';
      }
  }
}

const Contact = () => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      sanityContact {
        title {
          regular
          cursive
        }
        methods {
          sanityId
          label
          title
          url
          visible
        }
        locations {
          sanityId
          title
          label
          url
          days
        }
      }
    }
  `).sanityContact;
  const animations = {
    email: new Animation(email),
    phone: new Animation(phone),
    location1: new Animation(location1),
    location2: new Animation(location2),
    facebook: new Animation(facebook),
    instagram: new Animation(instagram),
  };

  function createMethod(method: Method) {
    return (
      <div data-sal='zoom-in' data-sal-duration='1000' key={method.sanityId}>
        <OutboundLink
          onMouseEnter={() => playAnimation(method.sanityId)}
          onFocus={() => playAnimation(method.sanityId)}
          href={method.url}
          target='_blank'
          rel='noreferrer'>
          <div>
            <div
              className='icon'
              ref={animations[method.sanityId]?.container}></div>
            {getLabel(method)}
          </div>
          <div
            className='title'
            style={{ fontSize: getMethodFontSizes(method.sanityId, false) }}>
            {method.title}
          </div>
        </OutboundLink>
        {getHours(method)}
      </div>
    );
  }

  function getHours(method) {
    if (method.days) {
      return (
        <div
          className='hours'
          role='list'
          aria-label={`Days available at ${method.title}`}>
          {Object.entries(Weekdays).map(([key, value]) => {
            if (method.days.includes(key)) {
              return (
                <Tooltip key={key} overlay={value}>
                  <div
                    tabIndex={0}
                    role='listitem'
                    aria-disabled={false}
                    className='day'
                    aria-label={value}>
                    {value.charAt(0)}
                  </div>
                </Tooltip>
              );
            } else {
              return (
                <div
                  role='listitem'
                  aria-disabled={true}
                  className='day'
                  aria-label={value}
                  key={key}>
                  {value.charAt(0)}
                </div>
              );
            }
          })}
        </div>
      );
    }
  }

  function getLabel(method) {
    if (method.label instanceof Array) {
      return method.label.map((label, i) => (
        <span key={i} style={{ fontSize: getMethodFontSizes(method.sanityId) }}>
          {label}
        </span>
      ));
    } else {
      return (
        <span style={{ fontSize: getMethodFontSizes(method.sanityId) }}>
          {method.label}
        </span>
      );
    }
  }

  useEffect(() => {
    Object.values(animations).forEach(animation => {
      animation.item = lottie.loadAnimation({
        container: animation.container.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animation.data,
      });
      animation.item.setDirection(1);
      animation.item.setSpeed(0.75);
    });
  }, []);

  function playAnimation(id) {
    const anim: AnimationItem = animations[id]?.item;
    if (anim) {
      anim.play();
      anim.resetSegments(true);
    }
  }

  return (
    <div id='contact' className='contact'>
      <div className='main'>
        <div className='title-card order-2'>
          <h3 className='mixed-font-title'>
            <span>{data.title.regular}</span>
            <span className='cursive'>{data.title.cursive}</span>
          </h3>
        </div>
        <div className='methods-container'>
          <div className='methods'>
            {data.methods
              .filter(method => method.visible)
              .map(method => createMethod(method))}
          </div>
          <div className='methods locations'>
            {data.locations.map(location => createMethod(location))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

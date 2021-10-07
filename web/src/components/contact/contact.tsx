import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, RefObject, useEffect } from 'react';
import './contact.scss';
import lottie, { AnimationItem } from 'lottie-web';
import email from '../../animations/email.json';
import phone from '../../animations/phone.json';
import location1 from '../../animations/location-1.json';
import facebook from '../../animations/facebook.json';
import instagram from '../../animations/instagram.json';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { Weekdays } from '../../models/weekdays.enum';

class Animation {
  constructor(data, name) {
    this.data = data;
    this.container = createRef<HTMLDivElement>();
    this.name = name;
  }
  container: RefObject<HTMLDivElement>;
  data: any;
  name: string;
  item = null;
}

interface Method {
  id: string;
  sanityId: string;
  label: string[];
  title: string;
  url: string;
  visible: boolean;
}

function getMethodFontSizes(text: string, isLabel = true, isLocation = false) {
  const textLength = text.length;
  if (isLabel) {
    let fontSize = 1.25;
    if (textLength < 15) {
      fontSize = 2;
    } else if (textLength < 27) {
      fontSize = 1.5;
    }
    if (isLocation) {
      fontSize -= 0.5;
    }
    return `${fontSize}rem`;
  } else {
    let fontSize = 2;
    if (textLength < 6) {
      fontSize = 4;
    } else if (textLength < 20) {
      fontSize = 3;
    } else if (textLength < 25) {
      fontSize = 2.5;
    }
    return `${fontSize}rem`;
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
          id
          title
          label
          url
          days
          daysVirtual
        }
      }
    }
  `).sanityContact;

  const animations = {
    email: new Animation(email, 'email'),
    phone: new Animation(phone, 'phone'),
    facebook: new Animation(facebook, 'facebook'),
    instagram: new Animation(instagram, 'instagram'),
  };
  data.locations.forEach(
    location =>
      (animations[location.id] = new Animation(location1, location.id))
  );

  function createMethod(method: Method, isLocation = false) {
    const id = isLocation ? method.id : method.sanityId;
    return (
      <div data-sal='zoom-in' data-sal-duration='1000' key={method.title}>
        <OutboundLink
          onMouseEnter={() => playAnimation(id)}
          onFocus={() => playAnimation(id)}
          href={method.url}
          target='_blank'
          rel='noreferrer'>
          <div>
            <div className='icon' ref={animations[id]?.container}></div>
            {getLabel(method)}
          </div>
          <div
            className='title'
            style={{ fontSize: getMethodFontSizes(method.title, false) }}>
            {method.title}
          </div>
        </OutboundLink>
        {getHours(method)}
      </div>
    );
  }

  function getHours(method) {
    if (method.days) {
      const days = method.days
        .map(day => ({ text: day, virtual: false }))
        .concat(method.daysVirtual.map(day => ({ text: day, virtual: true })));
      return (
        <div
          className='hours'
          role='list'
          aria-label={`Days available at ${method.title}`}>
          {Object.entries(Weekdays).map(([key, value]) => {
            const day = days.find(day => day.text === key);
            if (day) {
              return (
                <Tooltip key={key} overlay={value + (day.virtual ? " Virtual" : '')}>
                  <div
                    tabIndex={0}
                    role='listitem'
                    aria-disabled={false}
                    className={'day' + (day.virtual ? " virtually" : '')}
                    aria-label={value + (day.virtual ? " Virtual" : '')}>
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
        <span
          key={i}
          style={{ fontSize: getMethodFontSizes(method.label, true, true) }}>
          {label}
        </span>
      ));
    } else {
      return (
        <span style={{ fontSize: getMethodFontSizes(method.label, true) }}>
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
        name: animation.name,
      });
      animation.item.setDirection(1);
      animation.item.setSpeed(0.75);
    });
    return () =>
      Object.values(animations).forEach(animation =>
        lottie.destroy(animation.name)
      );
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
            {data.locations.map(location => createMethod(location, true))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

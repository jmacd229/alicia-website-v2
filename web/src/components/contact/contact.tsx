import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, RefObject, useEffect } from 'react';
import './contact.scss';
import lottie, { AnimationItem } from 'lottie-web';
import email from '../../animations/email.json';
import phone from '../../animations/phone.json';
import location from '../../animations/location.json';
import facebook from '../../animations/facebook.json';
import instagram from '../../animations/instagram.json';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
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
  id: string;
  label: string[];
  title: string;
  url: string;
  visible: boolean;
}

function getMethodFontSizes(id: string) {
  switch (id) {
    case 'email':
      return 'clamp(0.9rem, 1.7vw, 1.25rem)';
    case 'location':
      return 'clamp(0.9rem, 1.8vw, 1rem)';
    default:
      return 'clamp(0.9rem, 2vw, 1.5rem)';
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
          id
          label
          title
          url
          visible
        }
      }
    }
  `).sanityContact;
  const animations = {
    email: new Animation(email),
    phone: new Animation(phone),
    location: new Animation(location),
    facebook: new Animation(facebook),
    instagram: new Animation(instagram),
  };

  function createMethod(method: Method) {
    return (
      <div key={method.id} data-sal='zoom-in' data-sal-duration='1000'>
        <OutboundLink
          onMouseEnter={() => playAnimation(method.id)}
          onFocus={() => playAnimation(method.id)}
          href={method.url}
          target='_blank'
          rel='noreferrer'>
          <div>
            <div className='icon' ref={animations[method.id]?.container}></div>
            {method.label.map((label, i) => (
              <span key={i} style={{ fontSize: getMethodFontSizes(method.id) }}>
                {label}
              </span>
            ))}
          </div>
          <div className='title'>{method.title}</div>
        </OutboundLink>
      </div>
    );
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
        <div className='methods order-1'>
          {data.methods
            .filter(method => method.visible)
            .map(method => createMethod(method))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, RefObject, useEffect } from 'react';
import './contact.scss';
import lottie, { AnimationItem, AnimationDirection } from 'lottie-web';
import email from '../../animations/email.json';
import phone from '../../animations/phone.json';
import location from '../../animations/location.json';
import facebook from '../../animations/facebook.json';
import instagram from '../../animations/instagram.json';
import { Container } from 'react-bootstrap';

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

const Contact = () => {
    const data = useStaticQuery(graphql`
    query ContactQuery {
        allSanityContact {
          edges {
            node {
              title
              methods {
                id
                label
                title
                url
                visible
              }
            }
          }
        }
      }
  `).allSanityContact.edges[0].node;
  const animations = {
    email: new Animation(email),
    phone: new Animation(phone),
    location: new Animation(location),
    facebook: new Animation(facebook),
    instagram: new Animation(instagram),
  };

  function createMethod(method: Method) {
    return (
      <div
      key={method.id}
        onMouseEnter={() => playAnimation(method.id)}
        onFocus={() => playAnimation(method.id)}>
        <div>
          <div className='icon' ref={animations[method.id]?.container}></div>
          {method.label.map((label,i) => <strong key={i}>{label}</strong>)}
        </div>
        <div className='title'>{method.title}</div>
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
    <div className='contact'>
      <div className='main'>
        <div className='title-card'>
          <h3 className='mixed-font-title'>
            <span>{data.title.substr(0, data.title.lastIndexOf(' '))}</span>
            <span className='cursive'>{data.title.substr(data.title.lastIndexOf(' '))}</span>
          </h3>
        </div>
        <div className='methods'>
            {data.methods.map(method => method.visible ? createMethod(method) : null)}
        </div>
      </div>
    </div>
  );
};

export default Contact;

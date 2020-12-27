import React from 'react';
import './footer.scss';
import packageJson from '../../../package.json';
import logoImg from '../../images/logo.svg';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { graphql, useStaticQuery } from 'gatsby';

const Footer = () => {
  const contactMethods = useStaticQuery(graphql`
    query footerQuery {
      allSanityContact {
        edges {
          node {
            methods {
              id
              label
              title
              url
            }
          }
        }
      }
    }
  `).allSanityContact.edges[0].node.methods;

  const materialIcons = {
    email: 'email',
    instagram: 'camera_alt',
    facebook: 'facebook',
  };

  return (
    <footer className='footer flex-md-row'>
      <img
        className='title mr-5'
        src={logoImg}
        alt='Dr. Alicia MacDougall, Naturopathic Doctor'
      />
      <div className='mt-md-0'>
        <span>
          A website built by{' '}
          <OutboundLink
            href='https://www.jessemacdougall.ca'
            target='_blank'
            rel='noreferrer'>
            Jesse MacDougall
          </OutboundLink>
          .
        </span>
        <span>
          Last Updated: {new Date(packageJson.releaseDate).toDateString()}
        </span>
        <span>V{packageJson.version}</span>
      </div>
      <div className='socials flex-md-column mt-md-0'>
        {contactMethods.filter((method) => Object.keys(materialIcons).includes(method.id)).map(method => (
          <a
            key={method.id}
            href={method.url}
            aria-label={`${method.title} ${method.label}`}
            target='_blank'
            rel='noreferrer'
            className='material-icons'>
            {materialIcons[method.id]}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

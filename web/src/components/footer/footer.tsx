import React, { useEffect } from 'react';
import './footer.scss';
import packageJson from '../../../package.json';
import logoImg from '../../images/alicia_macdougall_naturopathic_doctor_logo.svg';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { graphql, useStaticQuery } from 'gatsby';
import Swal from 'sweetalert2';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query footerQuery {
      sanityContact {
        methods {
          sanityId
          label
          title
          url
        }
      }
      sanityPrivacy {
        body
      }
    }
  `);
  const contactMethods = data.sanityContact.methods;
  const privacy = data.sanityPrivacy.body;

  const materialIcons = {
    email: 'email',
    instagram: 'camera_alt',
    facebook: 'facebook',
  };

  const date = packageJson.releaseDate.split('-');

  return (
    <footer className='footer flex-md-row'>
      <img
        className='title mr-5'
        src={logoImg}
        alt='Dr. Alicia MacDougall - Naturopathic Doctor'
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
          Last Updated:{' '}
          {new Date(
            parseInt(date[0]),
            parseInt(date[1]) - 1,
            parseInt(date[2])
          ).toDateString()}
        </span>
        <span>V{packageJson.version}</span>
        <button
          className='btn privacy'
          onClick={() =>
            Swal.fire({
              title: 'Privacy Policy',
              html: privacy.replace(/\n/g, '<br>'),
              icon: 'info',
              width: '64rem',
              customClass: {
                htmlContainer: 'privacy-modal',
                confirmButton: 'privacy-btn',
                icon: 'privacy-icon',
              },
            })
          }>
          Privacy Policy
        </button>
      </div>
      <div className='socials flex-md-column mt-md-0'>
        {contactMethods
          .filter(method =>
            Object.keys(materialIcons).includes(method.sanityId)
          )
          .map(method => (
            <OutboundLink
              key={method.sanityId}
              href={method.url}
              aria-label={`${method.title} ${method.label}`}
              target='_blank'
              rel='noreferrer'
              className='material-icons'>
              {materialIcons[method.sanityId]}
            </OutboundLink>
          ))}
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './footer.scss';
import packageJson from '../../../package.json';


const Footer = () => {

  return (
    <footer className='footer'>
      <span>A website built by <a href="https://www.jessemacdougall.ca" target="_blank" rel="noreferrer">Jesse MacDougall</a>.</span>
      <span> Last Updated: { new Date(packageJson.releaseDate).toDateString()}</span>
      <span>V{packageJson.version}</span>
    </footer>
  );
};

export default Footer;

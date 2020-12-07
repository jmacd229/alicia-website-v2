import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/global.scss';
import CarouselContainer from '../components/carousel/carousel';
import AboutMe from '../components/about-me/about-me';
import Work from '../components/work/work';
import Resources from '../components/resources/resources';
import Contact from '../components/contact/contact';

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <CarouselContainer />
    <AboutMe />
    <Work/>
    <Resources/>
    <Contact/>
  </Layout>
);

export default IndexPage;

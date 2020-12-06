import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/global.scss';
import CarouselContainer from '../components/carousel/carousel';
import AboutMe from '../components/about-me/about-me';
import Work from '../components/work/work';

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <CarouselContainer />
    <AboutMe />
    <Work/>
  </Layout>
);

export default IndexPage;

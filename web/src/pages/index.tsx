import React, { useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/global.scss';
import Banner from '../components/banner';
import AboutMe from '../components/about-me/about-me';
import Work from '../components/work/work';
import Resources from '../components/resources/resources';
import Contact from '../components/contact/contact';
import { graphql, useStaticQuery } from 'gatsby';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  query PageQuery {
    allSanityCarousel {
      edges {
        node {
          visible
        }
      }
    }
    allSanityAboutMe {
      edges {
        node {
          visible
        }
      }
    }
      allSanityWork {
      edges {
        node {
          visible
        }
      }
    }
    allSanityResources {
      edges {
        node {
          visible
        }
      }
    }
      allSanityContact {
      edges {
        node {
          visible
        }
      }
    }
  }
  
  `);

  const sections = [
    {visible: data.allSanityAboutMe.edges[0].node.visible, element: <AboutMe key={0}/>, link: "About Me", id: "about"},
    {visible: data.allSanityWork.edges[0].node.visible, element: <Work key={1}/>, link: "Work with Me", id: "work"},
    {visible: data.allSanityResources.edges[0].node.visible, element: <Resources key={2}/>, link: "Free Resources", id: "resources"},
    {visible: data.allSanityContact.edges[0].node.visible, element: <Contact key={3}/>, link: "Contact Me", id: "contact"}
  ];



  return (<Layout sections = {sections?.filter(section => section.visible)}>
    <SEO title='Home' />
    <Banner />
    {sections?.map((section, i) => {
      if(section.visible){
        return section.element;
      }
    })}
  </Layout>);
};

export default IndexPage;

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import './about-me.scss';
import Img from 'gatsby-image';

const AboutMe = () => {
  const data = useStaticQuery(graphql`
  query AboutMeQuery {
    allSanityAboutMe {
      edges {
        node {
          _rawBody
          title {
            regular
            cursive
          }
          image {
            alt
            asset {
              fluid(maxWidth: 350) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
  `).allSanityAboutMe.edges[0].node;

  return (
    <div id="about" className='about-me'>
      <div className='main'>
        <h3 className='mixed-font-title' data-sal="fade" data-sal-duration="500">
          <div>{data.title.regular}</div>
          <div className='cursive'>
            {data.title.cursive}
          </div>
          <div>.</div>
        </h3>
        <div className='d-flex justify-content-center'>
          <div className='d-flex flex-column flex-md-row align-items-center'>
            <div data-sal="fade" data-sal-duration="500">
            <BlockContent className='body px-3 px-md-5'
              blocks={data._rawBody}></BlockContent>
              </div>
              <div data-sal="zoom-in" data-sal-duration="500">
            <Img
              className='profile'
              fluid={data.image.asset.fluid}
              alt={data.image.alt}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

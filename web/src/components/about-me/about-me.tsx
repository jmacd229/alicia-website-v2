import BlockContent from '@sanity/block-content-to-react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import './about-me.scss';

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      sanityAboutMe {
        _rawBody
        title {
          regular
          cursive
        }
        image {
          alt
          asset {
            gatsbyImageData(width: 350, placeholder: BLURRED)
          }
        }
      }
    }
  `).sanityAboutMe;

  return (
    <div id='about' className='about-me'>
      <div className='main'>
        <h3
          className='mixed-font-title'
          data-sal='fade'
          data-sal-duration='500'>
          <div>{data.title.regular}</div>
          <div className='cursive'>{data.title.cursive}</div>
          <div>.</div>
        </h3>
        <div className='d-flex justify-content-center'>
          <div className='d-flex flex-column flex-md-row align-items-center'>
            <div data-sal='fade' data-sal-duration='500'>
              <BlockContent
                className='body px-4 px-md-5'
                blocks={data._rawBody}></BlockContent>
            </div>
            <div data-sal='zoom-in' data-sal-duration='500'>
              <GatsbyImage
                image={data.image.asset.gatsbyImageData}
                alt={data.image.alt}
                className='profile'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

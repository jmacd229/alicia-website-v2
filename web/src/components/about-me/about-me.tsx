import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import './about-me.scss';

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      allSanityAboutMe {
        edges {
          node {
            _rawBody
            title
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `).allSanityAboutMe.edges[0].node;

  return (
    <div className='about-me'>
      <div className='main'>
        <h3 className='mixed-font-title row no-gutters'>
          <div>{data.title.substr(0, data.title.lastIndexOf(' '))}</div>
          <div className='cursive'>
            {data.title.substr(data.title.lastIndexOf(' '))}
          </div>
          <div>.</div>
        </h3>
        <div className='row no-gutters justify-content-center'>
          <div className='col-lg-3 col-xl-4'></div>
            <BlockContent
              className='col-12 col-lg-6 col-xl-4 body'
              blocks={data._rawBody}></BlockContent>
          <div className='d-flex col-lg-3 col-xl-4 justify-content-center justify-content-lg-start'>
            <img
              className='profile'
              src={data.image.asset.url}
              alt={data.image.alt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

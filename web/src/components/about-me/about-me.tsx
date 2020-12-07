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
        <h3 className='mixed-font-title'>
          <div>{data.title.substr(0, data.title.lastIndexOf(' '))}</div>
          <div className='cursive'>
            {data.title.substr(data.title.lastIndexOf(' '))}
          </div>
          <div>.</div>
        </h3>
        <div className='d-flex justify-content-center'>
          <div className='d-flex flex-column flex-md-row align-items-center'>
            <BlockContent className='body px-3 px-md-5'
              blocks={data._rawBody}></BlockContent>
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

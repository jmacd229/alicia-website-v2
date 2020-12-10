import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import './work.scss';

const Work = () => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      allSanityWork {
        edges {
          node {
            title
            _rawBody
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `).allSanityWork.edges[0].node;

  return (
    <div id="work" className='work'>
      <div className='main'>
        <div className='left'></div>
        <div className='caption'>
          <h2>{data.title}</h2>
          <BlockContent blocks={data._rawBody}></BlockContent>
          <div className='line'></div>
        </div>
        <div className='img-container'>
        <div className='img-bg'></div>
        <img src={data.image.asset.url} alt='' role='presentation' />
        </div>
      </div>
    </div>
  );
};

export default Work;

import BlockContent from '@sanity/block-content-to-react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import './banner.scss';

const BannerContainer = () => {
  const [yOffset, setYOffset] = useState(0);
  const data = useStaticQuery(graphql`
    query BannerQuery {
      sanityBanner {
        subtitle
        title
        _rawBody
        image {
          alt
          asset {
            gatsbyImageData(height: 700, placeholder: BLURRED)
          }
        }
      }
    }
  `).sanityBanner;

  useEffect(() => {
    const onScroll = e => setYOffset(e.target.documentElement.scrollTop);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [yOffset]);

  return (
    <div className='banner'>
      <div className='img-container' style={{ top: `-${yOffset / 2}px` }}>
        <GatsbyImage
          image={data.image.asset.gatsbyImageData}
          alt={data.image.alt}
          style={{ display: 'block', width: '100%' }}
        />
      </div>
      <div className='front'>
        <div>
          <div data-sal='fade' data-sal-duration='1000'>
            <h2>{data.title}</h2>
          </div>
          <div className='sanity-body' data-sal='fade' data-sal-duration='1000'>
            <BlockContent blocks={data._rawBody}></BlockContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;

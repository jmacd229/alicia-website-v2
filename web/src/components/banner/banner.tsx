import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import './banner.scss';
import BlockContent from '@sanity/block-content-to-react';
import Img from 'gatsby-image';

const BannerContainer = () => {
  const [yOffset, setYOffset] = useState(0);
  const data = useStaticQuery(graphql`
    query MyQuery {
      allSanityCarousel(limit: 1) {
        edges {
          node {
            subtitle
            title
            _rawBody
            slides {
              alt
              asset {
                fluid(maxHeight: 700) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
  `).allSanityCarousel.edges[0].node;

  useEffect(() => {
    const onScroll = e =>setYOffset(e.target.documentElement.scrollTop);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [yOffset]);

  return (
    <div className='banner'>
      <div className='img-container' style={{top: `-${yOffset/2}px` }}>
        <Img
          fluid={data.slides[0].asset.fluid}
          alt={data.slides[0].alt}
          style={{ display: 'block', width: '100%' }}
        />
      </div>
      <div className='front'>
        <div>
          <div data-sal='fade' data-sal-duration='1000'>
          <h2>
            {data.title}
          </h2>
          <h3 className="cursive">
            {data.subtitle}
          </h3>
          </div>
          <div className="body" data-sal='fade' data-sal-duration='1000'>
            <BlockContent blocks={data._rawBody}></BlockContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;

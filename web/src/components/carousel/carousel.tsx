import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.scss';
import BlockContent from '@sanity/block-content-to-react';
import Img from 'gatsby-image'

const CarouselContainer = () => {
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
              fluid(maxWidth: 990) {
          ...GatsbySanityImageFluid
        }
            }
          }
        }
      }
    }
  }
  `).allSanityCarousel.edges[0].node;

  return (
    <div className='carousel'>
      <div className='main row no-gutters'>
        <div className='col-12 col-lg-7'>
          <Carousel controls={false} indicators={false}>
            {data.slides.map((slide, i) => (
              <Carousel.Item key={i}>
                <Img
                  fluid={slide.asset.fluid}
                  alt={slide.alt}
                  style={{ display: 'block', width: '100%' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className='col-12 col-lg-5 flex-shrink-1'>
          <h2 className="mb-0 d-flex justify-content-center">{data.title}</h2>
          <h3>{data.subtitle}</h3>
          <BlockContent blocks={data._rawBody}></BlockContent>
        </div>
      </div>
      <div className='separator'></div>
    </div>
  );
};

export default CarouselContainer;

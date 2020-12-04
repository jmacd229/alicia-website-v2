import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.scss';

const CarouselContainer = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allSanityCarousel(limit: 1) {
        edges {
          node {
            subtitle
            title
            body
            slides {
              alt
              asset {
                url
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
        <div className='col-12 col-lg-8'>
          <Carousel>
            {data.slides.map((slide, i) => (
              <Carousel.Item key={i}>
                <img
                  src={slide.asset.url}
                  alt={slide.alt}
                  style={{ display: 'block', width: '100%' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className='col-12 col-lg-4 flex-shrink-1'>
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
          <p>{data.body}</p>
        </div>
      </div>
      <div className='separator'></div>
    </div>
  );
};

export default CarouselContainer;

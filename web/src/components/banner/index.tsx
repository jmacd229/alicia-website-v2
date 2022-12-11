import BlockContent from '@sanity/block-content-to-react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import {
  Banner,
  ImageContainer,
  TextBox,
  TextBoxContainer,
  TextBoxContent,
  Title,
} from './style';

const BannerContainer = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      sanityCarousel {
        subtitle
        title
        _rawBody
        slides {
          alt
          asset {
            gatsbyImageData(height: 700, placeholder: BLURRED)
          }
        }
      }
    }
  `).sanityCarousel;

  return (
    <Banner>
      <ImageContainer data-sal='fade' data-sal-duration='1000'>
        <GatsbyImage
          image={data.slides[0].asset.gatsbyImageData}
          alt={data.slides[0].alt}
          style={{ display: 'block', width: '100%' }}
        />
      </ImageContainer>
      <TextBoxContainer data-sal='fade' data-sal-delay='500' data-sal-duration='1000'>
        <TextBox>
          <Title>{data.title}</Title>
          <TextBoxContent>
            <BlockContent blocks={data._rawBody}></BlockContent>
          </TextBoxContent>
        </TextBox>
      </TextBoxContainer>
    </Banner>
  );
};

export default BannerContainer;

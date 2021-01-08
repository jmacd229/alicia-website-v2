import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import logoImg from '../images/alicia_macdougall_naturopathic_doctor_logo.svg';

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const structuredJSON = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    image: [
      "https://dralicia.ca" + logoImg,
    ],
    '@id': 'https://dralicia.ca',
    name: 'Dr. Alicia MacDougall, ND',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2130 Lawrence Ave E #404',
      addressLocality: 'Scarborough',
      addressRegion: 'ON',
      postalCode: 'M1R 3A6',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.74765416400501,
      longitude: -79.28740258657267,
    },
    url: 'https://dralicia.ca',
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}>
      <script className='structured-data-list' type='application/ld+json'>
        {JSON.stringify(structuredJSON)}
      </script>
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;

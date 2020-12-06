import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import './resources.scss';

interface ResourceData {
  title: string;
  image: { asset: { url: string } };
  categories: Category[];
}

interface Category {
  _key: string;
  name: string;
  resources: Resource[];
}

interface Resource {
  _key: string;
  title: string;
  link?: Link;
  _rawDescription: any;
}

interface Link {
  _key: string;
  text: string;
  url: string;
}

const Resources = () => {
  const data: ResourceData = useStaticQuery(graphql`
    query ResourcesQuery {
      allSanityResources {
        edges {
          node {
            title
            categories {
              name
              resources {
                _key
                title
                _rawDescription(resolveReferences: { maxDepth: 10 })
                link {
                  text
                  url
                  _key
                }
              }
              _key
            }
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `).allSanityResources.edges[0].node;

  const [activeResource, setResource] = useState(null);
  const [activeCategory, setCategory] = useState(null);
  const categoriesRef = useRef(null);

  function getCategories() {
    return data.categories.map(category => {
      return (
        <button
          className='btn'
          key={category._key}
          onClick={() => clickCategory(category)}>
          {category.name}
        </button>
      );
    });
  }

  function getResources() {
    if (activeCategory) {
      return activeCategory.resources.map(resource => {
        return (
          <button
            className='btn'
            key={resource._key}
            onClick={() =>
              setResource(activeResource === resource ? null : resource)
            }>
            {resource.title}
          </button>
        );
      });
    }
  }

  function getLink() {
    if (activeResource && activeResource.link) {
      return (
        <a target='_blank' rel='noreferrer' href={activeResource.link.url}>
          {activeResource.link.text}
        </a>
      );
    }
  }

  function clickCategory(category: Category){
      if(activeResource) {
          setResource(null);
      }
    setCategory(activeCategory === category ? null : category)
  }

  function clickBack() {
    if (activeResource) {
      setResource(null);
    } else {
      setCategory(null);
      // Bring focus back to first category since button is now hidden
      if (categoriesRef?.current?.children.length) {
        categoriesRef.current.children[0].focus();
      }
    }
  }

  return (
    <div className='resources'>
      <div
        className='bg'
        style={{ backgroundImage: `url('${data.image.asset.url}')` }}></div>
      <div className='main'>
        <div>
          <h3 className='impact'>{data.title}</h3>
          <button
            tabIndex={activeCategory ? 0 : -1}
            className={'back btn' + (activeCategory ? '' : ' height-0')}
            onClick={clickBack}>
            <i className='material-icons'>double_arrow</i> Back
          </button>
          <div
            className={
              'resources-container' +
              (activeCategory ? ' resources-expanded' : '') +
              (activeResource ? ' details-expanded' : '')
            }>
            <div className='categories' ref={categoriesRef}>
              {getCategories()}
            </div>
            <div className='resources'>{getResources()}</div>
            <div className={'details' + (activeResource ? '' : ' height-0')}>
              <h4>{activeResource ? activeResource.title : ''}</h4>
              {getLink()}
              {activeResource && activeResource._rawDescription ? (
                <BlockContent
                  blocks={activeResource._rawDescription}></BlockContent>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;

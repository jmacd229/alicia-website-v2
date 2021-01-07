// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import carousel from './carousel'
import alt_image from './alt_image'
import about_me from './about_me'
import work from './work'
import resources from './resources'
import category from './category'
import resource from './resource'
import link from './link'
import contact from './contact'
import contact_method from './contact_method'
import mixed_font_text from './mixed_font_text'
import privacy from './privacy'
import location from './location'
import booking from './booking'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    carousel,
    alt_image,
    about_me,
    work,
    resources,
    category,
    resource,
    link,
    contact,
    contact_method,
    mixed_font_text,
    privacy,
    location,
    booking
  ]),
})

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const sections = [{id: "about", link: "About Me", order: 2},{id: "work", link: "Work with Me", order: 3},{id: "resources", link: "Free Resources", order: 4},{id: "contact", link: "Contact Me", order: 5}];

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} sections={sections}/>
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

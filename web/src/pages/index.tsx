import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../styles/global.scss"
import CarouselContainer from "../components/carousel/carousel"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CarouselContainer />
  </Layout>
)

export default IndexPage

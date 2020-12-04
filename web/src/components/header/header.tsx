import PropTypes from "prop-types"
import React from "react"
import logoImg from '../../images/logo.svg';
import './header.scss';

const Header = ({ siteTitle, sections }) => (
  <div className="header">
  <header>
  <div className="nav-wrapper">
    <div className="nav-menu">
      {sections.map((section, i)=><button className="btn" key={i}>{ section.link }</button>)}
    </div>
    <button
      className="btn back-to-top"
    >
      <span>Back to top</span>
    </button>
  </div>
  <h1>
    <img src={logoImg} alt="Alicia MacDougall" />
  </h1>
  <div className="triangle light"></div>
</header>
<div className="d-flex justify-content-center">
  <div className="triangle"></div>
</div>
</div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

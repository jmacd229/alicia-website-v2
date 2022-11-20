import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer/footer';
import { Chat } from './chat/chat';
import GlobalStyle from 'styles/GlobalStyle';

const Layout = ({ sections, children }) => {
  const [isProd, setProd] = useState(false);

  useEffect(() => setProd(window.location.href.includes('dralicia')), []);

  return (
    <>
    <GlobalStyle />
      <Header sections={sections} />
      <main>
        {children}
        {isProd ? <Chat /> : null}
      </main>
      <Footer></Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

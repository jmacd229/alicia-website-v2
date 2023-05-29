import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header/header';
import Footer from './footer/footer';
import { Chat } from './chat/chat';

const Layout = ({ sections, children }) => {
  const [isProd, setProd] = useState(false);

  useEffect(() => setProd(window.location.href.includes('dralicia')), []);

  return (
    <>
      <Header sections={sections} />
      <main>
        {children}
      </main>
      <Footer></Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

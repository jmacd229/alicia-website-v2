import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
	  <link
		rel="preload"
		href="/fonts/eratolig-webfont.woff2"
		as="font"
		type="font/woff2"
		crossOrigin="anonymous"
		key="interFont"
	  />,
	])
  }
import React, { useEffect } from 'react';

export function Chat() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v9.0',
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    setTimeout(() => {
      document.getElementsByTagName('iframe').foreach(frame => {
        if (frame && frame.attributes && frame.attributes['data-testid']) {
          const id = frame.attributes['data-testid'].value;
          switch (id) {
            case 'dialog_iframe':
              frame.setAttribute('title', 'dialog');
              break;
            case 'bubble_iframe':
              frame.setAttribute('title', 'bubble');
              break;
            case 'unread_iframe':
              frame.setAttribute('title', 'unread');
              break;
            default:
              break;
          }
        }
      });
    }, 500);
  });

  return (
    <div
      className='fb-customerchat'
      attribution='install_email'
      page_id='662192363886012'
      theme_color='#55b8bb'
      logged_in_greeting='Hi! How can I help you?'
      logged_out_greeting='Hi! How can I help you?'></div>
  );
}

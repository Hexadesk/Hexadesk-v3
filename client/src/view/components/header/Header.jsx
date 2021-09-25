import React from 'react';
import { HeaderItemsComponent } from './HeaderItemsComponent';

// Components
import { HeaderLinksComponent } from './HeaderLinksComponent';

export const Header = ({ location }) => {
  let hideHeader =
    location.pathname === '/personal-board' ||
    location.pathname === '/profile' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/sign-in' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/payment';
  return (
    <>
      {hideHeader ? (
        ''
      ) : (
        <section
          className='border-bottom border-5 py-2 mb-3 position-sticky bg-white'
          style={{ top: 61, zIndex: 1030 }}
        >
          <div className='row mx-0 justify-content-between'>
            <HeaderLinksComponent />
            <HeaderItemsComponent />
          </div>
        </section>
      )}
    </>
  );
};

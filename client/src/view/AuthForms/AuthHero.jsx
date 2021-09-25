import React from 'react';
import { Link } from 'react-router-dom';

export const AuthHero = ({ link, linkText }) => {
  return (
    <div className='bg-primary p-3 p-lg-5 text-white h-100 d-flex flex-column'>
      <div>
        <h1 className='mb-2' style={{ fontFamily: 'cursive' }}>
          Hexa
        </h1>
        <div className='fs-5 text-white-50'>
          Build Better, Build Faster, Build Together
        </div>
      </div>
      <div
        className='display-2 font-weight-bold text-center my-auto'
        style={{ fontFamily: 'cursive' }}
      >
        Hexa
      </div>
      <div className='text-center'>
        <span className='text-white-50'>{linkText}</span>
        <Link to={link} className='text-warning text-decoration-none ml-2'>
          Click here
        </Link>
      </div>
    </div>
  );
};

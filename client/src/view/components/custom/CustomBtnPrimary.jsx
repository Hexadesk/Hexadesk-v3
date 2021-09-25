import React from 'react';

export const CustomBtnPrimary = ({ children, className, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`btn hexa-btn-primary btn-sm ${className}`}
      style={style}
    >
      <div className='d-flex'>{children}</div>
    </button>
  );
};

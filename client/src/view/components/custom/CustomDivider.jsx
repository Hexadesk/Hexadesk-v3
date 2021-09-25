import React from 'react';

export const CustomDivider = ({ className, color }) => {
  return (
    <div
      className={`divider-1 ${className}`}
      style={{ backgroundColor: `${color}` }}
    ></div>
  );
};

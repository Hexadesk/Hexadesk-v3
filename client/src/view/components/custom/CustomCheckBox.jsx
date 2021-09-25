import React from 'react';

export const CustomCheckBox = ({ id, label }) => {
  return (
    <div className='form-check'>
      <input
        className='form-check-input rounded-circle'
        type='checkbox'
        value=''
        id={id}
      />
      <label
        className='form-check-label ml-1 text-black-50'
        style={{ paddingTop: 2 }}
        for={id}
      >
        {label}
      </label>
    </div>
  );
};

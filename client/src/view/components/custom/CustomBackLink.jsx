import React from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Link } from 'react-router-dom';
export const CustomBackLink = ({ link, className }) => {
  return (
    <div className={`d-flex justify-content-end mb-2 ${className}`}>
      <Link to={link} className='text-decoration-none text-light'>
        <div className='d-flex align-items-center'>
          <ArrowBackIosOutlinedIcon style={{ fontSize: 13 }} />
          <span className='ms-1'>Back</span>
        </div>
      </Link>
    </div>
  );
};

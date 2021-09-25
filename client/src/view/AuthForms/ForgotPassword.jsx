import React from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';

// Components
import { AuthHero } from './AuthHero';
import { CustomBackLink } from '../components/custom/CustomBackLink';

// icons
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { useRedirect } from '../../hooks/useRedirect';

export const ForgotPassword = () => {
  useRedirect();
  return (
    <main className='row min-vh-100'>
      <section className='col-12 col-md-6 px-0'>
        <div className='p-3 p-lg-5'>
          <CustomBackLink link='/sign-in' />
          <div className='mb-3'>
            <h1 className='mb-2 font-weight-bold'>Forgot Password?</h1>
            <div className='fs-5 text-black-50'>
              Enter the email address associated with your account.
            </div>
          </div>
          <div className='col-lg-10 px-0'>
            <form noValidate autoComplete='off'>
              <FormControl className='w-100 mb-4'>
                <InputLabel htmlFor='your-email'>Your Email</InputLabel>
                <Input
                  id='your-email'
                  type='email'
                  placeholder='Enter your email'
                  aria-describedby='my-helper-text-2'
                />
                {/* <FormHelperText
                  id='my-helper-text-2'
                  className='position-absolute  text-success mt-n1'
                  style={{ top: '50%', right: 0 }}
                >
                  <CheckOutlinedIcon />
                </FormHelperText> */}
              </FormControl>

              <div className='my-4'>
                <button
                  type='submit'
                  className='btn btn-block btn-info text-white btn-lg'
                >
                  Submit
                </button>

                <Link
                  to='/sign-in'
                  className='btn btn-block btn-outline-info btn-lg mt-4'
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className='col-12 col-md-6 px-0 order-first order-md-last'>
        <AuthHero link='/sign-up' linkText='Don’t have an account?' />
      </section>
    </main>
  );
};

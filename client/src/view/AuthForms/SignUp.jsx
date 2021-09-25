import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import React from 'react';

// Components
import { AuthHero } from './AuthHero';
import { CustomBackLink } from '../components/custom/CustomBackLink';

// icons
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { Controller, useForm } from 'react-hook-form';
import { setAuthInfo } from '../../Action/Auth';
import { useMutation } from 'react-query';
import api from '../../apiCalls/api';
import { createNotification } from '../../components/Toast';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ErrorIcon from '@material-ui/icons/Error';
import { useRedirect } from '../../hooks/useRedirect';
export const SignUp = () => {
  useRedirect();
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors, handleSubmit, control, watch } = useForm();
  const { mutate, isLoading } = useMutation(api.signup, {
    onSuccess: async (res) => {
      createNotification('success', 'Login Successfully');
      dispatch(setAuthInfo({ access_token: res.token, user: res.user }));
      history.push('/payment');
    },
    onError: async (err) => {
      createNotification(
        'error',
        err?.data?.message ?? 'Email or Password is incorrect'
      );
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <main className='row min-vh-100'>
      <section className='col-12 col-md-6 px-0'>
        <div className='p-3 p-lg-5'>
          <CustomBackLink link='/sign-in' />
          <div className='mb-3'>
            <h1 className='mb-2 font-weight-bold'>Sign Up</h1>
            <div className='fs-5 text-black-50'>Don't have an account?</div>
          </div>
          <div className='col-lg-10 px-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true, min: 5, max: 100 }}
                render={({ onChange, value }) => (
                  <FormControl className='w-100 mb-4' error={errors.name}>
                    <InputLabel htmlFor='your-email'>Full Name</InputLabel>

                    <Input
                      placeholder='Ivan Pavlov'
                      id='full-name'
                      type='text'
                      aria-describedby='my-helper-text-2'
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                    />

                    <FormHelperText
                      id='my-helper-text-2'
                      className='position-absolute  text-success mt-n1'
                      style={{ top: '50%', right: 0 }}
                    >
                      {errors.name ? (
                        <ErrorIcon color='error' />
                      ) : (
                        '' // <CheckOutlinedIcon />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name='email'
                control={control}
                rules={{ required: true, min: 5, max: 100 }}
                render={({ onChange, value }) => (
                  <FormControl className='w-100 mb-4' error={errors.email}>
                    <InputLabel htmlFor='your-email'>Your Email</InputLabel>

                    <Input
                      id='your-email'
                      type='email'
                      placeholder='Enter your email'
                      aria-describedby='my-helper-text-2'
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                    />

                    <FormHelperText
                      id='my-helper-text-2'
                      className='position-absolute  text-success mt-n1'
                      style={{ top: '50%', right: 0 }}
                    >
                      {errors.email ? (
                        <ErrorIcon color='error' />
                      ) : (
                        '' // <CheckOutlinedIcon />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name='password'
                control={control}
                rules={{ required: true, min: 3 }}
                render={({ onChange, value }) => (
                  <FormControl className='w-100 mb-4' error={errors.password}>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                      id='password'
                      type='password'
                      placeholder='Enter your password'
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      aria-describedby='my-helper-text-3'
                    />

                    <FormHelperText
                      id='my-helper-text-2'
                      className='position-absolute  text-success mt-n1'
                      style={{ top: '50%', right: 0 }}
                    >
                      {errors.password ? (
                        <ErrorIcon color='error' />
                      ) : (
                        '' // <CheckOutlinedIcon />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name='repeatPassword'
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    value === watch('password') || 'The passwords do not match',
                }}
                render={({ onChange, value }) => (
                  <FormControl
                    className='w-100 mb-4'
                    error={errors.repeatPassword}
                  >
                    <InputLabel htmlFor='password'>Repeat Password</InputLabel>
                    <Input
                      id='repeatPassword'
                      type='password'
                      placeholder='Re-type your password'
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      aria-describedby='my-helper-text-3'
                    />

                    <FormHelperText
                      id='my-helper-text-2'
                      className='position-absolute  text-success mt-n1'
                      style={{ top: '50%', right: 0 }}
                    >
                      {errors.repeatPassword ? (
                        <ErrorIcon color='error' />
                      ) : (
                        '' // <CheckOutlinedIcon />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />

              <div className='my-4'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='btn btn-block btn-info text-white btn-lg'
                >
                  {isLoading ? 'Loading...' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className='col-12 col-md-6 px-0 order-first order-md-last'>
        <AuthHero link='/sign-in' linkText='I have an account!' />
      </section>
    </main>
  );
};

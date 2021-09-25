import { FormHelperText, Grid } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PDF from '../../../assets/test.pdf';

export const NewItem = () => {
  const { errors, handleSubmit, control, reset } = useForm();
  const pdfArr = [{}, {}];

  return (
    <form className='flex-fill d-flex flex-column'>
      <section className='flex-fill bg-very-light pl-3'>
        <div className='scroll-box' style={{ height: '50vh' }}>
          <div className='row mx-0 text-black-50 py-3'>
            <Grid container spacing={2} xs={12}>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Item Title
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Item Type
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Item Name
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Starting Name
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Due Date
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Item Priority
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Assign To
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Carbon Copy
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Item Status
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Sub Task
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid lg={6} xs={12} item>
                <div className='form-group mb-2'>
                  <label className='font-weight-bold mb-1 small'>
                    Document
                  </label>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true, min: 5, max: 100 }}
                    render={({ onChange, value }) => (
                      <div>
                        <input
                          className={`form-control form-control-sm ${
                            errors.title ? 'text-danger border-danger' : ''
                          }`}
                          type='text'
                          placeholder='The Boys'
                          value={value}
                          onChange={({ target }) => onChange(target.value)}
                        />
                        {errors.title && (
                          <FormHelperText className='ml-2 text-danger'>
                            This field is required & must contain 5 words
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            {pdfArr.map((data, i) => (
              <div key={i} className='p-2' style={{ width: 300 }}>
                <a
                  href={PDF}
                  type='button'
                  download
                  className='btn p-2 d-flex align-items-baseline btn-outline-light text-dark'
                >
                  <div className='row mx-0'>
                    <div className='mr-2'>
                      <img
                        className='small-img rounded'
                        src='https://play-lh.googleusercontent.com/nufRXPpDI9XP8mPdAvOoJULuBIH_OK4YbZZVu8i_-eDPulZpgb-Xp-EmI8Z53AlXHpqX=s180-rw'
                        alt='item'
                      />
                    </div>
                    <div className='text-left small'>
                      <div>2019-10-12-LC-pdf</div>
                      <div className='small'>PDf-sadasda</div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            <div className='p-2' style={{ width: 80 }}>
              <label className='btn p-0 btn-outline-light text-dark h-100 w-100 rounded-lg-2 position-relative'>
                <div className='h-100 d-flex flex-column justify-content-center align-items-center text-center'>
                  <span>
                    <div className='mb-0 h3'>&#65291;</div>
                  </span>
                </div>
                <input
                  type='file'
                  className='btn-outline-light text-dark h-100 w-100 rounded-lg-2 border-0'
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-light p-3 border-top'>
        <div className='row mx-0'>
          <div className='mr-2'>
            <img
              className='small-img'
              src='https://source.unsplash.com/random'
              alt='item'
            />
          </div>
          <div className='flex-fill'>
            <textarea
              className='form-control'
              rows='4'
              placeholder='description'
            />
          </div>
        </div>
        <div className='mt-2 text-right'>
          <button type='button' className='btn-primary btn-sm px-3 border-0'>
            Send
          </button>
        </div>
      </section>
    </form>
  );
};

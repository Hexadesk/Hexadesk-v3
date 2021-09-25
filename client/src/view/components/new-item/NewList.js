import { FormHelperText } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation } from 'react-router';
import api from '../../../apiCalls/api';
import { createNotification } from '../../../components/Toast';
import queryString from 'query-string';
export default function NewList({ handleClose, isEdit = false, initialState }) {
  const { errors, handleSubmit, control, reset } = useForm();
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);

  const queryClient = useQueryClient();
  useEffect(() => {
    if (isEdit) {
      reset(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, initialState]);
  const { mutate, isLoading } = useMutation(
    isEdit ? api.editList : api.addList,
    {
      onSuccess: async (res) => {
        createNotification('success', 'List Created Successfully');
        queryClient.invalidateQueries('get-all-board-list');
        handleClose();
      },
      onError: async (err) => {
        createNotification(
          'error',
          err?.data?.message ?? 'Unable to proform this action'
        );
      },
    }
  );
  const onSubmit = (data) => {
    if (isEdit) {
      mutate({ ...data, id: initialState?._id });
    } else {
      mutate({
        ...data,
        boardId,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-fill d-flex flex-column'
    >
      <section className='flex-fill bg-very-light p-3'>
        <div className='form-group mb-2'>
          <label className='font-weight-bold mb-1 small'>List Name</label>
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
        <div className='d-flex justify-content-end mt-3'>
          <button
            type='button'
            className='btn-danger btn-sm px-3 mr-2 border-0'
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type='submit'
            className='btn-primary btn-sm px-3 border-0'
          >
            {isLoading ? 'Loading...' : 'Done'}
          </button>
        </div>
      </section>
    </form>
  );
}

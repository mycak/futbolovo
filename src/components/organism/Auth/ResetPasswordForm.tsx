'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import EmailInput from '@/components/atoms/inputs/EmailInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import { requestPasswordReset } from '@/app/actions/auth';
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from '@/schemas/resetPasswordSchema';

const ResetPasswordForm = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema(t)),
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    console.log(data);
    try {
      setIsLoading(true);
      setError(null);
      const result = await requestPasswordReset(data.email, {
        title: t('auth.resetPassword.title'),
        emailBody: t('auth.resetPassword.emailBody'),
      });

      if (result.error) {
        setError(result.error || 'auth.resetPassword.error');
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError('auth.resetPassword.error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4 justify-center mx-auto mt-4 md:mt-8'
      >
        <EmailInput
          label='Email'
          placeholder={t('typeEmail')}
          name='email'
          register={register}
          error={errors.email?.message}
          disabled={isLoading}
        />

        <Divider contained classNames='col-span-2' />

        <Button
          classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
          color='bg-red-500'
          text={t('auth.resetPassword.title')}
          isLoading={isLoading}
          type='submit'
        />

        {error && (
          <div className='text-center'>
            <span className='text-red-500 text-sm'>{t(error)}</span>
            <p className='text-gray-500 text-xs mt-1'>
              {t('auth.resetPassword.tryAgain')}
            </p>
          </div>
        )}
      </form>
      {isSuccess ? (
        <div className='text-green-600 text-center p-4 bg-green-50 rounded-md mt-8'>
          <p>{t('auth.resetPassword.emailSuccessSent')}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ResetPasswordForm;

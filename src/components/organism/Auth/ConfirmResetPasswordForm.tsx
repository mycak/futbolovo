'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import PasswordInput from '@/components/atoms/inputs/PasswordInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import { resetPassword } from '@/app/actions/auth';
import {
  ConfirmResetPasswordInputs,
  confirmResetPasswordSchema,
} from '@/schemas/resetPasswordConfirmSchema';
import { paths } from '@/constants/paths';
import { useNotifications } from '@/hooks/useNotifications';

const ConfirmResetPasswordForm = () => {
  const { lng, token } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { showNotification } = useNotifications();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ConfirmResetPasswordInputs>({
    resolver: zodResolver(confirmResetPasswordSchema(t)),
  });

  const onSubmit = async (data: ConfirmResetPasswordInputs) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await resetPassword(token as string, data.password);

      if (result.error) {
        setError(
          result.error === 'invalidOrExpiredToken'
            ? t('auth.resetPassword.invalidToken')
            : t('auth.resetPassword.error')
        );
      } else {
        setIsSuccess(true);
        showNotification(t('auth.resetPassword.successReset'), 'success');
      }
    } catch (err) {
      console.error(err);
      setError(t('auth.resetPassword.error'));
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
        <PasswordInput
          label={t('auth.resetPassword.newPassword')}
          placeholder={t('password')}
          name='password'
          register={register}
          loading={isLoading}
          error={errors.password?.message}
        />
        <PasswordInput
          label={t('auth.resetPassword.repeatNewPassword')}
          placeholder={t('password')}
          name='repeatPassword'
          register={register}
          loading={isLoading}
          error={errors.repeatPassword?.message}
        />

        <Divider contained classNames='col-span-2' />
        {!isSuccess && (
          <Button
            classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
            color='bg-red-500'
            text={t('auth.resetPassword.title')}
            isLoading={isLoading}
            type='submit'
          />
        )}

        {error && (
          <div className='text-center'>
            <span className='text-red-500 text-sm'>{error}</span>
          </div>
        )}
      </form>

      {isSuccess && (
        <>
          <Button
            text={t('auth.signIn')}
            asLink
            href={paths.Login}
            classNames='h-[38px] text-xl max-w-max mt-4 mx-auto'
            color='bg-red-500'
          />
          <div className='text-green-600 text-center p-4 bg-green-50 rounded-md mt-8'>
            <p>{t('auth.resetPassword.successReset')}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmResetPasswordForm;

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import PasswordInput from '@/components/atoms/inputs/PasswordInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import { changePassword } from '@/app/actions/auth';
import {
  changePasswordSchema,
  ChangePasswordInputs,
} from '@/schemas/changePasswordSchema';
import { useSession } from 'next-auth/react';

const ChangePasswordForm = () => {
  const { lng } = useParams();
  const { data: userData } = useSession();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInputs>({
    resolver: zodResolver(changePasswordSchema(t)),
  });

  const onSubmit = async (data: ChangePasswordInputs) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await changePassword(
        userData?.user.id as string,
        data.oldPassword,
        data.password
      );

      if (result.error) {
        setError(
          result.error === 'Old password is incorrect'
            ? t('auth.changePassword.invalidPassword')
            : t('auth.changePassword.error')
        );
      } else {
        setIsSuccess(true);
        reset();
      }
    } catch (err) {
      setError(t('auth.changePassword.error'));
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
          label={t('auth.changePassword.oldPassword')}
          placeholder={t('password')}
          name='oldPassword'
          register={register}
          loading={isLoading}
          error={errors.password?.message}
        />
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
            text={t('auth.changePassword.title')}
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
        <div className='text-green-600 text-center p-4 bg-green-50 rounded-md '>
          <p>{t('auth.changePassword.success')}</p>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordForm;

'use client';

import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import EmailInput from '@/components/atoms/inputs/EmailInput';
import PasswordInput from '@/components/atoms/inputs/PasswordInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import { LoginInputs } from '@/schemas/loginSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/constants/paths';
import { ResetPasswordInputs } from '@/schemas/restPasswordSchema';

const ResetPasswordForm = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    setIsLoading(true);
    //TODO: add reset functionality
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4 justify-center mx-auto mt-4 md:mt-8'
      >
        {!isLoading ? (
          <EmailInput
            label='Email'
            placeholder={t('typeEmail')}
            name='email'
            register={register}
            error={errors.email?.message}
          />
        ) : (
          <DynamicLoader />
        )}

        <Divider contained classNames='col-span-2' />

        <Button
          classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
          color='bg-red-500'
          text={t('reset')}
          type='submit'
          isLoading={isLoading}
        />
        {error && (
          <span className='text-red-500 text-xs -bottom-4 right-0'>
            {t(`errors.${error}`)}
          </span>
        )}
      </form>
    </>
  );
};

export default ResetPasswordForm;

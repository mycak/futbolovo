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
import { useNotifications } from '@/hooks/useNotifications';

const LoginForm = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const { showNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit = async (data: LoginInputs) => {
    const parsedData = {
      ...data,
      email: data.email.toLowerCase(),
    };
    setIsLoading(true);
    await signIn('credentials', {
      ...parsedData,
      redirect: false,
    })
      .then((res) => {
        if (res?.error || !res?.ok) {
          setError(res?.error);
        } else if (res?.ok) {
          showNotification(t('auth.loginSuccess'), 'success');
          router.push(paths.Dashboard);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.error);
        showNotification(t('auth.loginError'), 'error');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4 justify-center mx-auto mt-4 md:mt-8'
      >
        {!isLoading ? (
          <>
            <EmailInput
              label='Email'
              placeholder={t('typeEmail')}
              name='email'
              register={register}
              error={errors.email?.message}
            />
            <PasswordInput
              label={t('password')}
              placeholder={t('password')}
              name='password'
              register={register}
              error={errors.password?.message}
            />
          </>
        ) : (
          <DynamicLoader />
        )}

        <Divider contained classNames='col-span-2' />

        <Button
          classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
          color='bg-red-500'
          text={t('auth.login')}
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

export default LoginForm;

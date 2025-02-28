'use client';

import { useForm } from 'react-hook-form';
import { RegisterInputs, registerSchema } from '@/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import EmailInput from '@/components/atoms/inputs/EmailInput';
import TextInput from '@/components/atoms/inputs/TextInput';
import PasswordInput from '@/components/atoms/inputs/PasswordInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import { registerUser } from '@/app/actions/auth';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import { paths } from '@/constants/paths';
import Checkbox from '@/components/atoms/inputs/Checkbox';
import Link from 'next/link';

const RegisterForm = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema(t)),
  });

  const onSubmit = async (data: RegisterInputs) => {
    setIsSubmitting(true);
    await registerUser(data)
      .then(() => router.push(paths.RegisterConfirm))
      .catch((err) => {
        console.error(err);
        setError(err.error);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center md:items-start gap-4 md:grid md:grid-cols-[repeat(2,_minmax(auto,_320px))] md:gap-x-8 justify-center mx-auto mt-4 md:mt-8'
      >
        {!isSubmitting ? (
          <>
            <TextInput
              label={t('firstName')}
              placeholder={t('firstName')}
              name='firstName'
              register={register}
              error={errors.firstName?.message}
            />
            <TextInput
              label={t('lastName')}
              placeholder={t('lastName')}
              name='lastName'
              register={register}
              error={errors.lastName?.message}
            />
            <TextInput
              label={`${t('auth.companyName')} (${t('optional')})`}
              placeholder={t('auth.companyName')}
              name='companyName'
              register={register}
              error={errors.companyName?.message}
            />
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
            <PasswordInput
              label={t('repeatPassword')}
              placeholder={t('password')}
              name='repeatPassword'
              register={register}
              error={errors.repeatPassword?.message}
            />
            <div className='col-span-2 mt-4'>
              <Checkbox
                name='termsAndConditions'
                register={register}
                error={errors.termsAndConditions?.message}
                label={
                  <span className='text-sm'>
                    {t('auth.termsAndConditions')}
                    <Link
                      href='/statute'
                      className='text-grass-50 hover:underline mx-1'
                    >
                      {t('statutePage.title')}
                    </Link>
                    {t('auth.and')}
                    <Link
                      href='/privacy-policy'
                      className='text-grass-50 hover:underline mx-1'
                    >
                      {t('privacyPolicyPage.title')}
                    </Link>
                  </span>
                }
              />
            </div>
          </>
        ) : (
          <div className='col-span-2'>
            <DynamicLoader />
          </div>
        )}
        <Divider contained classNames='col-span-2' />

        <Button
          classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
          color='bg-red-500'
          text={t('auth.register')}
          type='submit'
          isLoading={isSubmitting}
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

export default RegisterForm;

'use client';

import { useForm } from 'react-hook-form';
import { RegisterInputs, registerSchema } from '@/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import EmailInput from '@/components/atoms/inputs/EmailInput';
import TextInput from '@/components/atoms/inputs/TextInput';
import PasswordInput from '@/components/atoms/inputs/PasswordInput';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';

const RegisterForm = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema(t)),
  });

  const onSubmit = (data: RegisterInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center md:items-start gap-4 md:grid md:grid-cols-[repeat(2,_minmax(auto,_320px))] md:gap-x-8 justify-center mx-auto mt-4 md:mt-8'
    >
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
      <Divider contained classNames='col-span-2' />

      <Button
        classNames='h-[38px] text-xl col-span-2 max-w-max mx-auto'
        color='bg-red-500'
        text={t('auth.register')}
        type='submit'
      />
    </form>
  );
};

export default RegisterForm;

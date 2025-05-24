'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { paths } from '@/constants/paths';

const UserNavigationMenu = () => {
  const { status } = useSession();
  const router = useRouter();

  const onButtonClick = () => {
    if (status === 'authenticated') {
      router.push(paths.MyEvents);
    } else {
      router.push(paths.Login);
    }
  };

  return (
    <div className='relative  text-left hidden md:inline-block'>
      <button
        type='button'
        aria-label='User navigation menu'
        className='max-w-max cursor-pointer'
        onClick={onButtonClick}
      >
        <i className='fa-solid fa-user fa-xl text-grass-45 mx-auto transition-colors duration-500 hover:text-grass-20 scale-85' />
      </button>
    </div>
  );
};

export default UserNavigationMenu;

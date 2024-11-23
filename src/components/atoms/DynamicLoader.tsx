import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const DynamicLoader = ({ classNames }: { classNames?: string }) => {
  const getCloudStyle = (index: number) => ({
    top: `${35 + index * 35}px`,
    left: `${5 + index * 35}px`,
    animationDelay: `${-0.5 * (index + 1)}s`,
  });

  return (
    <div
      className={clsx(
        'overflow-hidden h-[250px] w-[250px] bg-transparent mx-auto',
        classNames
      )}
    >
      <div className='absolute flex items-center justify-center overflow-hidden rounded-full z-10 '>
        <Image
          src='/icons/loader/ball.svg'
          width={32}
          height={32}
          className='loader-icon-stroke absolute animate-ballCombined z-10 loader-icon-filter'
          priority
          alt='ball'
        />
        <div className='border-red-500 border absolute w-[175px] h-[175px] overflow-hidden rounded-full'>
          {[...Array(4)].map((_, index) => (
            <Image
              src='/icons/loader/cloud.svg'
              width={48}
              height={48}
              className='absolute loader-icon-stroke fa-solid fa-cloud text-ivory-150 z-10 fa-3x animate-clouds loader-icon-filter'
              style={getCloudStyle(index)}
              priority
              key={index}
              alt='cloud'
            />
          ))}
        </div>
        <span className='bg-gray-300 relative w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-gray-900 ball-fence'>
          <i className='ball-loader-bg animate-rotate360 rounded-full absolute inset-0'></i>
        </span>
      </div>
    </div>
  );
};

export default DynamicLoader;

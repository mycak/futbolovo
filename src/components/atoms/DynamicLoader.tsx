import React from 'react';

const DynamicLoader = () => {
  const getCloudStyle = (index: number) => ({
    top: `${35 + index * 35}px`,
    left: `${5 + index * 35}px`,
    animationDelay: `${-0.5 * (index + 1)}s`,
  });

  return (
    <div className='overflow-hidden h-[250px] w-[250px] bg-transparent mx-auto'>
      <div className='absolute flex items-center justify-center overflow-hidden rounded-full z-10 '>
        <i className='loader-icon-stroke absolute fa-solid fa-futbol text-ivory-150 fa-2x animate-ballCombined z-10' />
        <div className='border-red-500 border absolute w-[175px] h-[175px] overflow-hidden rounded-full'>
          {[...Array(4)].map((_, index) => (
            <i
              key={index}
              className='absolute loader-icon-stroke fa-solid fa-cloud text-ivory-150 z-10 fa-3x animate-clouds'
              style={getCloudStyle(index)}
            />
          ))}
        </div>
        <span className='bg-gray-900 relative w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-gray-900 ball-fence'>
          <i className='ball-loader-bg animate-rotate360 rounded-full absolute inset-0'></i>
        </span>
      </div>
    </div>
  );
};

export default DynamicLoader;

import { IconText } from '@/types/common';
import PageWrapper from '../atoms/PageWrapper';

const IconsSection = ({
  title,
  items,
}: {
  title: string;
  items: IconText[];
}) => {
  return (
    <PageWrapper classNames='py-8 max-w-screen-xl mx-auto bborder border-red-600'>
      <h3 className='text-3xl md:text-5xl text-center pb-8 text-grass-50'>
        {title}
      </h3>
      <div className='flex flex-col items-center md:flex-row md:items-start justify-between gap-8'>
        {items.map((item) => (
          <div
            key={item.icon}
            className='flex flex-col items-center max-w-72 flex-1'
          >
            <i className={`fa-solid fa-${item.icon} fa-3x text-ivory-150`} />
            <p className='text-center mt-4 text-2xl text-grass-40'>
              {item.title}
            </p>
            <p className='text-center mt-1'>{item.text}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default IconsSection;

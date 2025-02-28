import Image from 'next/image';
import Button from './Button';
import { paths } from '@/constants/paths';
import PageWrapper from './PageWrapper';

const SiteDescription = ({
  siteDescriptionTexts,
}: {
  siteDescriptionTexts: {
    title: string;
    description1: string;
    description2: string;
    firstButton: string;
    secondButton: string;
  };
}) => {
  return (
    <PageWrapper classNames='bg-gray-900 py-12 flex flex-col-reverse lg:flex-row justify-between gap-6 lg:gap-12'>
      <div className='flex flex-col justify-center'>
        <h3 className='text-center lg:text-right text-3xl lg:text-5xl text-grass-20'>
          {siteDescriptionTexts.title}
        </h3>
        <p className='text-center lg:text-right md:text-xl mt-6'>
          {siteDescriptionTexts.description1}{' '}
          <span className='text-grass-50'>
            {siteDescriptionTexts.description2}
          </span>
        </p>
        <div className='flex items-end gap-8 mx-auto lg:ml-auto lg:mr-0'>
          <Button
            asLink
            href={paths.Map}
            text={siteDescriptionTexts.firstButton}
            size='lg'
            classNames='md:ml-auto mt-8 animate-shake'
          />
          <Button
            asLink
            size='lg'
            href={paths.EventAdd}
            text={siteDescriptionTexts.secondButton}
            classNames='mt-8 animate-shake delay-1'
            color='bg-red-500'
          />
        </div>
      </div>
      <Image
        src='/images/map-overview.png'
        alt='overview'
        width={510}
        height={600}
        className='h-full w-5/6 mx-auto md:w-2/3 lg:mr-auto lg:ml-0'
        style={{
          maxHeight: '600px',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
    </PageWrapper>
  );
};

export default SiteDescription;

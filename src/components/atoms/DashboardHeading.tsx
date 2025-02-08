import { paths } from '@/constants/paths';
import clsx from 'clsx';
import Link from 'next/link';

const DashboardHeading = ({
  classNames,
  mainTopics,
}: {
  classNames?: string;
  mainTopics: string[];
}) => {
  return (
    <nav
      className={clsx(
        'flex gap-x-4 flex-wrap md:gap-8 justify-center items-center container px-0',
        classNames
      )}
      role='navigation'
      aria-label='Dashboard Topics'
    >
      {mainTopics.map((topic, index) => (
        <Link href={paths.Map} key={topic} role='link'>
          <p className='sm:text-lg md:text-xl text-grass-50'>
            {topic}
            <span
              className={clsx(
                mainTopics.length === index + 1
                  ? 'hidden sm:hidden'
                  : 'hidden sm:ml-8 sm:inline'
              )}
            >
              •
            </span>
          </p>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardHeading;

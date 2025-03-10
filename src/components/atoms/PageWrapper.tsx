import clsx from 'clsx';

const PageWrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <div
      className={clsx(
        classNames,
        'mb-8 px-4 sm:px-8 lg:px-12 2xl:mx-auto 2xl:max-w-screen-2xl w-full'
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;

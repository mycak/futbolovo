import clsx from 'clsx';

const PageContainer = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col min-w-full max-w-full box-border overflow-y-auto h-full',
        'min-h-[calc(100vh-248px)] md:min-h-[calc(100vh-286px)]',
        classNames
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
//md: 100px (footer) + 76px (logo) + 60px (subheading) + 50px (padding) => 286px
//mobile: 100px (footer) + 66px (logo) + 56px (subheading) + 26px (padding) => 248px

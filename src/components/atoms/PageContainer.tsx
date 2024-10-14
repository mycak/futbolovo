import clsx from "clsx";

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
        "flex flex-col min-w-full max-w-full box-border overflow-y-auto pb-12 h-full",
        classNames
      )}
      style={{ minHeight: "calc(100vh - 300px)" }}
    >
      {children}
    </div>
  );
};

export default PageContainer;

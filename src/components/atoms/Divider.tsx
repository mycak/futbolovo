import clsx from "clsx";
import PageWrapper from "./PageWrapper";

const Divider = ({ classNames }: { classNames?: string }) => {
  return (
    <PageWrapper>
      <div
        className={clsx(
          "border border-b border-grass-50 my-8 2xl:-mx-16",
          classNames
        )}
      />
    </PageWrapper>
  );
};

export default Divider;

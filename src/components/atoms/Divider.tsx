import clsx from "clsx";
import PageWrapper from "./PageWrapper";

const Divider = ({
  classNames,
  wrapperClassNames,
}: {
  classNames?: string;
  wrapperClassNames?: string;
}) => {
  return (
    <PageWrapper classNames={wrapperClassNames}>
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

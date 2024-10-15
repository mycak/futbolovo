import clsx from "clsx";
import PageWrapper from "./PageWrapper";

const Divider = ({
  classNames,
  wrapperClassNames,
  contained = false,
}: {
  classNames?: string;
  wrapperClassNames?: string;
  contained?: boolean;
}) => {
  return !contained ? (
    <PageWrapper classNames={wrapperClassNames}>
      <div
        className={clsx(
          "border border-b border-grass-50 my-4 md:my-8 w-11/12 mx-auto",
          classNames
        )}
      />
    </PageWrapper>
  ) : (
    <div
      className={clsx(
        "border border-b border-grass-50 my-4 md:my-8 w-11/12 mx-auto",
        classNames
      )}
    />
  );
};

export default Divider;

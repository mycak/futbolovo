import { paths } from "@/constants/paths";
import { mainTopics } from "@/constants/texts";
import clsx from "clsx";
import Link from "next/link";

const DashboardHeading = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      className={clsx(
        "flex gap-8 justify-center items-center container",
        classNames
      )}
    >
      {mainTopics.map((topic, index) => (
        <Link href={paths.Map} key={topic}>
          <p className="text-2xl text-grass-50">
            {topic}
            <span
              className={clsx(
                mainTopics.length === index + 1 && "hidden",
                "ml-8"
              )}
            >
              •
            </span>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardHeading;

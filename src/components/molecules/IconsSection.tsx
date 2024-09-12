import { IconText } from "@/types/common";
import clsx from "clsx";

const IconsSection = ({
  title,
  items,
  classNames,
}: {
  title: string;
  items: IconText[];
  classNames?: string;
}) => {
  return (
    <div
      className={clsx("py-8 max-w-screen-xl mx-auto bg-slate-950", classNames)}
    >
      <h3 className="text-5xl text-center pb-10 text-grass-50">{title}</h3>
      <div className="flex justify-between gap-8">
        {items.map((item) => (
          <div key={item.icon} className="flex flex-col items-center max-w-72">
            <i className={`fa-solid fa-${item.icon} fa-3x text-ivory-150`} />
            <p className="text-center mt-4 text-2xl text-grass-40">
              {item.title}
            </p>
            <p className="text-center mt-1">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconsSection;

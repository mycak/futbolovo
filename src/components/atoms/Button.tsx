import clsx from "clsx";
import Link from "next/link";

type ButtonProps =
  | {
      text: string;
      onClick?: () => void;
      classNames?: string;
      asLink: true;
      href: string;
    }
  | {
      text: string;
      onClick: () => void;
      classNames?: string;
      asLink?: false;
      href?: never;
    };

const Button = ({ text, onClick, classNames, asLink, href }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-grass-150 px-3 py-1 transition-all duration-300",
        classNames
      )}
    >
      {asLink ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};

export default Button;

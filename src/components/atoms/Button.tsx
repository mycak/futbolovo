import clsx from "clsx";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

type ButtonProps =
  | {
      text?: string;
      type?: "basic";
      onClick?: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink: true;
      href: string;
      icon?: never;
    }
  | {
      text?: string;
      type?: "basic";
      onClick: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink?: false;
      href?: never;
      icon?: never;
    }
  | {
      text?: string;
      type?: "icon";
      onClick: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink?: false;
      href?: never;
      icon: string;
    };

const Button = ({
  text,
  onClick,
  classNames,
  asLink,
  href,
  type,
  icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-grass-150 px-3 py-1 transition-all duration-300",
        classNames
      )}
    >
      {type === "icon" && (
        <i className={`fa-solid fa-${icon} fa-sm text-ivory-150 mr-3`} />
      )}
      {asLink ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};

export default Button;

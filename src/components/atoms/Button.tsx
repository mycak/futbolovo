import clsx from "clsx";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

type ButtonProps =
  | {
      text?: string;
      variant?: "basic" | "icon";
      onClick?: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink: true;
      href: string;
      icon?: string;
      type?: "button" | "submit" | "reset";
    }
  | {
      text?: string;
      variant?: "basic";
      onClick?: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink?: false;
      href?: never;
      icon?: string;
      type?: "button" | "submit" | "reset";
    }
  | {
      text?: string;
      variant?: "icon";
      onClick?: (() => void) | SubmitHandler<FieldValues>;
      classNames?: string;
      asLink?: false;
      href?: never;
      icon: string;
      type?: "button" | "submit" | "reset";
    };

const Button = ({
  text,
  onClick,
  classNames,
  asLink,
  href,
  variant,
  icon,
  type,
}: ButtonProps) => {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={clsx(
        "bg-grass-150 px-3 py-1 transition-all duration-300 opacity-90 rounded-sm flex items-center hover:opacity-100",
        classNames
      )}
    >
      {variant === "icon" && (
        <i className={`fa-solid fa-${icon} fa-sm text-ivory-150 mr-3`} />
      )}
      {asLink ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};

export default Button;

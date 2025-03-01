import clsx from 'clsx';
import Link from 'next/link';
import { FieldValues, SubmitHandler } from 'react-hook-form';

// Base button properties common to all variants
type BaseButtonProps = {
  text?: string;
  onClick?: ((ev: React.SyntheticEvent) => void) | SubmitHandler<FieldValues>;
  classNames?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  color?: string;
};

// Link button variant
type LinkButtonProps = BaseButtonProps & {
  asLink: true;
  href: string;
  variant?: 'basic' | 'icon';
  icon?: string;
};

// Icon button variant
type IconButtonProps = BaseButtonProps & {
  asLink?: false;
  href?: never;
  variant?: 'icon';
  icon: string;
};

// Basic button variant
type BasicButtonProps = BaseButtonProps & {
  asLink?: false;
  href?: never;
  variant?: 'basic';
  icon?: string;
};

// Text button variant
type TextButtonProps = BaseButtonProps & {
  asLink?: false;
  href?: never;
  variant?: 'text';
  icon?: string;
};

type ButtonProps =
  | LinkButtonProps
  | IconButtonProps
  | BasicButtonProps
  | TextButtonProps;

const Button = ({
  text,
  onClick,
  classNames,
  asLink,
  href,
  variant,
  icon,
  type,
  disabled = false,
  size = 'md',
  isLoading = false,
  color,
}: ButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={clsx(
        'px-3 py-1 transition-all duration-300 opacity-90 rounded-sm flex items-center cursor-pointer hover:opacity-100 relative',
        variant === 'text' && 'text-grass-20 bg-transparent',
        size === 'lg' &&
          'px-2 py-1 md:px-5 md:py-3 text-xl md:text-2xl lg:text-3xl',
        isLoading && 'cursor-wait opacity-75',
        color ?? 'bg-grass-150',
        classNames
      )}
    >
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-5 w-5 border-2 border-ivory-150 border-t-transparent' />
        </div>
      )}
      <div className={clsx(isLoading && 'invisible')}>
        {variant === 'icon' && (
          <i className={`fa-solid fa-${icon} fa-sm text-ivory-150 mr-3`} />
        )}
        {asLink ? <Link href={href}>{text}</Link> : text}
      </div>
    </button>
  );
};

export default Button;

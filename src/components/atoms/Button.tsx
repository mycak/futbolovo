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
  // Common button classes that ensure good touch targets
  const buttonClasses = clsx(
    'px-4 py-3 min-w-[48px] min-h-[48px] transition-all duration-300 opacity-100 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90 relative',
    variant === 'text' && 'text-grass-20 bg-transparent',
    size === 'sm' && 'px-3 py-3 text-sm',
    size === 'md' && 'px-4 py-3',
    size === 'lg' &&
      'px-5 py-4 md:px-6 md:py-4 text-xl md:text-2xl lg:text-3xl',
    isLoading && 'cursor-wait opacity-75',
    color ?? 'bg-grass-150',
    classNames
  );

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-5 w-5 border-2 border-ivory-150 border-t-transparent' />
    </div>
  );

  // Content component with icon and text
  const ButtonContent = () => (
    <div
      className={clsx(
        'flex items-center justify-center',
        isLoading && 'invisible'
      )}
    >
      {variant === 'icon' && (
        <i
          className={`fa-solid fa-${icon} fa-sm text-ivory-150 ${
            text ? 'mr-3' : ''
          }`}
        />
      )}
      {text}
    </div>
  );

  // Return link variant if asLink is true
  if (asLink) {
    return (
      <Link href={href} className={buttonClasses}>
        {isLoading && <LoadingSpinner />}
        <ButtonContent />
      </Link>
    );
  }

  // Return regular button otherwise
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={buttonClasses}
    >
      {isLoading && <LoadingSpinner />}
      <ButtonContent />
    </button>
  );
};

export default Button;

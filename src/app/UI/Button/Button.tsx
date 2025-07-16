import React from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    size !== 'md' ? `button--${size}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="button__spinner">↻</span>
      ) : (
        icon && <span className="button__icon">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
import clsx from 'clsx';

function Button({ 
  text, 
  onClick, 
  type = 'button', 
  className = '', 
  variant = 'primary',
  disabled = false,
  size = 'md'
}) {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {text}
    </button>
  );
}

export default Button;
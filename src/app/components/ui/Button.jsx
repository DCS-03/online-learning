import Link from 'next/link';

const variants = {
  primary: 'btn-gradient inline-flex items-center gap-2',
  secondary: 'btn-outline inline-flex items-center gap-2',
  dark: 'bg-gray-900 text-white hover:bg-primary-600 inline-flex items-center gap-2',
  outline: 'btn-outline inline-flex items-center gap-2',
};

export default function Button({ href, variant = 'primary', children, className = '', icon: Icon, iconPosition = 'right', ...props }) {
  const baseClasses = variants[variant] || variants.primary;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="text-sm" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="text-sm" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {content}
    </button>
  );
}

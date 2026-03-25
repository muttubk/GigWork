// Reusable Button component
// variant: 'primary' | 'secondary' | 'ghost' | 'outline'
// size: 'sm' | 'md' | 'lg'

const variants = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 border-transparent',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-transparent',
  ghost:     'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
  outline:   'bg-transparent text-brand-600 hover:bg-brand-50 border-brand-600',
}

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={`
        inline-flex items-center justify-center gap-2 font-medium border
        transition-all duration-200 cursor-pointer select-none
        rounded-${rounded}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
}

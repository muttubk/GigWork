// Shows initials on a colored background
export default function Avatar({ initials, bgClass = 'bg-brand-100', textClass = 'text-brand-800', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-11 h-11 text-sm', lg: 'w-14 h-14 text-base' }
  return (
    <div className={`${sizes[size]} ${bgClass} ${textClass} rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
      {initials}
    </div>
  )
}

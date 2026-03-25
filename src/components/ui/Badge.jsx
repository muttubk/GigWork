// color: 'green' | 'gold' | 'blue' | 'red' | 'gray'
const colors = {
  green: 'bg-emerald-100 text-emerald-800',
  gold:  'bg-amber-100   text-amber-800',
  blue:  'bg-blue-100    text-blue-800',
  red:   'bg-red-100     text-red-800',
  gray:  'bg-gray-100    text-gray-700',
}

export default function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colors[color]} ${className}`}
    >
      {children}
    </span>
  )
}

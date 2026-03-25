export default function StatCard({ value, label }) {
  return (
    <div className="text-center py-6 px-4">
      <span className="block font-serif text-3xl font-normal text-gray-900">{value}</span>
      <span className="text-sm text-gray-400 mt-1 font-light">{label}</span>
    </div>
  )
}

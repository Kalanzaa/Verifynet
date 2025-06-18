const stats = [
  {
    icon: 'fa-check-circle',
    value: 142,
    label: 'Verified Claims Today',
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    icon: 'fa-exclamation-triangle',
    value: 27,
    label: 'Unverified Reports',
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
  {
    icon: 'fa-map-marker-alt',
    value: 18,
    label: 'Active Crisis Zones',
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    icon: 'fa-user-shield',
    value: '94%',
    label: 'Verification Accuracy',
    bg: 'bg-yellow-100',
    color: 'text-yellow-600',
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:-translate-y-1 hover:shadow-lg transition">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-xl ${stat.bg} ${stat.color}`}>
            <i className={`fas ${stat.icon}`} />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
} 
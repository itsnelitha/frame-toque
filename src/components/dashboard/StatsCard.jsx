export default function StatsCard({ title, value, icon: Icon, trend, trendValue, color = "green" }) {
  const colorClasses = {
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  };

  const iconColorClasses = {
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    orange: "text-orange-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl border rounded-xl p-6 transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 bg-white/10 rounded-lg ${iconColorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`font-semibold ${
              trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}

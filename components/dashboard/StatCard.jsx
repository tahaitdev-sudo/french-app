export default function StatCard({ Icon, label, value, tint }) {
  return (
    <div className="card flex items-center gap-4 !p-4">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tint}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-extrabold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

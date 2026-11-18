// « +25 XP » reste dans le bon ordre même au milieu d'une phrase arabe (RTL).
export default function Xp({ value, plus = false, className = '' }) {
  return (
    <span dir="ltr" className={`inline-block tabular-nums ${className}`}>
      {plus ? '+' : ''}
      {value} XP
    </span>
  );
}

export default function MetricCard({
  title,
  value,
}) {
  return (
    <div className="
      bg-white
      rounded-2xl
      p-6
      shadow-sm
      border
      border-slate-200
    ">

      <p className="
        text-sm
        text-slate-500
        mb-2
      ">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-bold
        text-slate-900
      ">
        {value}
      </h2>

    </div>
  );
}
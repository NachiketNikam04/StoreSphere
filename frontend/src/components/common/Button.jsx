export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-medium
        py-3
        rounded-xl
        transition
        duration-200
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
export default function InputField({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="
          w-full
          px-4
          py-3
          border
          border-slate-300
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
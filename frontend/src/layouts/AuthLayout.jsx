export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white p-16 flex-col justify-center">

        <h1 className="text-5xl font-bold leading-tight">
          Store Rating
          <br />
          Platform
        </h1>

        <p className="mt-6 text-lg text-blue-100 max-w-md">
          Manage stores, track customer feedback,
          and monitor ratings through a centralized
          business dashboard.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>Store Management</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>Review Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>Role Based Access</span>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>

          </div>

          {children}

        </div>

      </div>

    </div>
  );
}
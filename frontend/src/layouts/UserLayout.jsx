import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserLayout({
  children,
}) {

  const { logout } =
    useAuth();

  return (
    <div className="min-h-screen flex bg-slate-100">

      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-xl font-bold">
            Store Rating
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            User Panel
          </p>

        </div>

        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/user/stores"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Browse Stores
          </NavLink>

          <NavLink
            to="/user/ratings"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            My Ratings
          </NavLink>

          <NavLink
  to="/user/profile"
  className="block px-4 py-3 rounded-lg hover:bg-slate-800"
>
  Profile
</NavLink>

        </nav>

        <div className="p-4">

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1">

        <header className="bg-white border-b px-8 py-5">

          <h2 className="text-2xl font-semibold text-slate-800">
            User Dashboard
          </h2>

        </header>

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}
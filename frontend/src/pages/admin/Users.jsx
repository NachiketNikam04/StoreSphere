import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserDetailsModal from "../../components/admin/UserDetailsModal";
import AddUserModal from "../../components/admin/AddUserModal";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `/admin/users?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setUsers(response.data.users || response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order]);

  const handleViewUser = async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      setSelectedUser(response.data.user || response.data);
      setIsDetailsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* 🟢 FIX: Added Fragment here to bundle adjacent elements safely */}
      <>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Users</h1>
            <p className="text-slate-500">Manage platform users and roles</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Add User
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="text-left p-4 cursor-pointer"
                  onClick={() => {
                    setSortBy("name");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Name ↕
                </th>
                <th
                  className="text-left p-4 cursor-pointer"
                  onClick={() => {
                    setSortBy("email");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Email ↕
                </th>
                <th
                  className="text-left p-4 cursor-pointer"
                  onClick={() => {
                    setSortBy("role");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Role ↕
                </th>
                <th className="text-left p-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-slate-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleViewUser(user.id)}
                    className="border-t hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-4 font-medium text-slate-900">
                      {user.name}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">{user.address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserCreated={fetchUsers}
        />

        <UserDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          user={selectedUser}
        />
      </>
    </AdminLayout>
  );
}
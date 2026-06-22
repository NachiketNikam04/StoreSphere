import { useEffect, useState } from "react";
import AddStoreModal from "../../components/admin/AddStoreModal";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStores = async () => {
    try {
      const response = await api.get(
        `/admin/stores?search=${search}&sortBy=${sortBy}&order=${order}`
      );

      setStores(response.data.stores || response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [search, sortBy, order]);

  return (
    <AdminLayout>
      {/* 🟢 FIX: Wrapped adjacent items inside a React Fragment */}
      <>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Stores</h1>
            <p className="text-slate-500">Manage platform stores</p>
          </div>

          <button
  onClick={() =>
    setIsModalOpen(true)
  }
  className="
    bg-blue-600
    text-white
    px-5
    py-3
    rounded-xl
  "
>
  Add Store
</button>
        </div>

        <input
          type="text"
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            mb-6
            px-4
            py-3
            border
            border-slate-300
            rounded-xl
          "
        />

        <div
          className="
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-sm
          "
        >
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th
                  className="
                    p-4
                    text-left
                    cursor-pointer
                  "
                  onClick={() => {
                    setSortBy("name");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Store Name ↕
                </th>
                <th
                  className="
                    p-4
                    text-left
                    cursor-pointer
                  "
                  onClick={() => {
                    setSortBy("email");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Email ↕
                </th>
                <th className="p-4 text-left">Address</th>
                <th
                  className="
                    p-4
                    text-left
                    cursor-pointer
                  "
                  onClick={() => {
                    setSortBy("rating");
                    setOrder(order === "ASC" ? "DESC" : "ASC");
                  }}
                >
                  Rating ↕
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr
                  key={store.id}
                  className="
                    border-t
                    hover:bg-slate-50
                  "
                >
                  <td className="p-4">{store.name}</td>
                  <td className="p-4">{store.email}</td>
                  <td className="p-4">{store.address}</td>
                  <td className="p-4">⭐ {store.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>

      <AddStoreModal
  isOpen={isModalOpen}
  onClose={() =>
    setIsModalOpen(false)
  }
  onStoreCreated={fetchStores}
/>
    </AdminLayout>
  );
}
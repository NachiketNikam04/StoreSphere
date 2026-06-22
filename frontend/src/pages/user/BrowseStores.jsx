import { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";
import RateStoreModal from "../../components/user/RateStoreModal";
import api from "../../api/axios";

export default function BrowseStores() {

  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const fetchStores =
    async () => {

      try {

        const response =
          await api.get(
            `/user/stores?search=${search}`
          );

        setStores(
          response.data.stores || []
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchStores();

  }, [search]);

  const openRatingModal =
    (store) => {

      setSelectedStore(store);

      setIsModalOpen(true);

    };

  return (
    <UserLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Browse Stores
        </h1>

        <p className="text-slate-500">
          Search stores and submit ratings
        </p>

      </div>

      <input
        type="text"
        placeholder="Search stores..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
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

              <th className="p-4 text-left">
                Store
              </th>

              <th className="p-4 text-left">
                Address
              </th>

              <th className="p-4 text-left">
                Average Rating
              </th>

              <th className="p-4 text-left">
                My Rating
              </th>

              <th className="p-4 text-left">
                Action
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

                <td className="p-4">
                  {store.name}
                </td>

                <td className="p-4">
                  {store.address}
                </td>

                <td className="p-4">
                  ⭐ {store.overall_rating}
                </td>

                <td className="p-4">

                  {store.user_rating
                    ? `⭐ ${store.user_rating}`
                    : "Not Rated"}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      openRatingModal(
                        store
                      )
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >

                    {store.user_rating
                      ? "Update"
                      : "Rate"}

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <RateStoreModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSuccess={fetchStores}
        store={selectedStore}
      />

    </UserLayout>
  );
}
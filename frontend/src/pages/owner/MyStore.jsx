import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function MyStore() {

  const [store, setStore] =
    useState(null);

  const fetchStore =
    async () => {

      try {

        const response =
          await api.get(
            "/owner/dashboard"
          );

        if (
          response.data.stores.length
        ) {
          setStore(
            response.data.stores[0]
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchStore();

  }, []);

  const handleChange =
    (e) => {

      setStore({
        ...store,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.put(
          `/owner/store/${store.id}`,
          {
            name: store.name,
            email: store.email,
            address: store.address,
          }
        );

        toast.success(
          "Store updated successfully"
        );

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to update store"
        );

      }
    };

  if (!store) {

    return (
      <OwnerLayout>
        <div>
          Loading Store...
        </div>
      </OwnerLayout>
    );

  }

  return (
    <OwnerLayout>

      <div className="max-w-3xl">

        <h1 className="text-3xl font-bold mb-2">
          My Store
        </h1>

        <p className="text-slate-500 mb-8">
          Manage your store information
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <div className="mb-6">

            <p className="text-slate-500">
              Average Rating
            </p>

            <h2 className="text-3xl font-bold">
              ⭐ {store.average_rating}
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              value={store.name}
              onChange={handleChange}
              placeholder="Store Name"
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <input
              type="email"
              name="email"
              value={store.email}
              onChange={handleChange}
              placeholder="Store Email"
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <textarea
              name="address"
              value={store.address}
              onChange={handleChange}
              rows="4"
              placeholder="Store Address"
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </OwnerLayout>
  );
}
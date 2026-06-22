import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/axios";

export default function AddStoreModal({
  isOpen,
  onClose,
  onStoreCreated,
}) {

  const [owners, setOwners] =
    useState([]);

  const [formData, setFormData] =
    useState({
      owner_id: "",
      name: "",
      email: "",
      address: "",
    });

  useEffect(() => {

    if (isOpen) {
      fetchOwners();
    }

  }, [isOpen]);

  const fetchOwners =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/users?role=STORE_OWNER"
          );

        setOwners(
          response.data.users
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/stores",
          formData
        );

        toast.success(
          "Store created successfully"
        );

        onStoreCreated();

        onClose();

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to create store"
        );

      }
    };

  if (!isOpen) return null;

  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        p-6
        w-full
        max-w-lg
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Add Store
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          >

            <option value="">
              Select Store Owner
            </option>

            {owners.map((owner) => (

              <option
                key={owner.id}
                value={owner.id}
              >
                {owner.name}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
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
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          <input
            type="text"
            name="address"
            placeholder="Store Address"
            value={formData.address}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          <div className="
            flex
            justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={onClose}
              className="
                border
                px-4
                py-2
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Create Store
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/axios";

export default function AddUserModal({
  isOpen,
  onClose,
  onUserCreated,
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      password: "",
      role: "NORMAL_USER",
    });

  if (!isOpen) return null;

  const handleChange = (e) => {

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
          "/admin/users",
          formData
        );

        toast.success(
          "User created successfully"
        );

        onUserCreated();

        onClose();

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to create user"
        );

      }
    };

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
        w-full
        max-w-lg
        rounded-2xl
        p-6
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Add New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
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
            placeholder="Email"
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
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          >
            <option value="NORMAL_USER">
              Normal User
            </option>

            <option value="STORE_OWNER">
              Store Owner
            </option>

            <option value="ADMIN">
              Admin
            </option>
          </select>

          <div className="
            flex
            justify-end
            gap-3
            pt-2
          ">

            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                border
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                bg-blue-600
                text-white
                rounded-lg
              "
            >
              Create User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

import AdminLayout from "../../layouts/AdminLayout";
import UserLayout from "../../layouts/UserLayout";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/me");
      setFormData(response.data.user || response.data || { name: "", email: "", address: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/profile", formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile"
      );
    }
  };

  let Layout = UserLayout;

  if (user?.role === "ADMIN") {
    Layout = AdminLayout;
  }

  if (user?.role === "STORE_OWNER") {
    Layout = OwnerLayout;
  }

  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-slate-500 mb-8">Manage your account details</p>

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
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
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              rows="4"
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <div
              className="
                flex
                gap-3
              "
            >
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

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="
                  border
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
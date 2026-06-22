import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/axios";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("NORMAL_USER");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "signup failed");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join Store Rating Platform">
      {/* 🟢 FIX: Wrap adjacent sibling components in a React Fragment */}
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter full name"
            register={register}
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            register={register}
            error={errors.email}
          />

          <InputField
            label="Address"
            name="address"
            placeholder="Enter address"
            register={register}
            error={errors.address}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            register={register}
            error={errors.password}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              {...register("role")}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="NORMAL_USER">Normal User</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
          </div>

          {role === "STORE_OWNER" && (
            <InputField
              label="Owner Code"
              name="ownerCode"
              placeholder="Enter owner code"
              register={register}
              error={errors.ownerCode}
            />
          )}

          <Button type="submit">Create Account</Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Already have an account?
          </Link>
        </div>
      </>
    </AuthLayout>
  );
}
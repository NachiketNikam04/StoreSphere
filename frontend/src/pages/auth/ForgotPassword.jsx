import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import api from "../../api/axios";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", data);
      toast.success("Password updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Password reset failed"
      );
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Verify your account details">
      {/* 🟢 FIX: Wrap adjacent sibling elements in a React Fragment */}
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            register={register}
            error={errors.email}
          />

          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter full name"
            register={register}
            error={errors.name}
          />

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            register={register}
            error={errors.newPassword}
          />

          <Button type="submit">Reset Password</Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Back To Login
          </Link>
        </div>
      </>
    </AuthLayout>
  );
}
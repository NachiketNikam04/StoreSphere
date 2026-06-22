import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

export default function Login() {

const navigate = useNavigate();

const { setUser } = useAuth();

const {
register,
handleSubmit,
formState: { errors },
} = useForm();

const onSubmit = async (data) => {

  console.log("STEP 1");

  try {

    console.log("STEP 2");

    const response =
      await api.post(
        "/auth/login",
        data
      );

    console.log("STEP 3");

    const {
      token,
      user,
    } = response.data;

    console.log("STEP 4");

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    console.log("STEP 5");

    setUser(user);

    console.log("STEP 6");

    toast.success(
      "Login successful"
    );

    console.log("STEP 7");

    if (user.role === "ADMIN") {

  navigate(
    "/admin/dashboard"
  );

} else if (
  user.role === "NORMAL_USER"
) {

  navigate(
    "/user/stores"
  );

} else if (
  user.role === "STORE_OWNER"
) {

  navigate(
    "/owner/dashboard"
  );

}

  } catch (error) {

    console.log(error);
    toast.error(
    error?.response?.data?.message ||
    "Login failed");
  }
};

return ( <AuthLayout
   title="Welcome Back"
   subtitle="Login to continue"
 >

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >

    <InputField
  label="Email"
  name="email"
  type="email"
  placeholder="Enter email"
  register={register}
  error={errors.email}
/>

    <InputField
      label="Password"
      name="password"
      type="password"
      placeholder="Enter password"
      register={register}
      error={errors.password}
    />

    <Button type="submit">
      Sign In
    </Button>

  </form>

  <div className="mt-6 flex justify-between text-sm">

    <Link
      to="/forgot-password"
      className="text-blue-600 hover:text-blue-700"
    >
      Forgot Password?
    </Link>

    <Link
      to="/signup"
      className="text-blue-600 hover:text-blue-700"
    >
      Create Account
    </Link>

  </div>

</AuthLayout>


);
}

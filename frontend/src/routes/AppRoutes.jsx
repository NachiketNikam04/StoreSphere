import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";

import BrowseStores from "../pages/user/BrowseStores";
import MyRatings from "../pages/user/MyRatings";

import OwnerDashboard from "../pages/owner/Dashboard";
import Reviews from "../pages/owner/Reviews";

import Profile from "../pages/profile/Profile";
import MyStore from "../pages/owner/MyStore";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
            path="/admin/dashboard"
            element={
                <ProtectedRoute
                    allowedRole="ADMIN"
                >
            <AdminDashboard />
           </ProtectedRoute>
        }
        />

        <Route
  path="/user/stores"
  element={
    <ProtectedRoute
      allowedRole="NORMAL_USER"
    >
      <BrowseStores />
    </ProtectedRoute>
  }
/>

        <Route
  path="/admin/users"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <Users />
    </ProtectedRoute>
  }
/>

        <Route
  path="/admin/stores"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <Stores />
    </ProtectedRoute>
  }
/>

        <Route
  path="/user/ratings"
  element={
    <ProtectedRoute
      allowedRole="NORMAL_USER"
    >
      <MyRatings />
    </ProtectedRoute>
  }
/>

        <Route
  path="/owner/dashboard"
  element={
    <ProtectedRoute
      allowedRole="STORE_OWNER"
    >
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/owner/reviews"
  element={
    <ProtectedRoute
      allowedRole="STORE_OWNER"
    >
      <Reviews />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/profile"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/user/profile"
  element={
    <ProtectedRoute
      allowedRole="NORMAL_USER"
    >
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/owner/profile"
  element={
    <ProtectedRoute
      allowedRole="STORE_OWNER"
    >
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/owner/store"
  element={
    <ProtectedRoute
      allowedRole="STORE_OWNER"
    >
      <MyStore />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}
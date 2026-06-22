import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import MetricCard from "../../components/common/MetricCard";

import api from "../../api/axios";

export default function Dashboard() {

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalStores: 0,
      totalRatings: 0,
    });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/dashboard"
          );

        setStats({
            totalUsers:
                response.data.stats.totalUsers,

            totalStores:
                response.data.stats.totalStores,

            totalRatings:
                response.data.stats.totalRatings,
        });

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <AdminLayout>

      <div className="mb-8">

        <h1 className="
          text-3xl
          font-bold
          text-slate-900
        ">
          Dashboard Overview
        </h1>

        <p className="
          text-slate-500
          mt-2
        ">
          Monitor platform activity
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        <MetricCard
          title="Total Users"
          value={
            stats.totalUsers
          }
        />

        <MetricCard
          title="Total Stores"
          value={
            stats.totalStores
          }
        />

        <MetricCard
          title="Total Ratings"
          value={
            stats.totalRatings
          }
        />

      </div>

    </AdminLayout>
  );
}
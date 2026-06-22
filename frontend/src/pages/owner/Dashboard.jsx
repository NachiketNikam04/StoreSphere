import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";
import api from "../../api/axios";

export default function Dashboard() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const response =
          await api.get(
            "/owner/dashboard"
          );

        setData(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <OwnerLayout>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500">
            Stores Managed
          </h3>
          <p className="text-3xl font-bold mt-2">
            {data?.storesManaged || 0}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Store
              </th>

              <th className="p-4 text-left">
                Average Rating
              </th>

            </tr>

          </thead>

          <tbody>

            {data?.stores?.map(
              (store) => (

                <tr
                  key={store.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {store.name}
                  </td>

                  <td className="p-4">
                    ⭐ {store.average_rating}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </OwnerLayout>
  );
}
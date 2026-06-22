import { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";
import api from "../../api/axios";

export default function MyRatings() {

  const [ratings, setRatings] =
    useState([]);

  const fetchRatings =
    async () => {

      try {

        const response =
          await api.get(
            "/user/my-ratings"
          );

        setRatings(
          response.data.ratings || []
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchRatings();

  }, []);

  return (
    <UserLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          My Ratings
        </h1>

        <p className="text-slate-500">
          Ratings submitted by you
        </p>

      </div>

      <div className="
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
      ">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Store
              </th>

              <th className="p-4 text-left">
                Rating
              </th>

              <th className="p-4 text-left">
                Review
              </th>

              <th className="p-4 text-left">
                Updated
              </th>

            </tr>

          </thead>

          <tbody>

            {ratings.map((rating) => (

              <tr
                key={rating.id}
                className="
                  border-t
                  hover:bg-slate-50
                "
              >

                <td className="p-4">
                  {rating.store_name}
                </td>

                <td className="p-4">
                  ⭐ {rating.rating}
                </td>

                <td className="p-4">
                  {rating.review_text || "-"}
                </td>

                <td className="p-4">
                  {new Date(
                    rating.updated_at
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </UserLayout>
  );
}
import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";
import api from "../../api/axios";

export default function Reviews() {

  const [reviews, setReviews] =
    useState([]);

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews =
    async () => {

      try {

        const response =
          await api.get(
            "/owner/reviews"
          );

        setReviews(
          response.data.reviews || []
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <OwnerLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Reviews
        </h1>

        <p className="text-slate-500">
          Ratings submitted by users
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Store
              </th>

              <th className="p-4 text-left">
                Rating
              </th>

              <th className="p-4 text-left">
                Review
              </th>

            </tr>

          </thead>

          <tbody>

            {reviews.map(
              (review, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="p-4">
                    {review.name}
                  </td>

                  <td className="p-4">
                    {review.email}
                  </td>

                  <td className="p-4">
                    {review.store_name}
                  </td>

                  <td className="p-4">
                    ⭐ {review.rating}
                  </td>

                  <td className="p-4">
                    {review.review_text || "-"}
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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../api/axios";

export default function RateStoreModal({
  isOpen,
  onClose,
  onSuccess,
  store,
}) {

  const [rating, setRating] =
    useState("");

  const [reviewText, setReviewText] =
    useState("");

  useEffect(() => {

    if (store) {

      setRating(
        store.user_rating || ""
      );

      setReviewText("");

    }

  }, [store]);

  if (!isOpen) return null;

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/user/rating",
          {
            store_id: store.id,
            rating:
              Number(rating),
            review_text:
              reviewText,
          }
        );

        toast.success(
          "Rating saved successfully"
        );

        onSuccess();

        onClose();

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to save rating"
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
        rounded-2xl
        p-6
        w-full
        max-w-lg
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Rate Store
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
            required
          >

            <option value="">
              Select Rating
            </option>

            <option value="1">
              1 Star
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="5">
              5 Stars
            </option>

          </select>

          <textarea
            rows="4"
            placeholder="Write review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          <div className="
            flex
            justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={onClose}
              className="
                border
                px-4
                py-2
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Save Rating
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
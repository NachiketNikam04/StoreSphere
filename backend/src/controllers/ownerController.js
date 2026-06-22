const pool = require("../config/db");

exports.getDashboard =
  async (req, res) => {
    try {

      const stores =
        await pool.query(
          `
          SELECT

s.id,
s.name,
s.email,
s.address,

ROUND(
  COALESCE(
    AVG(r.rating),
    0
  ),
  2
) AS average_rating

          FROM stores s

          LEFT JOIN ratings r
          ON s.id = r.store_id

          WHERE
          s.owner_id = $1

          GROUP BY s.id

          ORDER BY s.name ASC
          `,
          [req.user.id]
        );

      res.json({
        success: true,

        storesManaged:
          stores.rows.length,

        stores:
          stores.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

  exports.getReviews =
  async (req, res) => {
    try {

      const {
        sortBy = "rating",
        order = "DESC",
      } = req.query;

      const allowedSortFields = [
        "name",
        "email",
        "rating",
      ];

      const safeSortBy =
        allowedSortFields.includes(
          sortBy
        )
          ? sortBy
          : "rating";

      const safeOrder =
        order.toUpperCase() ===
        "ASC"
          ? "ASC"
          : "DESC";

      const reviews =
        await pool.query(
          `
          SELECT

          u.name,

          u.email,

          u.address,

          s.name AS store_name,

          r.rating,

          r.review_text,

          r.updated_at

          FROM ratings r

          JOIN users u
          ON u.id = r.user_id

          JOIN stores s
          ON s.id = r.store_id

          WHERE
          s.owner_id = $1

          ORDER BY
          ${safeSortBy}
          ${safeOrder}
          `,
          [req.user.id]
        );

      res.json({
        success: true,
        reviews:
          reviews.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

  exports.updateStore =
  async (req, res) => {

    try {

      const {
        name,
        email,
        address,
      } = req.body;

      const store =
        await pool.query(
          `
          UPDATE stores

          SET
          name = $1,
          email = $2,
          address = $3

          WHERE
          id = $4
          AND owner_id = $5

          RETURNING *
          `,
          [
            name,
            email,
            address,
            req.params.id,
            req.user.id,
          ]
        );

      if (
        !store.rows.length
      ) {
        return res.status(404)
          .json({
            message:
              "Store not found",
          });
      }

      res.json({
        success: true,
        store:
          store.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error",
        });

    }
  };
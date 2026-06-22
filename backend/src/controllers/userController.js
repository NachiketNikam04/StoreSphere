const pool = require("../config/db");

exports.getStores = async (req, res) => {
  try {

    const { search = "" } = req.query;

    const stores = await pool.query(
      `
      SELECT

      s.id,
      s.owner_id,
      s.name,
      s.email,
      s.address,

      ROUND(
        COALESCE(
          AVG(r.rating),
          0
        ),
        2
      ) AS overall_rating,

      (
        SELECT rating
        FROM ratings
        WHERE
        user_id = $2
        AND store_id = s.id
      ) AS user_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE
      (
        s.name ILIKE $1
        OR s.address ILIKE $1
      )

      GROUP BY s.id

      ORDER BY s.name ASC
      `,
      [
        `%${search}%`,
        req.user.id
      ]
    );

    res.json({
      success: true,
      stores: stores.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

exports.submitOrUpdateRating = async (req, res) => {
  try {

    const {
      store_id,
      rating,
      review_text
    } = req.body;

    const store =
  await pool.query(
    `
    SELECT *
    FROM stores
    WHERE id = $1
    `,
    [store_id]
  );

if (!store.rows.length) {
  return res.status(404).json({
    message:
      "Store not found",
  });
}

    if (
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5"
      });
    }

    const existing =
      await pool.query(
        `
        SELECT *
        FROM ratings
        WHERE
        user_id=$1
        AND store_id=$2
        `,
        [
          req.user.id,
          store_id
        ]
      );

    if (existing.rows.length) {

      const updated =
        await pool.query(
          `
          UPDATE ratings

          SET

          rating=$1,
          review_text=$2,
          updated_at=CURRENT_TIMESTAMP

          WHERE

          user_id=$3
          AND store_id=$4

          RETURNING *
          `,
          [
            rating,
            review_text || null,
            req.user.id,
            store_id
          ]
        );

      return res.json({
        success: true,
        action: "UPDATED",
        rating: updated.rows[0]
      });
    }

    const created =
      await pool.query(
        `
        INSERT INTO ratings
        (
          user_id,
          store_id,
          rating,
          review_text
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          req.user.id,
          store_id,
          rating,
          review_text || null
        ]
      );

    res.status(201).json({
      success: true,
      action: "CREATED",
      rating: created.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

exports.myRatings = async (req, res) => {
  try {

    const ratings =
      await pool.query(
        `
        SELECT

        r.id,

        s.name AS store_name,

        r.rating,

        r.review_text,

        r.created_at,

        r.updated_at

        FROM ratings r

        JOIN stores s
        ON s.id = r.store_id

        WHERE
        r.user_id = $1

        ORDER BY
        r.updated_at DESC
        `,
        [req.user.id]
      );

    res.json({
      success: true,
      ratings: ratings.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};
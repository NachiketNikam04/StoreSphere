const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getDashboardStats =
  async (req, res) => {
    try {

      const users =
        await pool.query(
          "SELECT COUNT(*) FROM users"
        );

      const stores =
        await pool.query(
          "SELECT COUNT(*) FROM stores"
        );

      const ratings =
        await pool.query(
          "SELECT COUNT(*) FROM ratings"
        );

      res.json({
        success: true,

        stats: {
          totalUsers:
            Number(
              users.rows[0]
                .count
            ),

          totalStores:
            Number(
              stores.rows[0]
                .count
            ),

          totalRatings:
            Number(
              ratings.rows[0]
                .count
            ),
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

exports.createUser =
  async (req, res) => {
    try {

      const {
        name, // Frontend sends "name"
        email,
        address,
        password,
        role,
      } = req.body;

      // Split frontend input to match DB first_name and last_name layout
      const nameParts = name ? name.split(" ") : ["", ""];
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(" ") || " ";

      const existing =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email=$1
          `,
          [email]
        );

      if (
        existing.rows.length
      ) {
        return res
          .status(400)
          .json({
            message:
              "Email already exists",
          });
      }

      const hash =
        await bcrypt.hash(
          password,
          10
        );

      const result =
        await pool.query(
          `
          INSERT INTO users
          (
            first_name,
            last_name,
            email,
            mobile,
            address,
            password_hash,
            role
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7)
          RETURNING id, name AS name, email, address, role
          `,
          [
            first_name,
            last_name,
            email,
            "9999999999", // Default fallback string value for admin-created entries
            address,
            hash,
            role,
          ]
        );

      res.status(201)
        .json({
          success: true,
          user:
            result.rows[0],
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

exports.createStore =
  async (req, res) => {
    try {

      const {
        owner_id,
        name,
        email,
        address,
      } = req.body;

      const owner =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE id=$1
          AND role='STORE_OWNER'
          `,
          [owner_id]
        );

      if (
        !owner.rows.length
      ) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Store Owner",
          });
      }

      const result =
        await pool.query(
          `
          INSERT INTO stores
          (
            owner_id,
            name,
            email,
            address
          )
          VALUES
          ($1,$2,$3,$4)
          RETURNING *
          `,
          [
            owner_id,
            name,
            email,
            address,
          ]
        );

      res.status(201)
        .json({
          success: true,
          store:
            result.rows[0],
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

exports.getUsers =
  async (req, res) => {
    try {

      const {
        search = "",
        role,
        sortBy = "name",
        order = "ASC",
      } = req.query;

      // Map incoming frontend "name" parameters to "name" computed string column
      const DB_SORT_FIELD = sortBy === "name" ? "name" : sortBy;

      let query = `
      SELECT
      id,
      name AS name,
      email,
      address,
      role
      FROM users
      WHERE
      (
        name ILIKE $1
        OR email ILIKE $1
        OR address ILIKE $1
      )
      `;

      const values = [
        `%${search}%`,
      ];

      if (role) {
        query += ` AND role=$${values.length + 1}`;
        values.push(role);
      }

      const allowedSortFields = [
        "id",
        "name",
        "email",
        "address",
        "role",
      ];
      
      const safeSortBy =
        allowedSortFields.includes(DB_SORT_FIELD)
        ? DB_SORT_FIELD
        : "name";
    
      const safeOrder =
        order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";    

      query += ` ORDER BY ${safeSortBy} ${safeOrder}`;

      const users =
        await pool.query(
          query,
          values
        );

      res.json({
        success: true,
        users:
          users.rows,
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

exports.getUserById =
  async (req, res) => {
    try {

      const { id } = req.params;

      const user =
        await pool.query(
          `
          SELECT
          id,
          name AS name,
          email,
          address,
          role
          FROM users
          WHERE id = $1
          `,
          [id]
        );

      if (
        !user.rows.length
      ) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const userData =
        user.rows[0];

      if (
        userData.role ===
        "STORE_OWNER"
      ) {

        const stats =
          await pool.query(
            `
            SELECT

            COUNT(DISTINCT s.id)
            AS stores_managed,

            ROUND(
              COALESCE(
                AVG(r.rating),
                0
              ),
              2
            ) AS average_rating

            FROM stores s

            LEFT JOIN ratings r
            ON r.store_id = s.id

            WHERE
            s.owner_id = $1
            `,
            [id]
          );

        return res.json({
          success: true,

          user: {
            ...userData,

            storesManaged:
              Number(
                stats.rows[0]
                  .stores_managed
              ),

            averageRating:
              Number(
                stats.rows[0]
                  .average_rating
              ),
          },
        });
      }

      res.json({
        success: true,
        user: userData,
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

exports.getStores =
  async (req, res) => {
    try {

      const {
        search = "",
        sortBy = "name",
        order = "ASC",
      } = req.query;

      const allowedSortFields = [
        "name",
        "email",
        "address",
        "rating",
      ];

      const safeSortBy =
        allowedSortFields.includes(sortBy)
        ? sortBy
        : "name";

      const safeOrder =
        order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

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
          ) AS rating

          FROM stores s

          LEFT JOIN ratings r
          ON s.id = r.store_id

          WHERE
          (
            s.name ILIKE $1
            OR s.email ILIKE $1
            OR s.address ILIKE $1
          )

          GROUP BY s.id

          ORDER BY ${safeSortBy} ${safeOrder}
          `,
          [
            `%${search}%`,
          ]
        );

      res.json({
        success: true,
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

exports.getStoreOwners =
  async (req, res) => {
    try {

      const owners =
        await pool.query(
          `
          SELECT

          id,
          name AS name,
          email

          FROM users

          WHERE role =
          'STORE_OWNER'

          ORDER BY
          name ASC
          `
        );

      res.json({
        success: true,
        owners:
          owners.rows,
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
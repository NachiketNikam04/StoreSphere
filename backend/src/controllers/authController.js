const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateEmail,
  validatePassword,
} = require("../utils/validation");

exports.signup = async (req, res) => {
  try {
    const {
        name,
        email,
        address,
        password,
        role,
        ownerCode,
    } = req.body;

    if (
        name.length < 20 ||
        name.length > 60
    ) {
      return res.status(400).json({
        message:
          "Name must be between 20 and 60 characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 chars with uppercase and special character",
      });
    }

    if (address.length > 400) {
      return res.status(400).json({
        message:
          "Address cannot exceed 400 characters",
      });
    }

    // console.log("ROLE:", role);
    // console.log("BODY ownerCode:", ownerCode);
    // console.log("ENV ownerCode:", process.env.OWNER_CODE);

    if (
        role === "STORE_OWNER" &&
        ownerCode?.trim() !== process.env.OWNER_CODE?.trim()
    ) {
        return res.status(400).json({
        message: "Invalid owner code",
        });
    }

    const existingUser =
      await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
      );

    if (existingUser.rows.length) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash =
      await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        address,
        password_hash,
        role
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        name,
        email,
        address,
        hash,
        role,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Account created",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      [email]
    );
    // console.log("EMAIL:", email);
    // console.log("USER FOUND:", user.rows.length);

    if (!user.rows.length) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const dbUser = user.rows[0];

    const isMatch =
      await bcrypt.compare(
        password,
        dbUser.password_hash
      );
    // console.log("PASSWORD MATCH:", isMatch);  

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: dbUser.id,
        role: dbUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const {
      email,
      name,
      newPassword,
    } = req.body;

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 chars with uppercase and special character",
      });
    }

    const user = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      AND name = $2
      `,
      [email, name]
    );

    if (!user.rows.length) {
      return res.status(400).json({
        message:
          "Incorrect verification details",
      });
    }

    const hash =
      await bcrypt.hash(
        newPassword,
        10
      );

    await pool.query(
      `
      UPDATE users
      SET password_hash=$1,
      updated_at=CURRENT_TIMESTAMP
      WHERE id=$2
      `,
      [
        hash,
        user.rows[0].id,
      ]
    );

    res.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
      `,
      [req.user.id]
    );

    const dbUser =
      user.rows[0];

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        dbUser.password_hash
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password incorrect",
      });
    }

    if (
      !validatePassword(
        newPassword
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid password format",
      });
    }

    const hash =
      await bcrypt.hash(
        newPassword,
        10
      );

    await pool.query(
      `
      UPDATE users
      SET password_hash=$1,
      updated_at=CURRENT_TIMESTAMP
      WHERE id=$2
      `,
      [
        hash,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getCurrentUser =
  async (req, res) => {
    try {
      const user =
        await pool.query(
          `
          SELECT
          id,
          name,
          email,
          role,
          address
          FROM users
          WHERE id=$1
          `,
          [req.user.id]
        );

      res.json({
        success: true,
        user:
          user.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

  exports.updateProfile =
  async (req, res) => {
    try {

      const {
        name,
        email,
        address,
      } = req.body;

      const existing =
        await pool.query(
          `
          SELECT id
          FROM users
          WHERE email = $1
          AND id != $2
          `,
          [
            email,
            req.user.id,
          ]
        );

      if (
        existing.rows.length
      ) {
        console.log("REQ USER ID:", req.user.id);
        console.log("EMAIL:", email);
        console.log("EXISTING:", existing.rows);
        return res.status(400)
          .json({
            message:
              "Email already exists",
          });
      }

      const updated =
        await pool.query(
          `
          UPDATE users

          SET
          name = $1,
          email = $2,
          address = $3,
          updated_at =
          CURRENT_TIMESTAMP

          WHERE id = $4

          RETURNING
          id,
          name,
          email,
          role,
          address
          `,
          [
            name,
            email,
            address,
            req.user.id,
          ]
        );

      res.json({
        success: true,
        user:
          updated.rows[0],
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
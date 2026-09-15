import { Router } from "express";
const signupRouter = Router();
import { pool } from "../db/pool.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

signupRouter.get("/sign-up", (req, res) => {
  res.render("logform", {
    title: "Sign Up!",
    isSignUp: true,
    errors: [],
    formData: {},
  });
});

const signupValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 50 })
    .withMessage("First name must be under 50 characters."),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ max: 50 })
    .withMessage("Last name must be under 50 characters."),
  body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

signupRouter.post("/sign-up", signupValidation, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("logform", {
      title: "Sign Up!",
      isSignUp: true,
      errors: errors.array(),
      formData: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
      },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.username,
        hashedPassword,
        false,
        false,
      ],
    );
    res.redirect("/login");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("logform", {
        title: "Sign Up!",
        isSignUp: true,
        errors: [{ msg: "That username (email) is already registered." }],
        formData: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
        },
      });
    }
    next(error);
  }
});

export default signupRouter;

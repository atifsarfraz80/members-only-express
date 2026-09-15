import { Router } from "express";
const signupRouter = Router();
import { pool } from "../db/pool.js";
import bcrypt from "bcryptjs";

signupRouter.get("/sign-up", (req, res) => {
  res.render("logform", { title: "Sign Up!", isSignUp: true });
});

signupRouter.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO users (first_name,last_name,username, password,membership_status,is_admin) VALUES ($1, $2,$3,$4,$5,$6)",
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
    console.error(error);
    next(error);
  }
});

export default signupRouter;

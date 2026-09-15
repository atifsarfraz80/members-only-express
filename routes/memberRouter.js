import { Router } from "express";
const memberRouter = Router();
import { pool } from "../db/pool.js";
import { IsLoggedIn } from "../middleware/auth.js";

memberRouter.get("/member", IsLoggedIn, (req, res, next) => {
  res.render("member");
});

memberRouter.post("/member", IsLoggedIn, async (req, res, next) => {
  try {
    const key = req.body.key;
    if (!req.user) {
      return res.redirect("/login");
    }

    if (key === "meownigga") {
      await pool.query(
        "UPDATE users SET membership_status = true WHERE id = $1",
        [req.user.id],
      );

      req.user.membership_status = true;
    }

    res.redirect("/get-messages");
  } catch (error) {
    next(error);
  }
});

export default memberRouter;

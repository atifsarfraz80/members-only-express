import { Router } from "express";
const deletemsgRouter = Router();
import { pool } from "../db/pool.js";
import { IsLoggedIn } from "../middleware/auth.js";
import { IsAdmin } from "../middleware/auth.js";

deletemsgRouter.post(
  "/deletemsg/:id",
  IsLoggedIn,
  IsAdmin,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await pool.query("DELETE FROM messages WHERE id = $1", [id]);
      res.redirect("/get-messages");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
);

export default deletemsgRouter;

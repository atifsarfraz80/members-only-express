import { Router } from "express";
const getmessageRouter = Router();
import { pool } from "../db/pool.js";
import { IsLoggedIn } from "../middleware/auth.js";

getmessageRouter.get("/get-messages", IsLoggedIn, async (req, res, next) => {
  try {
    const query = `
      SELECT 
        messages.id,
        messages.title,
        messages.text,
        messages.timestamp,
        users.first_name,
        users.last_name,
        users.username AS author_username
      FROM messages
      INNER JOIN users ON messages.user_id = users.id
      ORDER BY messages.timestamp DESC;
    `;
    const { rows } = await pool.query(query);
    res.render("message", { allmessages: rows, user: req.user });
  } catch (error) {
    next(error);
  }
});

export default getmessageRouter;

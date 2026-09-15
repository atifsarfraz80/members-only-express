import { Router } from "express";
const createmessageRouter = Router();
import { pool } from "../db/pool.js";
import { IsLoggedIn } from "../middleware/auth.js";

createmessageRouter.get("/create-message", IsLoggedIn, (req, res) => {
  res.render("messageform");
});

createmessageRouter.post("/create-message", IsLoggedIn, async (req, res) => {
  const user = req.user;
  const title = req.body.title;
  const text = req.body.text;

  await pool.query(
    "INSERT into messages (title,text,timestamp,user_id) VALUES ($1,$2,$3,$4)",
    [title, text, new Date().toISOString(), user.id],
  );

  res.redirect("/get-messages");
});

export default createmessageRouter;

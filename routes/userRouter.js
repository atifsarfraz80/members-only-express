import { Router } from "express";
import { IsLoggedIn } from "../middleware/auth.js";
const userRouter = Router();

userRouter.get("/user", IsLoggedIn, (req, res) => {
  res.render("user", { user: req.user });
});

export default userRouter;

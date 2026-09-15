import { Router } from "express";
const userRouter = Router();

userRouter.get("/user", (req, res) => {
  res.render("user", { user: req.user });
});

export default userRouter;

import { Router } from "express";
const homeRouter = Router();

homeRouter.get("/", (req, res, next) => {
  res.render("home");
});

export default homeRouter;

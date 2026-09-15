import { Router } from "express";
const loginRouter = Router();
import passport from "passport";
import LocalStrategy from "passport-local";
import "../passport.js";

loginRouter.get("/login", (req, res) => {
  res.render("logform", {
    title: "Login!",
    isSignUp: false,
    errors: [],
    formData: {},
  });
});

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);

loginRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default loginRouter;

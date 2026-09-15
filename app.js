/////// app.js
import path from "node:path";
import express from "express";
import session from "express-session";
import passport from "passport";
import homeRouter from "./routes/homeRouter.js";
import signupRouter from "./routes/signupRouter.js";
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import memberRouter from "./routes/memberRouter.js";

const app = express();
const __dirname = import.meta.dirname;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: "ilovecats", resave: false, saveUninitialized: false }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", homeRouter);
app.use("/", signupRouter);
app.use("/", loginRouter);
app.use("/", userRouter);
app.use("/", messageRouter);
app.use("/", memberRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});

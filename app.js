import path from "node:path";
import express from "express";
import session from "express-session";
import passport from "passport";
import homeRouter from "./routes/homeRouter.js";
import signupRouter from "./routes/signupRouter.js";
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRouter.js";
import memberRouter from "./routes/memberRouter.js";
import createmessageRouter from "./routes/createmessageRouter.js";
import getmessageRouter from "./routes/getmessageRouter.js";
import deletemsgRouter from "./routes/deletemsgRouter.js";

const app = express();
const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "ilovecats", resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", homeRouter);
app.use("/", signupRouter);
app.use("/", loginRouter);
app.use("/", userRouter);
app.use("/", memberRouter);
app.use("/", createmessageRouter);
app.use("/", getmessageRouter);
app.use("/", deletemsgRouter);

app.listen(3000, (error) => {
  if (error) throw error;
  console.log("App listening on port 3000!");
});

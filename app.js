/////// app.js
import path from "node:path";
import express from "express";
import session from "express-session";


const app = express();
const __dirname = import.meta.dirname;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: "ilovecats", resave: false, saveUninitialized: false }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});

import "./bootstrap.js"; // 👈 MUST BE FIRST LINE
import express from "express";
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import {verifyAuthentication} from "./middleware/verify-auth-middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.set("views", "./views")
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })      // session middleware is needed to store data in session
);
app.use(flash());     // flash middleware is needed for flash messages

// This must be after cookieParser middleware.
app.use(verifyAuthentication);      // to set req.user if token is valid on every request


// How It Works:
// This middleware runs on every request before reaching the route handlers.
// res.locals is an object that persists throughout the request-response cycle.
// If req.user exists (typically from authentication, like Passport.js), it's
// available as res.locals.user.
// Views (like EJS, Pug, or Handlebars) can directly access `user` without
// passing it in every route.
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});



// express router
// app.use(router);
app.use(authRoutes);
app.use(shortenerRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});








//login details
// h@gmail.com
// harsh
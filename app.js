import "./bootstrap.js"; // 👈 MUST BE FIRST LINE
import cookieParser from "cookie-parser";
import express from "express";
import flash from "connect-flash";
import requestIp from "request-ip";
import session from "express-session";

import { authRoutes } from "./routes/auth.routes.js";
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js";
import { shortenerRoutes } from "./routes/shortener.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
// app.set("views", "./views")

app.use(cookieParser());

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);          //resave = true: save session even if not modified
            //saveUninitialized = false: don't create session until something stored
            //seceret: used to sign the session ID cookie
app.use(flash());

app.use(requestIp.mw());

// This must be after cookieParser middleware.
app.use(verifyAuthentication);    // set req.user if authenticated

app.use((req, res, next) => {     // custom middleware to make user available in all views
  res.locals.user = req.user;
  return next();
});

// How It Works:
// This middleware runs on every request before reaching the route handlers.
//? res.locals is an object that persists throughout the request-response cycle.
//? If req.user exists (typically from authentication, like Passport.js), it's stored in res.locals.user.
//? Views (like EJS, Pug, or Handlebars) can directly access user without manually passing it in every route.

// express router
// app.use(router);
app.use(authRoutes);
app.use(shortenerRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
import {
  comparePassword,
  createUser,
  generateToken,
  getUserByEmail,
  hashPassword,
} from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("../views/auth/register", {
    errors: req.flash("errors")   // retrieve messages from session 
 });
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");
  // console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await getUserByEmail(email);
  console.log("userExists ", userExists);

  // if (userExists) return res.redirect("/register");

  if (userExists) {                       
  req.flash("errors", "User already exists");   //stored message in session(type , message)
  return res.redirect("/register");
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await createUser({ name, email, password: hashedPassword });
  console.log(user);

  res.redirect("/login");
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");
  // return res.render("auth/login");
  return res.render("auth/login", { errors: req.flash("errors") });
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  console.log("user ", user);

  // if (!user) return res.redirect("/login");
  if (!user) {                              // user not found
    req.flash("errors", "Invalid Email or Password");
    return res.redirect("/login");
  }
  //todo bcrypt.compare(plainTextPassword, hashedPassword);
  const isPasswordValid = await comparePassword(password, user.password);

  // if (user.password !== password) return res.redirect("/login");
  // if (!isPasswordValid) return res.redirect("/login");
  if (!isPasswordValid) {
    req.flash("errors", "Invalid email or password");
    return res.redirect("/login");
  }

  // res.cookie("isLoggedIn", true);  // simple cookie without any security

  const token = generateToken({         // jwt token generation
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.cookie("access_token", token);     //the token is set as cookie in the browser

  res.redirect("/");
};

// Do You Need to Set Path=/ Manually?
//    ✅ cookie-parser and Express automatically set the path to / by default.

export const getMe = (req, res) => {
  if (!req.user) return res.send("Not logged in");

  return res.send(
    `<h1>Hey ${req.user.name} - ${req.user.email}</h1>`
  );
};

export const logoutUser = (req , res  ) => {
  res.clearCookie("access_token");
  return res.redirect("/login");
};


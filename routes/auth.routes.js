import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register", authControllers.getRegisterPage);
// // router.get("/login", authControllers.getLoginPage);
// // router.post("/login", authControllers.postLogin);

router
  .route("/register")
  .get(authControllers.getRegisterPage) // when the user visit register page
  .post(authControllers.postRegister);   // when the user register and click on register button

router
  .route("/login")
  .get(authControllers.getLoginPage)  // when the user visit login page
  .post(authControllers.postLogin);   // when the user login and click on login button

router.route("/me")
      .get(authControllers.getMe);  // to get the details of logged in user

router.route("/logout")
      .get(authControllers.logoutUser); // when user click on the logout button 

export const authRoutes = router;



// all functions si in auth.contoller.js
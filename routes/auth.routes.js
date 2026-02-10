import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register", authControllers.getRegisterPage);
// // router.get("/login", authControllers.getLoginPage);
// // router.post("/login", authControllers.postLogin);

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

router.route("/me").get(authControllers.getMe);

router.route("/profile").get(authControllers.getProfilePage);

router.route("/verify-email").get(authControllers.getVerifyEmailPage);

router
  .route("/resend-verification-link")
  .post(authControllers.resendVerificationLink);      //on clicking on Resendverificationlink button on /resendverificationlink route a post request is submitted and we got token and verification link(have token and email both) send by nodemailer/Resend .

router.route("/verify-email-token").get(authControllers.verifyEmailToken);    //on clicking on the link in email a get request is sent to this route with token and email as query parameters
                                                                              //on clicking on verify Code button on /verify-email page a get request is sent to this route with token and email as query parameters

router
  .route("/edit-profile")
  .get(authControllers.getEditProfilePage)
  .post(authControllers.postEditProfile);

router
  .route("/change-password")    //done
  .get(authControllers.getChangePasswordPage)
  .post(authControllers.postChangePassword);

router
  .route("/reset-password") // done
  .get(authControllers.getResetPasswordPage)
  .post(authControllers.postForgotPassword);

router
  .route("/reset-password/:token")  
  .get(authControllers.getResetPasswordTokenPage) // done
  .post(authControllers.postResetPasswordToken);

router.route("/google").get(authControllers.getGoogleLoginPage);
router.route("/google/callback").get(authControllers.getGoogleLoginCallback);

router.route("/github").get(authControllers.getGithubLoginPage);
router.get("/github/callback", authControllers.getGithubLoginCallback);

router.route("/logout").get(authControllers.logoutUser);

export const authRoutes = router;


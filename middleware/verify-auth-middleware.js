import { verifyJWTToken } from "../services/auth.services.js";

export const verifyAuthentication = (req, res, next) => {
  const token = req.cookies.access_token;  // get token from cookies for each request

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;
    console.log("Decoded Token:", decodedToken);
  } catch (error) {
    req.user = null;
  }

  return next();
};

// verifyAuthentication is a middleware because:

// 👉 It is a function with the signature (req, res, next)
// 👉 It runs before routes
// 👉 It does not end the request–response cycle
// 👉 It calls next()

// That is exactly what makes a function a middleware in Express.
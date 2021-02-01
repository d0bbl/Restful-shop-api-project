const jwt = require("jsonwebtoken");

module.exports =
(req, res, next) => {
  try {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.userData = decoded;
  next();
  } catch (error) {
  return res.status(401).json({message: "Auth failed"});
  }
};
// {
//   ensureAuthenticated: (req, res, next) => {
//     if(req.isAuthenticated()){
//       return next();
//     }
//     res.redirect('/');
//   },
//   ensureGuest: (req, res, next) => {
//     if(req.isAuthenticated()){
//       res.redirect('/dashboard');
//     } else {
//       return next();
//     }
//   }
// }

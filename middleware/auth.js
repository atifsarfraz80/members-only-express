export function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.redirect("/login"); 
}

export function IsAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  res.status(403).send("Unauthorized: Admins only.");
}

const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/config");

function optionalAuth(req, res, next) {
  if (!jwtConfig.enabled) return next();
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token missing" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token malformed" });
  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
}

module.exports = { optionalAuth };

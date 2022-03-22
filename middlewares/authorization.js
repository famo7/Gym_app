const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
       const token = authorization.substring(7);
       const decodedToken = jwt.verify(token, process.env.SECRET);
       if (!token || !decodedToken.id) {
         return res.status(401).json({ error: "token missing or invalid" });
       }else{
         req.token = token
         next();
       }
  }else{
         return res.status(401).json({ error: "token missing or invalid" });
  }
};

const jwt = require("jsonwebtoken");
exports.Middleware = (req, res, next) => {
  if (req.get("Authorization")) {
    const ok = req.get("Authorization").split(" ")[1];
    try {
      const vl = jwt.verify(ok, "private");
      if (!vl) {
        throw new Error("Not authenticated");
      }
      req.email = vl.email;
      next();
    } catch (error) {
      res.json(error);
    }
  }
};
exports.Middlewareadmin = (req, res, next) => {
  if (req.get("Authorization")) {
    const ok = req.get("Authorization").split(" ")[1];
    try {
      const vl = jwt.verify(ok, "privateadmin");
      if (!vl) {
        throw new Error();
      }
      next();
    } catch (error) {
      res.json({ err: "Not authenticated" });
    }
  }
};

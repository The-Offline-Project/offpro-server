const _ = require("lodash");

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (_.includes(...roles, req.user.role)) {
      return next();
    }

    return res.status(403).json({ msg: "Access Denied" });
  };
};

module.exports = allowRoles;

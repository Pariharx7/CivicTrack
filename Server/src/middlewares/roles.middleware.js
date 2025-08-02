export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.myUser?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to perform this action",
      });
    }
    next();
  };
};

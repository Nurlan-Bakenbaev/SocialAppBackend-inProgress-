import jwt from "jsonwebtoken";

export const generateTokenAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, "JWT_SECRET", {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
};

import jwt from "jsonwebtoken";
import User from "@/models/user.model";

export const getUserFromToken = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    return user || null;
  } catch (error) { 
    return null;
  }
};

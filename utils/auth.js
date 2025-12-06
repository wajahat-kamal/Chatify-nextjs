import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export const getUserFromToken = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✔ Use correct field name
    const user = await User.findById(decoded.userId).select("-password");

    return user || null;
  } catch (error) { 
    return null;
  }
};

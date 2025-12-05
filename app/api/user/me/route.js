import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import connectDB from "@/config/db";

export async function GET(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ success: false, message: "No token" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

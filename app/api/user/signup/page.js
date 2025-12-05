import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {

  await connectDB();

  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "Required all fields",
      }, {status: 400});
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      }, {status: 400});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json({
        user,
        success: true,
        message: 'User created successfully'
    })
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
}

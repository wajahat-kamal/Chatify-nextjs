import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import connectDB from "@/config/db";

export async function POST(req) {
  await connectDB();
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const chatData = {
      userId: user._id,
      userName: user.name,
      name: "New Chat",
      messages: [],
    };

    const newChat = await Chat.create(chatData);

    return NextResponse.json(
      { success: true, message: "Chat created successfully", chat: newChat },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

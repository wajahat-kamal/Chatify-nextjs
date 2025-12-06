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

    const { chatId } = await req.json();

    await Chat.deleteOne({ _id: chatId, userId: user._id });

    return NextResponse.json(
      { success: true, message: "Chat Deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

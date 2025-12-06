import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";

export async function GET(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const chats = await Chat.find({ userId: user._id }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, chats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

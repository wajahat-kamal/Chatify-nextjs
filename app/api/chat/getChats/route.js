import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Ensure req.user exists
    if (!request.user || !request.user._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = request.user._id;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json(
      { success: true, chats },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!req.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = req.user._id;

    const { chatId } = await req.json();

    await Chat.deleteOne({ _id: chatId, userId });

    return NextResponse.json(
      {
        success: true,
        message: "Chat Deleted",
      },
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

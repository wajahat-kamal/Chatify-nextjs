import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {

    if (!request.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = request.user._id;

    const chatData = {
      userId,
      userName: request.user.name,
      chatName: "New Chat",
      messages: [],
    };

    const newChat = await Chat.create(chatData);

    return NextResponse.json(
      {
        success: true,
        message: "Chat created successfully",
        chat: newChat,
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

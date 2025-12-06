import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import openai from "@/config/openai";

export async function POST(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(req.headers.get("authorization")); // kya aa raha hai check karo

    const body = await req.json();
    const { chatId, prompt } = body;

    const chat = await Chat.findOne({ _id: chatId, userId: user._id });
    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }

    // Add user's message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    });

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });

    const aiMessage =
      completion.choices?.[0]?.message?.content ||
      "I'm not sure how to respond.";

    const reply = {
      role: "assistant",
      content: aiMessage,
      timestamp: new Date().toISOString(),
    };

    // Save AI message in chat
    chat.messages.push(reply);
    await chat.save();

    // Send AI reply to client
    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in textMessage route:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}

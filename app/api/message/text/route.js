export const runtime = "nodejs"; // must be first line

import Chat from "@/models/chatModel";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import openai from "@/config/openai";
import connectDB from "@/config/db";

export async function POST(req) {
  await connectDB();

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { chatId, prompt } = await req.json();

  if (!chatId || !prompt) {
    return NextResponse.json({ success: false, message: "chatId and prompt are required" }, { status: 400 });
  }

  const chat = await Chat.findOne({ _id: chatId, userId: user._id });
  if (!chat) {
    return NextResponse.json({ success: false, message: "Chat not found" }, { status: 404 });
  }

  chat.messages.push({ role: "user", content: prompt, timestamp: new Date().toISOString() });

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash-exp",
      messages: [{ role: "user", content: prompt }],
    });

  const aiMessage = completion.choices?.[0]?.message?.content || "I'm not sure how to respond.";

  const reply = { role: "assistant", content: aiMessage, timestamp: new Date().toISOString() };

  chat.messages.push(reply);
  await chat.save();

  return NextResponse.json({ success: true, reply }, { status: 200 });
}

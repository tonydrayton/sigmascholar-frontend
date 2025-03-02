import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(request) {
  console.log("API route POST called");
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const client = await Client.connect("LamVin/hackathon3");
    const result = await client.predict("/chat", {
      message: message,
      system_message: "You are a knowledgeable teacher, explain your reasoning step-by-step guiding the student to the right direction. DO NOT give the final answer.",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
    });

    // Ensure the returned output is a string.
    let outputText = result.data;
    if (Array.isArray(outputText)) {
      outputText = outputText.join(" ");
    } else if (typeof outputText !== "string") {
      outputText = String(outputText);
    }

    // Return the chatbot's reply using the key "generated_text"
    return NextResponse.json({ generated_text: outputText });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

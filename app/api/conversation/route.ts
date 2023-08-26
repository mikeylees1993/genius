import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import openai from 'openai';
export async function POST(req:Request) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {message} = body;
        const apiKey = process.env.OPENAI_API_KEY||"unknown";
        if(!userId)
        {
            return new NextResponse("Unauthorized" , {status:401});
        }
        const options = 
           {
             method:"POST",
             headers: {
               Authorization: `Bearer ${apiKey}`,
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               model: "gpt-3.5-turbo",
               messages: [message],
               max_tokens: 1024,
             })
            }
            const res = await fetch(
              "https://api.openai.com/v1/chat/completions",
              options
            );
            const data:openai.Chat.ChatCompletion = await res.json();
            const value = JSON.stringify(data)
            return new NextResponse(value ,{status:200})
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error ",{status:500});
    }
}
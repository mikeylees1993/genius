import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import openai from "openai";

export async function POST(req:Request)
{
    const {userId} = auth();
    const body = await req.json();
    const {codePrompt} = body
    const instruction:openai.Chat.ChatCompletionMessage = {
        role:'system',
        content:"You are a code generator.You must answer in markdown code snippets and use code comments for explaination"
    }
    if(!userId)
    {
        return new NextResponse("Unauthorized ",{status:401});
    }
    if (!codePrompt)
    {
        return new NextResponse("Code Prompt is a required field...",{status:500})
    }
    try{
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [instruction,codePrompt],
                max_tokens: 1024,
            }),
        };
        const res = await fetch(
            "https://api.openai.com/v1/chat/completions",
            options
        );
        const data: openai.Chat.ChatCompletion = await res.json();
        const value = JSON.stringify(data);
        return new NextResponse(value, { status: 200 });
    }catch(error:any){
        return new NextResponse("Internal Error ", {status:500});
    }

}
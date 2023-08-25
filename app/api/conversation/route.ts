import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(req:Request) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {values} = body;
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
               messages: [{ role: "user", content: values.prompt }],
               max_tokens: 1024,
             })
            }
            const res = await fetch(
              "https://api.openai.com/v1/chat/completions",
              options
            );
            const data = await res.json();
            
            return new NextResponse(data,{status:200})
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error ",{status:500});
    }
}
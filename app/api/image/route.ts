import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {StatusCodes} from 'http-status-codes'
import OpenAI from "openai";
export async function POST(req:Request)
{
    const {userId} = auth()
    const body = await req.json()
    const { prompt, amount, resolution } = body.values;
    if(!userId)
    {
        return new NextResponse("Unauthorised",{status:StatusCodes.UNAUTHORIZED})
    }

    if(!prompt){
        return new NextResponse("Prompt is required " ,{status:StatusCodes.BAD_REQUEST})
    }
    if(!amount)
    {
        return new NextResponse("Amount is required ",{status:StatusCodes.BAD_REQUEST})
    }
    if(!resolution)
    {
        return new NextResponse("Resolution is required",{status:StatusCodes.BAD_REQUEST});
    }
    const reqParamsObject = {prompt,n:parseInt(amount),size:resolution}
    
    const PostOption = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(reqParamsObject)
    };
    const responce = await fetch(
      "https://api.openai.com/v1/images/generations",
      PostOption
    );
    const data = await responce.json()
    const value = JSON.stringify(data.data)
    return new NextResponse(value,{status:StatusCodes.OK})
}
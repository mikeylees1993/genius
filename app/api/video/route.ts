import { auth } from "@clerk/nextjs";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req:Request) 
{
    try {
        const {userId} = auth();
        const body = await req.json()
        const {values} = body;
        const replicate = new Replicate({
          auth: process.env.REPLICATE_API_KEY!,
        });
        if(!userId)
        {
            return new NextResponse("Unauthorized", {status:StatusCodes.UNAUTHORIZED});
        }

        if (!values.prompt)
        {
            return new NextResponse("Prompt is required ",{status:StatusCodes.BAD_REQUEST});
        }
        const output = await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt: values.prompt,
            },
          }
        );
        return NextResponse.json(output)
    } catch (error) {
        return new NextResponse("Internal error " , {status:StatusCodes.INTERNAL_SERVER_ERROR})
    }    
}
import { auth } from "@clerk/nextjs";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});
export async function POST(req:Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { values } = body;

        if (!userId) {
          return new NextResponse("Unauthorized", {
            status: StatusCodes.UNAUTHORIZED,
          });
        }
        if (!values.prompt) {
          return new NextResponse("Prompt is required", {
            status: StatusCodes.BAD_REQUEST,
          });
        }
        const output = await replicate.run(
          "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
          {
            input: {
              prompt_a: values.prompt,
            },
          }
        );

        return NextResponse.json(output)
    } catch (error) {
        console.log(error)
    }
}
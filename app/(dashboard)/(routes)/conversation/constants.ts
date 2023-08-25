import * as z from "zod";
export const formSchema = z.object({
    prompt:z.string().min(1,{message:"Prompt is required"})
})

export const apiKey = "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";
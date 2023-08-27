"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "./constants";
import OpenAI from "openai";
import axios from "axios";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
const HeadingIcon = <i className="fa fa-code" aria-hidden="true"></i>;
const CodePage = () =>{
    const router = useRouter();
    const [prompts,setPrompts] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })
    const onSubmit = async(values:z.infer<typeof formSchema>) =>
    {
        console.log("[Form Submiited]")
        try{
            const codePrompt:OpenAI.Chat.ChatCompletionMessage = {
                role:"user",
                content: values.prompt
            }
            setPrompts((current)=>[...current,codePrompt]);
            const responce = await axios.post("/api/code",{codePrompt});
            const res:OpenAI.Chat.ChatCompletion = await responce.data;
            setPrompts((current)=>[...current,res.choices[0].message])
            console.log(res);
            form.reset()
        }catch (error:any) {
            console.log(["[]"])
        }
    }
    const isLoading = form.formState.isSubmitting;
    return(
    <div>
        <Heading 
            title="Code Generation"
            description="Most Advance and complex code generator in the world"
            icon={HeadingIcon}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        ">
                            <FormField 
                                name="prompt"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do I create a button in next js using typescript? "
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                            )}
                            />
                            <Button
                            className="col-span-12 lg:col-span-2 w-full "
                            disabled={isLoading}
                            >Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>)}
                    {prompts.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No code generations started.."/>
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {prompts.map((prompt)=>(
                            <div 
                            key={prompt.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",prompt.role === 'user' ? "bg-white border border-black/10":"bg-muted")}
                            >
                                {prompt.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown
                                components={{pre:({node,...props})=>(
                                   <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                        <pre {...props}/>
                                   </div> 
                                ),
                                code:({node,...props})=>(
                                    <code className="bg-black/10 rounded-lg p-1" {...props}/>
                                )
                            }}
                            className="text-sm overflow-hidden leading-7"
                            >{prompt.content || ""}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    </div>
    
    )
}

export default CodePage;
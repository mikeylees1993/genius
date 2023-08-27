"use client";

import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from "openai";    
import axios from "axios";


import Heading from "@/components/heading"
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";


const ConversationPage = () => {
    const HeadingIcon = <i className="fa fa-comment" aria-hidden="true"></i>;
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const [messages,setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([]);
    const onSubmit =async (values: z.infer<typeof formSchema>) => {
        try {
            let message:OpenAI.Chat.ChatCompletionMessage={
                content: values.prompt,
                role: "user"
            };
            setMessages((current)=>[...current,message])
            const pageRes = await axios.post('/api/conversation',{message})
            const responce:OpenAI.Chat.ChatCompletion = await pageRes.data;
            setMessages((current)=>[...current,responce.choices[0].message]);
            form.reset()
            
        } catch (error:any) {
            console.log(error);
        }finally{
            router.refresh();
        }
    }
    return(
        <div>
            <Heading 
            title="Conversation"
            description="Our most advance conversation model"
            icon= {HeadingIcon}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
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
                                            placeholder="How do I calculate the radius if a circle? "
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
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No conversation started.."/>
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message)=>(
                            <div 
                            key={message.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role === 'user' ? "bg-white border border-black/10":"bg-muted")}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">{message.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ConversationPage;
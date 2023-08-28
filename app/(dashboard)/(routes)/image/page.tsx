"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { amountOptions, formSchema, resolution } from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const HeadingIcon = <i className="fa fa-picture-o" aria-hidden="true"></i>;
const ImagePage = () =>{
    const router = useRouter();
    const [images,setImages] = useState([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:
        {
            prompt:"",
            amount:amountOptions[0].value,
            resolution:resolution[0].label
        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async(values:z.infer<typeof formSchema>) =>
    {
        
        try{
            setImages([]);
            const responce = await axios.post("/api/image",{values});
            const urls = responce.data.map((image:{url:string})=>image.url)
            setImages(urls)
            console.log(images)
            form.reset()
        }catch (error:any) {
            console.log("[IMAGE ERROR] - ",error)
        }finally{
            router.refresh();
        }
    }
    return(
    <div> 
        <Heading 
            title="Image Generation"
            description="Turn your prompt into an image"
            icon={HeadingIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="A picture of a horse in swiss alps"
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="amount"
                            render={({field})=>(
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((options)=>(
                                                <SelectItem key={options.value} value={options.value}>
                                                    {options.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="resolution"
                            render={({field})=>(
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolution.map((options)=>(
                                                <SelectItem key={options.value} value={options.value}>
                                                    {options.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                {isLoading && (<div className="p-20">
                        <Loader />
                    </div>)}
                    {images.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No images rendered"/>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) =>(
                            <Card key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image 
                                    alt="Image"
                                    fill
                                    src={src}
                                    />
                                    
                                </div>
                                <CardFooter className="p-2">
                                        <Button variant="secondary" className="w-full" onClick={()=> window.open(src)}>
                                            <i className="fa fa-download h-4 w-4 mr-2" aria-hidden="true"></i>
                                            Download
                                        </Button>
                                    </CardFooter>
                            </Card>
                            
                        ))}
                    </div>
            </div>
        </div>
    </div>
    )
}


export default ImagePage;
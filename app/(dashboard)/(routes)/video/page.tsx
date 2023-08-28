"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import Heading from "@/components/heading";

const HeadingIcon = <i className="fa fa-video-camera" aria-hidden="true"></i>;
const VideoPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });
    return(
    <div>
        <Heading 
            title="Video Generation"
            description="Our greatest video rendering engine"
            icon= {HeadingIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
        />
    </div>
    )
}

export default VideoPage;
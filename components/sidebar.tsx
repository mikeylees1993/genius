"use client";

import { cn } from "@/lib/utils";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const montserrat = Montserrat({weight:"600", subsets:["latin"]})
const pathname = usePathname;
const routes = [
    {
        label:"Dashboard",
        icon:<i className="fa fa-tachometer" aria-hidden="true"></i>,
        href:"/dashboard",
        color:"text-sky-500"
    },
    {
        label: 'Conversation',
        icon: <i className="fa fa-comment" aria-hidden="true"></i>,
        href: '/conversation',
        color: "text-violet-500",
      },
      {
        label: 'Image Generation',
        icon: <i className="fa fa-picture-o" aria-hidden="true"></i>,
        color: "text-pink-700",
        href: '/image',
      },
      {
        label: 'Video Generation',
        icon: <i className="fa fa-video-camera" aria-hidden="true"></i>,
        color: "text-orange-700",
        href: '/video',
      },
      {
        label: 'Music Generation',
        icon: <i className="fa fa-music" aria-hidden="true"></i>,
        color: "text-emerald-500",
        href: '/music',
      },
      {
        label: 'Code Generation',
        icon: <i className="fa fa-code" aria-hidden="true"></i>,
        color: "text-green-700",
        href: '/code',
      },
      {
        label: 'Settings',
        icon: <i className="fa fa-cog" aria-hidden="true"></i>,
        href: '/settings',
      }
]
const SideBar = () =>{
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-02 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/logo.png" />
                    </div>
                    <h1 className={cn("text-2xl font-bold",montserrat.className)}>Genius</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathname() === route.href ? "text-white bg-white/10 ": "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <div className={cn("h-5 w-5 mr-3",route.color)}>
                                    {route.icon}
                                </div>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
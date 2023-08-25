"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label:"Conversation",
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    icon:<i className="fa fa-comment w-8 h-8"  aria-hidden="true"></i>,
    href:"/conversation"
  },
  {
    label: 'Music Generation',
    icon:<i className="fa fa-music w-8 h-8" aria-hidden="true"></i>,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    icon: <i className="fa fa-picture-o w-8 h-8" aria-hidden="true"></i>,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: <i className="fa fa-video-camera w-8 h-8" aria-hidden="true"></i>,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: <i className="fa fa-code w-8 h-8" aria-hidden="true"></i>,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
]

const  DashboardPage = () => {
  const router = useRouter();
    return (
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">Explore The Power Of AI</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chat with the smartest AI - Experience the power of AI</p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool)=>(
            <Card 
            key={tool.href}
            onClick={()=> router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                  <span className={tool.color}>
                    {tool.icon}
                  </span>
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <i className="fa fa-arrow-right w-5 h-5" aria-hidden="true"></i>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
export default DashboardPage;
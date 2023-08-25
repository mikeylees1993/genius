"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () =>{
    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) return null;
    return(
        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} size={"icon"} className="md:hidden">
                <i className="fa-solid fa-bars"></i>
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
                <SideBar></SideBar>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;
import React from 'react'
import {UserButton} from "@clerk/nextjs";
import {ModeToggle} from "@/components/ui/modeToggle";

const Page = () => {
    return (
        <div>
            <UserButton />
            <ModeToggle />
        </div>
    )
}
export default Page

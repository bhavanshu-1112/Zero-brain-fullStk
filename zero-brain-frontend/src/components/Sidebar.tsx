import { TwitterIcon } from "../icons/TwitterIcon";
import { SideBarItem } from "./SideBarItem";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";

export function SideBar(){
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-2">
            <div className="flex p-2 items-center "><Logo/>
            <div className="text-2xl pt-4 pl-2 text-purple-500 font-bold">
                Zero Brain
            </div></div>
            
            <div className="pt-4 pl-4">
                <SideBarItem text="Twitter" icon = {<TwitterIcon/>}/>
                <SideBarItem text="Youtube" icon = {<YouTubeIcon/>}/>

            </div>
        </div>
    )
}
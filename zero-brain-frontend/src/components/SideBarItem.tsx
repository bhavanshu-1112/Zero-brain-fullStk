import type { ReactElement } from "react";

export function SideBarItem({text, icon} :{text:string, icon:ReactElement}){
  return (
  <div className="flex items-center text-gray-600 py-2 hover:bg-gray-200 cursor-pointer rounded max-w-48">
    <div className="px-2">
        {icon}
    </div>
    <div className="px-2">
        {text}
    </div>
  </div>)
}
import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?:boolean;
    loading?:boolean
}

const variantStyles = {
    "primary": "bg-purple-800 text-white",
    "secondary": "bg-purple-100 text-purple-800"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-2 text-md",
    "lg": "px-6 py-3 text-lg"
}

const defaultStyles = "rounded-lg  font-light"
export const Button = (props: ButtonProps) => {
    return (
        <div>
        <button onClick ={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ` + `${props.fullWidth ? " w-full":""}` + `${props.loading?" opacity-50" : ""}` + " cursor-pointer"} disabled={props.loading}>
            <div className="flex items-center">
                {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text}
            </div></button>
            </div>
    )
}

{/* <Button variant = "primary" size="md" */ }
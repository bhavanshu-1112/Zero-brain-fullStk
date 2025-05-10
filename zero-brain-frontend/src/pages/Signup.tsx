import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/user/signup", {
            
                username,
                password
            
    })
    alert("You have signed  up!!")
    navigate("/signin") 
         
    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xs min-w-48 p-8">
                <Input placeholder={"Username"} ref ={usernameRef} />
                <Input placeholder={"Password"} ref = {passwordRef}/>
                <div className="flex justify-center pt-2">
                    <Button onClick = {signup} variant="primary" text="Signup" size={"md"} fullWidth={true} loading={false} />
                </div>
            </div>
        </div>
    )
}
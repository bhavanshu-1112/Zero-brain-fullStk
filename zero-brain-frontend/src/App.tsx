import {Dashboard} from "./pages/Dashboard"
import "./App.css"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"

export default function App(){
  return(
   <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/share/:shareId" element = {<Dashboard/>}/>
    </Routes>
   </BrowserRouter> 
  )

}
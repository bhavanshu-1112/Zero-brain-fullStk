import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent(){
  const [contents,setContents] = useState([]);


  function refresh() {
    axios.get(`${BACKEND_URL}/api/v1/user/content`, {
    headers : {
        "Authorization" : localStorage.getItem("token")
    }
   })
   .then((response)=>{
    setContents(response.data.content)
   })
  }
  useEffect(()=>{
   refresh();
   let interval = setInterval(()=>{
    refresh()
   },10000)
   return ()=>{
    clearInterval(interval)
   }
  }, [])
  return {contents,refresh};
}
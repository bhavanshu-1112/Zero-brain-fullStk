import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

//@ts-ignore
export const userMiddleWare = (req, res, next)=>{
  const authHeader = req.headers.authorization;


  if(!authHeader){
    return res.status(403).json({
        message : "Unauthorized"
    })
  }

  try{
   const decoded = jwt.verify(authHeader, JWT_SECRET);
   if(decoded){
    //@ts-ignore
    req.userId = decoded.id;
    next();
   }else{
    return res.status(403).json({message : "You are not logged in"})
   }
  }catch(e){
     console.log("Error occured: ", e)
  }
}

// override the types of express request object
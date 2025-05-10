import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import {User, Content, Link} from "../db";
import { JWT_SECRET } from "../config";
import { userMiddleWare } from "../userMiddleWare";
import { random } from "../utils";

const router = express.Router();


const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8)
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8)
})



//@ts-ignore
router.post('/signup', async (req, response) =>{
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return response.status(411).json({
          message : "Validation failed/ wrong input"
        })
    }
    try{ 
     const existingUser = await User.findOne({
        username:req.body.username
     })

     if(existingUser){
        return response.status(409).json({
            message : "Email already taken"
        })
     }
     const newUser = await User.create({
        username :req.body.username,
        password : req.body.password
     });
     
     response.status(201).json({
        message : "user created successfully"
     })

    }catch(err){
      response.status(500).json({
        message:  "internal server error"
      })
    }


})
// @ts-ignore
router.post('/signin', async (req, res) =>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "User does not exist"
        })
    }

    const existingUser =await User.findOne({
        username : req.body.username,
        password : req. body.password
    })

    if(existingUser){
        
     const token = jwt.sign({
        id : existingUser._id
     }, JWT_SECRET)
     res.json({
        token
     })
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }


})

// const contentSchema = zod.object({
//     title : zod.string(),
//     link : zod.string(),  
// })


//@ts-ignore
router.post('/content', userMiddleWare, async(req ,res)=>{
   const title = req.body.title
   const link = req.body.link;
   const type = req.body.type
   await Content.create({
    title,
    link,
    type,
    //@ts-ignore
    userId:req.userId,
    tags : []

   })
   res.status(201).json({
    message : "Content created"
   })
})

router.get('/content', userMiddleWare,async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId : userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

router.delete('/content',userMiddleWare, async (req,res) =>{
   const contentId = req.body.contentId;
   await Content.deleteOne({
    contentId,
    //@ts-ignore
    userId : req.userId
   })

   res.json({
    message : "deleted"
   })
})

router.post('/brain/share', userMiddleWare, async (req, res)=>{
    const share = req.body.share;
    if(share){
        const existingLink = await Link.findOne({
            //@ts-ignore
            userId:req.userId 
        })

        if(existingLink){
          res.json({
            hash : existingLink.hash  
          })
          return;
        }
        const hash = random(10)
     await Link.create({
        //@ts-ignore
        userId:req.userId,
        hash:hash
     })
     res.json({
        message : "/share/"+hash
     })
    }else{
       await  Link.deleteOne({
            //@ts-ignore
            userId:req.userId
        })
    
    res.json({
        message : "Removed Shareable link!! "
    })
}
})
//@ts-ignore
router.get('/brain/:share', async (req ,res)=>{
    const hash = req.params.share;
    const link = await Link.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message : "Sorry ! incorrect input..."
        })
        return;
    }

    // userId
    const content = await Content.find({
        userId:link.userId
    })

    const user = await User.findOne({
        _id : link.userId
    })
    if(!user){
        return res.status(411).json({
            message : "user not found, ideally it should not happen"
        })
    }
    res.json({
        username : user.username,
        content
    })

    
})

export default router;
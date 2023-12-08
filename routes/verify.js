import Express from "express";
import { userData, verifyOTP } from "./register.js";
import { UserModel } from "../db/dbModels.js";

export const VerifyRouter = Express.Router()

VerifyRouter.post( '/', async(req,res)=>{
    const payload = req.body
    try{
        if(payload.otp === verifyOTP[0]){
            const newUser = await UserModel.create(userData[0])
            if(newUser){
                res.send({msg : 'User register successfully'})
            }
        }else{
            res.send({msg : 'OTP is not matched'})
        }
    }catch(err){
        console.log(err)
    }
})
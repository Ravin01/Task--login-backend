import Express from "express";
import { UserModel } from "../db/dbModels.js";
import { userEmail } from "./forgotPass.js";
import bcrypt from 'bcrypt'

export const resetPassRouter = Express.Router()

resetPassRouter.post('/', async(req,res)=>{
    const payload = req.body
    try{
        const verifyMail = await UserModel.findOne({email : userEmail})
        if(verifyMail){
            bcrypt.hash(payload.password, 10, async(err, hash)=>{
                const updatePassword = await UserModel.findOneAndUpdate({email : userEmail[0]},{password : hash})
                if(updatePassword){
                    res.send({msg : 'password updated successfully'})
                }else{
                    res.send({msg : 'error while updating password'})
                }
            })
        }else{
            res.status(409).send({msg : 'user not found'})
        }
    }catch(err){

    }
})
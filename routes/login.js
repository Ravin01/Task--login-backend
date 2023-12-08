import Express from "express";
import { UserModel } from "../db/dbModels.js";
import bcrypt from 'bcrypt'

export const loginRoute = Express.Router()

loginRoute.post('/', async(req,res)=>{
    let payload = req.body
    try{
        const checkUser = await UserModel.findOne({email : payload.email})
        if(checkUser){
            bcrypt.compare(payload.password, checkUser.password, async(err,result)=>{
                if(result){
                    res.send({msg : 'User login successfully'})
                }else{
                    res.send({msg : 'password is not match'})
                }
            })
        }else{
            res.send({msg : 'user not yet registered'})
        }
    }catch(err){
        console.log(err)
    }
})
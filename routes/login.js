import Express from "express";
import { UserModel } from "../db/dbModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginRoute = Express.Router()

loginRoute.post('/', async(req,res)=>{
    let payload = req.body
    try{
        const checkUser = await UserModel.findOne({email : payload.email})
        if(checkUser){
            bcrypt.compare(payload.password, checkUser.password, async(err,result)=>{
                if(result){
                    const response = checkUser.toObject()
                    const accessToken = jwt.sign(response, process.env.JWT_SECRET, {expiresIn : '1d'})
                    res.send({...response, accessToken})
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
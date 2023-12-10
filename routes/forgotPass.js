import Express from "express";
import { UserModel } from "../db/dbModels.js";
import jwt from 'jsonwebtoken'
import { transporter, mailOptions } from "./mail.js";

export const forgotPassRouter = Express.Router()

export let userEmail = []

forgotPassRouter.post('/', async(req,res)=>{
    const payload = req.body
    userEmail = []
    userEmail.push(payload.email)
    try{
        const verifyEmail = await UserModel.findOne({email : payload.email})
        if(verifyEmail){
            const verifyToken = jwt.sign({email : payload.email}, process.env.JWT_SECRET, {expiresIn : '1d'})
            const link = `${process.env.FE_URL}/reset?verify=${verifyToken}`
            const mail = await transporter.sendMail({
                ...mailOptions,
                to : payload.email,
                text : `Hi please conform your email and click this link to verify you : ${link}`,
            })
            if(mail){
                res.send({msg : 'Mail send successfully, please check your inbox'})
            }else{
                res.send({msg : 'error while sending mail'})
            }
        }else{
            res.send({msg : 'user not found'})
        }
    }catch(err){

    }
})
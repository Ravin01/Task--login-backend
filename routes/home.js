import Express from "express";

export const homeRouter = Express.Router()

homeRouter.get('/', (req,res)=>{
    try{
        res.send({msg : 'Home'})
    }catch(err){
        console.log(err)
    }
})
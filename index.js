import Express from "express";
import { ConnectToDb } from "./db/dbConnection.js";
import cors from 'cors'
import { registerRouter } from "./routes/register.js";
import { VerifyRouter } from "./routes/verify.js";
import { loginRoute } from "./routes/login.js";
import { homeRouter } from "./routes/home.js";
import { forgotPassRouter } from "./routes/forgotPass.js";
import { resetPassRouter } from "./routes/resetPass.js";
import jwt from 'jsonwebtoken'


const app = Express()

const port = process.env.PORT || 7050

await ConnectToDb()

// middleware
app.use(Express.json())

app.use(cors())


// Auth
const authMiddleWare = (req,res,next)=>{
    const token = req.headers['auth-token']
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next()
    }catch(err){
        res.status(409).send({msg : 'unauthorized'})
    }
}


// Routes
app.use('/register', registerRouter)

app.use('/verify', VerifyRouter)

app.use('/login', loginRoute)

app.use('/forgot', forgotPassRouter)

app.use('/reset', resetPassRouter)

app.use('/', authMiddleWare, homeRouter)




app.listen(port, ()=> console.log("server is running on ", port))
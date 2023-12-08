import Express from "express";
import { ConnectToDb } from "./db/dbConnection.js";
import cors from 'cors'
import { registerRouter } from "./routes/register.js";
import { VerifyRouter } from "./routes/verify.js";
import { loginRoute } from "./routes/login.js";

const app = Express()

const port = process.env.PORT || 7050

await ConnectToDb()

// middleware
app.use(Express.json())

app.use(cors())

// Routes

app.use('/register', registerRouter)

app.use('/verify', VerifyRouter)
// 
app.use('/login', loginRoute)



app.get('/', (req,res) => {
    res.send(`Backend Task => 
    to register => /register,
    to verify => /verify,
    to login => /login
    `)
})

app.listen(port, ()=> console.log("server is running on ", port))
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




import router from "./routes/auth.routes.js";

app.use('/api/auth', router)


import Issuerouter from "./routes/issue.routes.js";


app.use('/api/issues', Issuerouter)


export default app;


import express, { json } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();



const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




import router from "./routes/auth.routes.js";

app.use('/api/auth', router)


import Issuerouter from "./routes/issue.routes.js";


app.use('/api/issues', Issuerouter)


export default app;


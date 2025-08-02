import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app  = express();


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())


app.get('/', (req,res) =>{
    res.send("We Are Live")
})


export default app;


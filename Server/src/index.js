import app from "./app.js";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";



dotenv.config();


// Db Connection
dbconnect().then(
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server Started on Port http://localhost:${process.env.PORT}`)
})
)
.catch((err)=>{
        console.log(`MongoDB ERROR ${err}`)
    
    })

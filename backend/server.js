import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors"

dotenv.config();

const app  = express();

app.use(cors({origin:"http://localhost:5173",
    Credentials : true
}))

app.use(express.json()); // alow to acept json data only.

app.use("/api/users",userRouter);

app.listen(5000, () => {
    connectDB();
    console.log("server start at http://localhost:5000")
});


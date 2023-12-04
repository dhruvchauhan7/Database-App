import express from "express"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import userRoutes from "./routes/users.js"
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app =  express()
app.use(cors());

app.use(express.json())
app.use(cookieParser())


app.use("/backend/auth", authRoutes)
app.use("/backend/users", userRoutes)
app.use("/backend/products", productRoutes)


app.listen(8080, ()=> {
    console.log("connected");
})
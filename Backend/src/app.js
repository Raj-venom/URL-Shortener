import express from "express";
import cors from "cors"
import { ApiError } from "./utils/ApiError.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Router Import
import urlRouter from "./routes/url.routes.js"


// routes declaration
app.use("/api/v1/url", urlRouter)



app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
  
      console.log(err)
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        success: false
  
      });
    }
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on the server',
    });
  });
  

export default app
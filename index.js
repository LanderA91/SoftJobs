// import to use enviroments variables
import * as dotenv from "dotenv";
dotenv.config();

//import express and cors
import express from "express";
import cors from "cors";
const app = express();

// import file that contains the routes
import myRouter from "./routes/route.js";

// middlewares
import morgan from 'morgan';
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/", myRouter);


//Initiate Server 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
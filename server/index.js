import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const allowedOrigins = ['https://kenmerntest.netlify.app'];

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
},
optionsSuccessStatus: 200,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(
    () =>{
        console.log("DB connected successfully.");
        app.listen(PORT, ()=>{
            console.log(`SERVER RUNNING : ${PORT}`);
        });
    })
.catch((error) => console.log(error));


app.use("/api", route);

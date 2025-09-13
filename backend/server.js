import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { dbConnect } from "./config/dbConnect.js";
import productRoute from "./routes/Product.route.js";
import cors from 'cors';
import path from 'path';


const app = express();

// const corsOptions = {
//         origin: 'http://localhost:5173', // Or an array of origins: ['http://localhost:4200', 'https://your-frontend-domain.com']
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//         credentials: true, // Allow sending cookies and HTTP authentication
//     };


const allowedOrigins = [
    'http://localhost:5173',               // ✅ Local Vite frontend
    'https://product-store-0k0p.onrender.com/'        // ✅ Your production frontend
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


const __dirname = path.resolve()
console.log(__dirname)

// Product Route
app.use("/", productRoute)

if(process.env.NODE_ENV == "production")
{
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
   
dbConnect()

const PORT = process.env.PORT || 300

app.listen(PORT, () => {
    console.log("App is listening on 500 port");
})
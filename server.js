// swagger api
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
//package imports 
import express from "express";
import 'express-async-errors';
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgam from "morgan";
//security
import mongoSanitize from 'express-mongo-sanitize'
import xss from "xss-clean";
import helmet from "helmet";
//import files
import connectDB from "./config/db.js"; // Function to connect to MongoDB
//import routes
import testRoutes from "./routes/testRoutes.js"; // Routes for testing
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobsRoutes from './routes/jobsRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();
//swagger api config 
//swagger api options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Portal Application',
            description:'Node Expressjs Job Portal application',
            
        },
        servers:[
            {
                //url:"http://localhost:8080"
                url:"https://job-portal-app-backend.onrender.com/api-doc/"
            }
        ]
    },
    apis: ['./routes/*.js'],
}
const spec = swaggerJsdoc(options);

// Create an instance of Express
const app = express();

//middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(express.json()); 
app.use(cors());
app.use(morgam("dev"));

// Use the test routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/job',jobsRoutes);
//home routes
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec));
//validation middleware
app.use(errorMiddleware);
// Determine the port number based on environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.yellow.bgCyan.white
    );
});

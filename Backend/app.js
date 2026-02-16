import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js"; 
import errorHandler from "./src/middleware/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req,res) => {
    res.status(200).json({
        message: "Server is running...."
    });
});

app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

app.use(errorHandler);

export default app;
import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 

import authRouters from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config(); 

const app = express(); 

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json()); 
app.use("/api/auth", authRouters);
app.use(
    "/api/transactions",
    transactionRoutes
);

app.get(
    "/api/profile",
    authMiddleware, 
    (req, res) => {
        res.json({
            message: "Protected Route Accessed",
            userId: req.user.id
        });
    }
);

app.get("/", (req, res) => {
    res.send("Expense Tracker API Running...");
});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


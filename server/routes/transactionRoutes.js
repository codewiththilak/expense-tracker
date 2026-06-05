import express from "express";

import {
    createTransaction,
    getTransactions,
    deleteTransaction,
    getTransactionById,
    updateTransaction
} from "../controllers/transactionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); 

router.post(
    "/",
    authMiddleware,
    createTransaction
); 

router.get(
    "/",
    authMiddleware,
    getTransactions
);

router.get(
    "/:id",
    authMiddleware,
    getTransactionById
);

router.put(
    "/:id",
    authMiddleware,
    updateTransaction
);

router.delete(
    "/:id",
    authMiddleware,
    deleteTransaction
);

export default router;


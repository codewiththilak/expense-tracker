import pool from "../config/db.js";

export const createTransaction = async (req, res) => {
    try {

        const {
            amount,
            type,
            category,
            description,
            transaction_date
        } = req.body;

        const userId = req.user.id;

        const result = await pool.query(
            `
            INSERT INTO transactions
            (
                user_id,
                amount,
                type, 
                category,
                description,
                transaction_date
            )
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING * 
            `,
            [
                userId,
                amount,
                type,
                category,
                description,
                transaction_date
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};


export const getTransactions = async (req, res) => {
    try {

        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT *
            FROM transactions
            WHERE user_id = $1
            ORDER BY transaction_date DESC       
            `,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


export const deleteTransaction = async (req, res) => {

    try {

        const transactionId = req.params.id;

        const userId = req.user.id;

        const result = await pool.query(
            `
            DELETE FROM transactions 
            WHERE id = $1
            AND user_id = $2
            RETURNING *
            `,
            [transactionId, userId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json({
            message: "Transaction deleted successfully"
        });
    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getTransactionById = async (req, res) => {

    try {

        const transactionId = req.params.id;

        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT *
            FROM transactions
            WHERE id = $1
            AND user_id = $2
            `,
            [transactionId, userId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


export const updateTransaction = async (req, res) => {

    try {

        const transactionId = req.params.id;

        const userId = req.user.id;

        const {
            amount,
            type,
            category,
            description,
            transaction_date
        } = req.body;

        const result = await pool.query(
            `
            UPDATE transactions
            SET
                amount = $1,
                type = $2,
                category = $3,
                description = $4,
                transaction_date = $5
            WHERE id = $6
            AND user_id = $7
            RETURNING *
            `,
            [
                amount,
                type,
                category,
                description,
                transaction_date,
                transactionId,
                userId
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json({
            message: "Transaction updated successfully",
            transaction: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};




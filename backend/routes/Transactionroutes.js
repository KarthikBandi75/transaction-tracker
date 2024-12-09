import express from "express";
import { Transaction } from "../Models/Transactionmodel.js";

const router = express.Router();

// Route to add a new transaction
router.post('/', async (req, res) => {
    try {
        const { date, description, amount, paymentMethod, transactionCategory, transactionType } = req.body;

        // Validate input
        if (!date || !description || amount == null || !paymentMethod || !transactionCategory || !transactionType) {
            return res.status(400).json({
                message: 'All fields (date, description, amount, paymentMethod, transactionCategory, transactionType) are required',
            });
        }

        const newTransaction = {
            date,
            description,
            amount,
            paymentMethod,
            transactionCategory,
            transactionType,
        };

        // Get the first document or create a new one if no transactions exist
        let transactionDoc = await Transaction.findOne();
        if (!transactionDoc) {
            transactionDoc = new Transaction({ transactions: [], netAmountSpent: 0 });
        }

        // Adjust netAmountSpent based on transaction type
        if (transactionType === 'credit') {
            transactionDoc.netAmountSpent += parseFloat(amount);
        } else if (transactionType === 'debit') {
            transactionDoc.netAmountSpent -= parseFloat(amount);
        }

        // Add the new transaction
        transactionDoc.transactions.push(newTransaction);
        await transactionDoc.save();

        res.status(201).json({
            message: 'Transaction added successfully',
            transaction: newTransaction,
            netAmountSpent: transactionDoc.netAmountSpent,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all transactions
router.get("/", async (req, res) => {
    try {
        const transactionDoc = await Transaction.findOne();

        // If there are no transactions, return an empty response
        if (!transactionDoc || transactionDoc.transactions.length === 0) {
            return res.status(200).json({
                message: 'No transactions found',
                netAmountSpent: 0,
                transactions: [],
            });
        }

        // Return the transactions and the netAmountSpent
        res.status(200).json({
            message: 'Transactions retrieved successfully',
            netAmountSpent: transactionDoc.netAmountSpent,
            transactions: transactionDoc.transactions,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get a transaction by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const transactionDoc = await Transaction.findOne({ "transactions._id": id });

        if (!transactionDoc) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const transaction = transactionDoc.transactions.id(id);
        res.status(200).json({
            message: 'Transaction retrieved successfully',
            transaction,
        });
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to update a transaction by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { date, description, amount, paymentMethod, transactionCategory, transactionType } = req.body;

        // Validate input
        if (!date || !description || amount == null || !paymentMethod || !transactionCategory || !transactionType) {
            return res.status(400).json({
                message: 'All fields (date, description, amount, paymentMethod, transactionCategory, transactionType) are required',
            });
        }

        console.log('Request to update transaction:', req.body); // Log the received data

        const transactionDoc = await Transaction.findOne({ "transactions._id": id });

        if (!transactionDoc) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const transactionToUpdate = transactionDoc.transactions.id(id);

        if (!transactionToUpdate) {
            return res.status(404).json({ message: 'Transaction not found in transactions' });
        }

        // Adjust netAmountSpent for the old transaction
        if (transactionToUpdate.transactionType === 'credit') {
            transactionDoc.netAmountSpent -= parseFloat(transactionToUpdate.amount);
        } else if (transactionToUpdate.transactionType === 'debit') {
            transactionDoc.netAmountSpent += parseFloat(transactionToUpdate.amount);
        }

        // Update the transaction details
        transactionToUpdate.date = date;
        transactionToUpdate.description = description;
        transactionToUpdate.amount = parseFloat(amount); // Ensure the amount is correctly parsed
        transactionToUpdate.paymentMethod = paymentMethod;
        transactionToUpdate.transactionCategory = transactionCategory;
        transactionToUpdate.transactionType = transactionType;

        // Adjust netAmountSpent based on the updated transaction type
        if (transactionType === 'credit') {
            transactionDoc.netAmountSpent += parseFloat(amount);
        } else if (transactionType === 'debit') {
            transactionDoc.netAmountSpent -= parseFloat(amount);
        }

        // Save the updated transaction
        await transactionDoc.save();

        res.status(200).json({
            message: 'Transaction updated successfully',
            transaction: transactionToUpdate,
            netAmountSpent: transactionDoc.netAmountSpent,
        });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a transaction by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document containing the transaction
        const transactionDoc = await Transaction.findOne({ "transactions._id": id });

        if (!transactionDoc) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Find the transaction to delete
        const transactionToDelete = transactionDoc.transactions.id(id);

        if (!transactionToDelete) {
            return res.status(404).json({ message: 'Transaction not found in transactions' });
        }

        // Adjust netAmountSpent based on the transaction type
        if (transactionToDelete.transactionType === 'credit') {
            transactionDoc.netAmountSpent -= transactionToDelete.amount;
        } else if (transactionToDelete.transactionType === 'debit') {
            transactionDoc.netAmountSpent += transactionToDelete.amount;
        }

        // Remove the transaction from the array
        transactionDoc.transactions.pull(id);

        // If there are no transactions left, reset netAmountSpent to 0
        if (transactionDoc.transactions.length === 0) {
            transactionDoc.netAmountSpent = 0;
        }

        // Save the updated document
        await transactionDoc.save();

        res.status(200).json({
            message: 'Transaction deleted successfully',
            netAmountSpent: transactionDoc.netAmountSpent,
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;

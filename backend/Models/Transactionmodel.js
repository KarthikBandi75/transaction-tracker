import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    transactions: [
      {
        date: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true, // Describes what the transaction was for
        },
        amount: {
          type: Number,
          required: true, // Amount for each transaction
        },
        paymentMethod: {
          type: String,
          required: true, // UPI service or cash (PhonePe, Google Pay, Paytm, etc.)
        },
        transactionCategory: {
          type: String,
          required: true, // Example: groceries, bills, entertainment, etc.
        },
        transactionType: {
          type: String,
          enum: ['credit', 'debit'], // Can either be 'credit' or 'debit'
          required: true, // Whether it’s an income or expense
        },
      },
    ],
    netAmountSpent: {
      type: Number,
      default: 0, // Keeps track of total net amount spent (or earned, depending on credit/debit)
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);

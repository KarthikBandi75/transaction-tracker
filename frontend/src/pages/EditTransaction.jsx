import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Updated for React Router v6+
import { getTransactionById, updateTransaction } from "../services/api"; // Adjust according to your file structure
import { Container, TextField, Button, MenuItem, Typography, Box, Snackbar, Alert } from '@mui/material';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate instead of history for React Router v6+
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    paymentMethod: "",
    transactionCategory: "",
    transactionType: "",
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { transaction } = await getTransactionById(id);

        // Format the date if it's not in the correct format
        const formattedDate = transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '';

        setTransaction({
          ...transaction,
          date: formattedDate,  // Set formatted date
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction by ID:", error);
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!transaction.date) errors.date = 'Date is required.';
    if (!transaction.amount) errors.amount = 'Amount is required.';
    if (!transaction.paymentMethod) errors.paymentMethod = 'Payment Method is required.';
    if (!transaction.transactionCategory) errors.transactionCategory = 'Category is required.';
    if (!transaction.transactionType) errors.transactionType = 'Transaction Type is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedData = { ...transaction };
      await updateTransaction(id, updatedData);
      setSnackbarOpen(true); // Show success notification
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
          color: '#512da8',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Edit Transaction
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          width: '100%',
          padding: 4,
          borderRadius: 3,
          background: '#ffffff',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          name="date"
          label="Date"
          type="date"
          value={transaction.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="Select the transaction date"
          error={!!errors.date}
          helperText={errors.date}
        />
        <TextField
          name="description"
          label="Description (Optional)"
          value={transaction.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Describes what the transaction was for"
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={transaction.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter the transaction amount"
          error={!!errors.amount}
          helperText={errors.amount}
        />
        <TextField
          name="paymentMethod"
          label="Payment Method"
          select
          value={transaction.paymentMethod}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.paymentMethod}
          helperText={errors.paymentMethod}
        >
          <MenuItem value="PhonePay">PhonePay</MenuItem>
          <MenuItem value="GooglePay">GooglePay</MenuItem>
          <MenuItem value="Paytm">Paytm</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="CreditCard">Credit Card</MenuItem>
        </TextField>
        <TextField
          name="transactionCategory"
          label="Category"
          value={transaction.transactionCategory}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Example: groceries, bills, entertainment, etc."
          error={!!errors.transactionCategory}
          helperText={errors.transactionCategory}
        />
        <TextField
          name="transactionType"
          label="Transaction Type"
          select
          value={transaction.transactionType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Select the transaction type"
          error={!!errors.transactionType}
          helperText={errors.transactionType}
        >
          <MenuItem value="credit">Credit</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 3,
            padding: 1.5,
            fontWeight: 'bold',
            color: '#ffffff',
            background: 'linear-gradient(90deg, #ff6f00, #f57c00)',
            '&:hover': { background: 'linear-gradient(90deg, #e65100, #ef6c00)' },
          }}
          fullWidth
        >
          Update Transaction
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Transaction updated successfully! Redirecting to home...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditTransaction;

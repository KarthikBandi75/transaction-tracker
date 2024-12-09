import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../services/api';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    paymentMethod: '',
    transactionCategory: '',
    transactionType: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.amount) errors.amount = 'Amount is required.';
    if (!formData.paymentMethod) errors.paymentMethod = 'Payment Method is required.';
    if (!formData.transactionCategory) errors.transactionCategory = 'Category is required.';
    if (!formData.transactionType) errors.transactionType = 'Transaction Type is required.';

    // Handle optional description field
    if (formData.description === '') delete errors.description;  // Allow empty description
    else if (formData.description && formData.description.trim() === '') {
      errors.description = 'Description cannot be just spaces.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await addTransaction(formData);
      setSnackbarOpen(true); // Show success notification
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        Add Transaction
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
          value={formData.date}
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
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Describes what the transaction was for"
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={formData.amount}
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
          value={formData.paymentMethod}
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
          value={formData.transactionCategory}
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
          value={formData.transactionType}
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
          Add Transaction
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Transaction added successfully! Redirecting to home...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddTransaction;

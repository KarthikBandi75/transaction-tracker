import axios from 'axios';

// Set the base URL for your API
const API = axios.create({ baseURL: 'http://localhost:5000' }); 

// Fetch all transactions
export const getTransactions = async () => {
  try {
    const response = await API.get('/Transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Add a new transaction
export const addTransaction = async (transactionData) => {
  try {
    await API.post('/Transactions', transactionData);
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (id) => {
  try {
    await API.delete(`/Transactions/${id}`);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Update a transaction by ID
export const updateTransaction = async (id, updatedData) => {
  try {
    const response = await API.put(`/Transactions/${id}`, updatedData);
    return response.data;  // Return updated data
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Get transaction by ID (useful for editing)
export const getTransactionById = async (id) => {
  try {
    const response = await API.get(`/Transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    throw error;
  }
};

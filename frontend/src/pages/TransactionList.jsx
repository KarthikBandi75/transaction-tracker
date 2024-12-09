import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import TransactionCard from '../components/TransactionCard';
import { getTransactions, deleteTransaction } from '../services/api';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Transactions
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      {filteredTransactions.map((transaction) => (
        <div key={transaction._id}>
          <TransactionCard transaction={transaction} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(transaction._id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default TransactionsList;

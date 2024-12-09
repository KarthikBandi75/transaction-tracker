import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [netAmountSpent, setNetAmountSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewTransaction, setViewTransaction] = useState(null);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, '0')}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getFullYear()}`;
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data.transactions);
      setNetAmountSpent(data.netAmountSpent);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        fetchTransactions();
      } catch (err) {
        console.error('Error deleting transaction:', err);
        alert('Failed to delete transaction');
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homepage-container">
      <div className="header">
        <p className="net-amount">Net Amount Spent: ₹{netAmountSpent.toFixed(2)}</p>
      </div>

      {viewTransaction ? (
        <div className="transaction-card-view">
          <div className="transaction-card">
            <p><strong>Date:</strong> {formatDate(viewTransaction.date)}</p>
            <p><strong>Description:</strong> {viewTransaction.description}</p>
            <p><strong>Amount:</strong> ₹{viewTransaction.amount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {viewTransaction.paymentMethod}</p>
            <p><strong>Category:</strong> {viewTransaction.transactionCategory}</p>
            <p><strong>Type:</strong> {viewTransaction.transactionType}</p>
            <button onClick={() => setViewTransaction(null)} className="close-view-btn">
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.description}</td>
                    <td>₹{transaction.amount.toFixed(2)}</td>
                    <td>{transaction.paymentMethod}</td>
                    <td>{transaction.transactionCategory}</td>
                    <td>{transaction.transactionType}</td>
                    <td className="actions">
                      <FaEye
                        title="View"
                        onClick={() => setViewTransaction(transaction)}
                        className="icon view-icon"
                      />
                      <FaEdit 
                        title="Edit"
                        onClick={() => navigate(`/edit/${transaction._id}`)}
                        className="icon edit-icon"
                      />
                      <FaTrash
                        title="Delete"
                        onClick={() => handleDelete(transaction._id)}
                        className="icon delete-icon"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No transactions found. Add some transactions to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="add-transaction-btn">
        <button onClick={() => navigate('/add')}>Add New Transaction</button>
      </div>
    </div>
  );
};

export default HomePage;

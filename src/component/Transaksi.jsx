import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Transaksi.css";

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionCode, setTransactionCode] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil id dari params

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  // Mengambil data transaksi dari API
  const fetchTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:5173/bills");
      setTransactions(
        response.data.filter((t) => t.customerId === parseInt(id))
      );
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Menambah atau memperbarui transaksi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      code: transactionCode,
      name: transactionName,
      amount: parseFloat(transactionAmount),
      customerId: parseInt(id),
    };

    try {
      if (editingTransaction) {
        await axios.get(
          `http://localhost:5173/bills/${editingTransaction.code}`,
          transactionData
        );
        setTransactions(
          transactions.map((t) =>
            t.code === editingTransaction.code
              ? { ...editingTransaction, ...transactionData }
              : t
          )
        );
        setEditingTransaction(null);
      } else {
        await axios.get("http://localhost:5173/bills", transactionData);
        setTransactions([
          ...transactions,
          { ...transactionData, id: Date.now() },
        ]);
      }
      setTransactionCode("");
      setTransactionName("");
      setTransactionAmount("");
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  };

  // Menghapus transaksi
  const handleDelete = async (transactionCode) => {
    try {
      await axios.get(`http://localhost:5173/bills/${transactionCode}`);
      setTransactions(transactions.filter((t) => t.code !== transactionCode));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  // Memilih transaksi untuk diedit
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setTransactionCode(transaction.code);
    setTransactionName(transaction.name);
    setTransactionAmount(transaction.amount);
  };

  // Membatalkan pengeditan
  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setTransactionCode("");
    setTransactionName("");
    setTransactionAmount("");
  };

  return (
    <div className="transaksi-container">
      <h1>Transaksi</h1>

      {/* Formulir Transaksi */}
      <div className="transaction-form-container">
        <h2>{editingTransaction ? "Edit Transaksi" : "Tambah Transaksi"}</h2>
        <form onSubmit={handleSubmit} className="transaction-form">
          <input
            type="text"
            value={transactionCode}
            onChange={(e) => setTransactionCode(e.target.value)}
            placeholder="Kode Transaksi"
            className="transaction-input"
            required
          />
          <input
            type="text"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            placeholder="Nama Transaksi"
            className="transaction-input"
            required
          />
          <input
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            placeholder="Jumlah"
            className="transaction-input"
            required
          />
          <button type="submit" className="transaction-button">
            {editingTransaction ? "Simpan Perubahan" : "Tambah Transaksi"}
          </button>
          {editingTransaction && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="transaction-button transaction-cancel"
            >
              Batal
            </button>
          )}
        </form>
      </div>

      {/* Tabel Transaksi */}
      <div className="transaction-table-container">
        <h2>Daftar Transaksi</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Jumlah</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.code}>
                <td>{transaction.code}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="transaction-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.code)}
                    className="transaction-button transaction-delete"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;

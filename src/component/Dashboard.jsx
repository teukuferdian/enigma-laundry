import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useProducts } from "./ProductContext";

const Dashboard = () => {
  const { products } = useProducts();
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/v1/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomers(response.data.data);
        console.log("Customers:", response.data.data); // Tambahkan logging untuk debug
      } catch (error) {
        console.error("Gagal memuat pelanggan", error.message);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/v1/bills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.data);
        console.log("Transactions:", response.data.data); // Tambahkan logging untuk debug
      } catch (error) {
        console.error("Failed to fetch transactions:", error.message);
      }
    };

    if (token) {
      // Pastikan token ada sebelum melakukan request
      fetchCustomers();
      fetchTransactions();
    } else {
      console.error("Token tidak ditemukan");
    }
  }, [token]); // Token sebagai dependensi useEffect

  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalTransactions = transactions.length;
  const totalTransactionAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <h2>Total Produk</h2>
          <p>{totalProducts}</p>
        </div>

        <div className="summary-card">
          <h2>Total Pelanggan</h2>
          <p>{totalCustomers}</p>
        </div>

        <div className="summary-card">
          <h2>Total Transaksi</h2>
          <p>{totalTransactions}</p>
        </div>

        <div className="summary-card">
          <h2>Total Jumlah Transaksi</h2>
          <p>
            {totalTransactionAmount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>

      <div className="data-tables">
        {/* Daftar Produk */}
        <div className="data-table">
          <h2>Daftar Produk</h2>
          <table>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>Rp {product.price.toLocaleString("id-ID")}</td>
                  <td>{product.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daftar Pelanggan */}
        <div className="data-table">
          <h2>Daftar Pelanggan</h2>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Nomor Hp</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daftar Transaksi */}
        <div className="data-table">
          <h2>Daftar Transaksi</h2>
          <table>
            <thead>
              <tr>
                <th>Kode Transaksi</th>
                <th>Nama Transaksi</th>
                <th>Jumlah</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.code}</td>
                  <td>{transaction.customer.name}</td>
                  <td>{transaction.billDetails[0].product.name}</td>
                  <td>{transaction.billDetails[0].qty}</td>
                 
                </tr>
              ))}
            </tbody>

            {/* <tbody>
  {transactions.map(transaction => (
    <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{transaction.customer}</td>
      <td>{(transaction.amount || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
    </tr>
  ))}
</tbody> */}

            {/* <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.customer}</td>
                  <td>{transaction.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

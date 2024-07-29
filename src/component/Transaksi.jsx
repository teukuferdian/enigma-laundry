import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Transaksi.css";

const Transaksi = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionCode, setTransactionCode] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [editingTransaction, setEditingTransaction] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // Mengambil data transaksi dari API
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5173/api/v1/bills",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setTransactions(response.data.data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error.message);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5173/api/v1/products",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setProducts(response.data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error.message);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5173/api/v1/customers",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setCustomers(response.data.data);
        } catch (error) {
            console.error("Failed to fetch customers:", error.message);
        }
    };

    // Menambah atau memperbarui transaksi

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Membuat payload
            const payload = {
                customerId: selectedCustomer,
                billDetails: [
                    {
                        product: {
                            id: selectedProduct,
                        },
                        qty: parseInt(transactionAmount, 10), // Pastikan konversi ke integer
                    },
                ],
            };
    
            // Debugging: log payload
            console.log("Payload:", payload);
    
            // Mengirimkan permintaan POST
            const response = await axios.post(
                `http://localhost:5173/api/v1/bills`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
    
            // Memeriksa apakah respons berhasil
            if (response.status === 201) {
                alert("Transaksi Berhasil");
                setSelectedCustomer("");
                setSelectedProduct("");
                setTransactionAmount("");
                fetchTransactions();
            } else {
                console.error("Failed to create transaction:", response.statusText);
            }
        } catch (error) {
            // Menampilkan informasi kesalahan
            console.error("Error during POST request:", error.response ? error.response.data : error.message);
            alert("Gagal menambahkan transaksi. Silakan coba lagi.");
        }
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const payload = {
    //             customerId: selectedCustomer,
    //             billDetails: [
    //                 {
    //                     product: {
    //                         id: selectedProduct,
    //                     },
    //                     qty: parseInt(transactionAmount),
    //                 },
    //             ],
    //         };

    //         const response = await axios.post(
    //             `http://localhost:5173/api/v1/bills`,
    //             payload,
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         if(response.status === 201) {
    //             alert("Transaksi Berhasil");
    //             setSelectedCustomer("");
    //             setSelectedProduct("");
    //             setTransactionAmount("");
    //             fetchTransactions();
                
    //         };
    //     } catch (error) {
    //         console.error( error.response);
    //     }
    // };

    // Menghapus transaksi
    const handleDelete = async (transactionCode) => {
        try {
            await axios.delete(`http://localhost:5173/api/v1/bills/${transactionCode}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setTransactions(transactions.filter((t) => t.code !== transactionCode));
        } catch (error) {
            console.error("Failed to delete transaction:", error);
            console.log("Error response:", error.response ? error.response.data : "No response data");
        }
    };

    // Memilih transaksi untuk diedit
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setTransactionCode(transaction.code);
        setSelectedCustomer(transaction.customer.id);
        setSelectedProduct(transaction.billDetails[0].product.id);
        setTransactionAmount(transaction.billDetails[0].qty);
    };

    // Membatalkan pengeditan
    const handleCancelEdit = () => {
        setEditingTransaction(null);
        setTransactionCode("");
        setSelectedCustomer("");
        setSelectedProduct("");
        setTransactionAmount("");
    };

    useEffect(() => {
        fetchTransactions();
        fetchProducts();
        fetchCustomers();
    }, []);

    return (
        <div className="transaksi-container">
            <h1>Transaksi</h1>

            {/* Formulir Transaksi */}
            <div className="transaction-form-container">
                <h2>{editingTransaction ? "Edit Transaksi" : "Tambah Transaksi"}</h2>
                <form onSubmit={handleSubmit} className="transaction-form">
                    <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
                        <option value="">Pilih Pelanggan</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
                        <option value="">Pilih Produk</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
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
                            <th>Pelanggan</th>
                            <th>Produk</th>
                            <th>Jumlah</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.code}</td>
                                <td>{transaction.customer.name}</td>
                                <td>{transaction.billDetails[0].product.name}</td>
                                <td>{transaction.billDetails[0].qty}</td>
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

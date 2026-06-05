import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { categories } from "../constants/categories";
import Navbar from "../components/Navbar";
import "../styles/transactionForm.css";

function AddTransaction() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        amount: "",
        type: "",
        category: "",
        description: "",
        transaction_date: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = async (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });

        console.log({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {

        const newError = {};

        if (!formData.type) {
            newError.type = "Please select a transaction type";
        }

        if (!formData.category) {
            newError.category = "Please select a category";
        }

        if (!formData.amount) {
            newError.amount = "Amount is required";
        }
        else if (Number(formData.amount) <= 0) {
            newError.amount = "Amount must be greater than 0";
        }

        if (!formData.transaction_date) {
            newError.transaction_date = "Date is required";
        }

        return newError;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log(validationErrors);
            return;
        }

        setErrors({});

        console.log("Form is valid");

        try {

            const response = await API.post(
                "transactions",
                formData
            );

            alert("Transaction Added Successfully");

            console.log(response.data);

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add transaction"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="form-page">

                <div className="form-card">

                    <h1 className="form-title">
                        Add Transaction
                    </h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label className="form-label">
                                Transaction Type
                            </label>

                            <div className="radio-group">

                                <label className="radio-label">

                                    <input
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={formData.type === "income"}
                                        onChange={handleChange}
                                    />

                                    Income

                                </label>

                                <label className="radio-label">

                                    <input
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={formData.type === "expense"}
                                        onChange={handleChange}
                                    />

                                    Expense

                                </label>

                            </div>

                            {errors.type && (
                                <p className="error-message">
                                    {errors.type}
                                </p>
                            )}

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Category
                            </label>

                            <select
                                className="form-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((category) => (

                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>

                                ))}

                            </select>

                            {errors.category && (
                                <p className="error-message">
                                    {errors.category}
                                </p>
                            )}

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Amount
                            </label>

                            <input
                                className="form-input"
                                type="number"
                                name="amount"
                                placeholder="Enter Amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />

                            {errors.amount && (
                                <p className="error-message">
                                    {errors.amount}
                                </p>
                            )}

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Description
                            </label>

                            <input
                                className="form-input"
                                type="text"
                                name="description"
                                placeholder="Enter Description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Transaction Date
                            </label>

                            <input
                                className="form-input"
                                type="date"
                                name="transaction_date"
                                value={formData.transaction_date}
                                onChange={handleChange}
                            />

                            {errors.transaction_date && (
                                <p className="error-message">
                                    {errors.transaction_date}
                                </p>
                            )}

                        </div>

                        <button
                            className="submit-btn"
                            type="submit"
                        >
                            Add Transaction
                        </button>

                    </form>

                </div>

            </div>
        </>
    );

}

export default AddTransaction;




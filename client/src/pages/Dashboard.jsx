import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import SummaryCards from "../components/SummaryCards";
import TransactionCard from "../components/TransactionCard";
import TransactionFilters from "../components/TransactionFilters";
import MonthlyAnalysis from "../components/MonthlyAnalysis";
import AnalyticsCharts from "../components/AnalyticsCharts"; 

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    console.log("User", user);


    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {

        try {
            const response = await API.get(
                "/transactions"
            );

            console.log(response.data);

            setTransactions(response.data);
        } catch (error) {

            console.error(error);
            alert("Failed to load transactions");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transactions ?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(
                `/transactions/${id}`
            );

            alert("Transaction deleted successfully");

            fetchTransactions();

        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message || "Failed to delete transaction"
            );
        }
    };

    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");

    const [searchTerm, setSearchTerm] = useState("");

    const filteredTransactions = transactions.filter(
        (transaction) => {

            const matchesType =
                filterType === "all" ||
                transaction.type === filterType;

            const matchesCategory =
                filterCategory === "all" ||
                transaction.category === filterCategory;

            const matchesSearch =
                transaction.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ||
                transaction.description
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            return (
                matchesType &&
                matchesCategory &&
                matchesSearch
            );
        }
    );


    const totalIncome = transactions.reduce(
        (total, transaction) => {

            if (transaction.type === "income") {
                return total + Number(transaction.amount);
            }

            return total;
        },
        0
    );

    const totalExpense = transactions.reduce(
        (total, transaction) => {

            if (transaction.type === "expense") {
                return total + Number(transaction.amount);
            }

            return total;
        },
        0
    );

    const balance = totalIncome - totalExpense;

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                <h1 className="dashboard-title">
                    Welcome {user?.name}
                </h1>

                <SummaryCards
                    balance={balance}
                    totalExpense={totalExpense}
                    totalIncome={totalIncome}
                />

                <MonthlyAnalysis 
                    transactions={transactions}
                />
                
                <AnalyticsCharts 
                    transactions = {transactions}
                />

                <TransactionFilters

                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}

                    filterType={filterType}
                    setFilterType={setFilterType}

                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}

                    transactions={transactions}

                />

                <h2 className="section-title">
                    Recent Transactions
                </h2>

                <div className="transactions-container">

                    {filteredTransactions.length === 0 ? (

                        <div className="no-transactions">
                            <h3>No Transactions Found</h3>
                            <p>
                                Add your first transaction to get started.
                            </p>
                        </div>

                    ) : (

                        filteredTransactions.map(
                            (transaction) => (

                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    navigate={navigate}
                                    deleteTransaction={deleteTransaction}
                                />

                            )
                        )

                    )}

                </div>

            </div>

        </>
    );
}

export default Dashboard;
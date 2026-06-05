import { useEffect, useEffectEvent, useState } from "react";
import "../styles/MonthlyAnalysis.css";

function MonthlyAnalysis({
    transactions
}) {

    const [selectedMonth, setSelectedMonth] = useState("");

    const availableMonths = [

        ...new Set(

            transactions.map(
                (transaction) =>
                    transaction.transaction_date.slice(0, 7)
            )
        )
    ].sort().reverse();

    useEffect(() => {

        if (
            availableMonths.length > 0 &&
            !selectedMonth
        ) {
            setSelectedMonth(
                availableMonths[0]
            )
        }
    })

    const monthlyTransactions =
        transactions.filter(
            (transaction) =>
                transaction.transaction_date.slice(0, 7) === selectedMonth
        );

    const monthlyIncome =
        monthlyTransactions.reduce(
            (total, transaction) => {

                if (
                    transaction.type === "income"
                ) {
                    return (
                        total +
                        Number(transaction.amount)
                    );
                }

                return total;
            },
            0
        );

    const monthlyExpense =
        monthlyTransactions.reduce(
            (total, transaction) => {

                if (
                    transaction.type === "expense"
                ) {
                    return (
                        total +
                        Number(transaction.amount)
                    );
                }

                return total;
            },
            0
        );

    const monthlySavings = monthlyIncome - monthlyExpense;

    const monthlyCount = monthlyTransactions.length;

    const formatMonth = (
        monthString
    ) => {

        const date = new Date(
            monthString + "-01"
        );

        return date.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );
    }

    return (

        <div
            className="monthly-analysis"
        >
            <h2 className="monthly-title">
                Monthly Analysis
            </h2>
            <div
                className="month-selector"
            >

                <label>
                    Select Month
                </label>

                <select

                    value={
                        selectedMonth
                    }

                    onChange={(e) =>

                        setSelectedMonth(
                            e.target.value
                        )

                    }

                >

                    {availableMonths.map(
                        (month) => (

                            <option
                                key={month}
                                value={month}
                            >

                                {
                                    formatMonth(
                                        month
                                    )
                                }

                            </option>

                        )
                    )}

                </select>

            </div>

            <div
                className="monthly-cards"
            >

                <div
                    className="
                card
                income-card"
                >

                    <h3>
                        Monthly Income
                    </h3>

                    <h2>

                        ₹ {
                            monthlyIncome
                                .toLocaleString()
                        }

                    </h2>

                </div>

                <div
                    className="
                card
                expense-card"
                >

                    <h3>
                        Monthly Expense
                    </h3>

                    <h2>

                        ₹ {
                            monthlyExpense
                                .toLocaleString()
                        }

                    </h2>

                </div>

                <div
                    className="
                card
                balance-card"
                >

                    <h3>
                        Net Savings
                    </h3>

                    <h2>

                        ₹ {
                            monthlySavings
                                .toLocaleString()
                        }

                    </h2>

                </div>

                <div
                    className="card"
                >

                    <h3>
                        Transactions Count 
                    </h3>

                    <h2>
                        {monthlyCount}
                    </h2>

                </div>

            </div>

        </div>

    );
};

export default MonthlyAnalysis;


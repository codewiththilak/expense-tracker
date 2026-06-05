import React from "react";

function SummaryCards({
    balance,
    totalIncome,
    totalExpense
}) {

    return (

        <div className="summary-cards">

            <div className="card balance-card">

                <h3>
                    Current Balance
                </h3>

                <h2>
                    ₹ {balance.toLocaleString()}
                </h2>

            </div>

            <div className="card income-card">

                <h3>
                    Total Income
                </h3>

                <h2>
                    ₹ {totalIncome.toLocaleString()}
                </h2>

            </div>

            <div className="card expense-card">

                <h3>
                    Total Expense
                </h3>

                <h2>
                    ₹ {totalExpense.toLocaleString()}
                </h2>

            </div>

        </div>

    );
}

export default SummaryCards;
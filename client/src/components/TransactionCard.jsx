function TransactionCard({
    transaction,
    navigate,
    deleteTransaction
}) {

    return (

        <div
            className="transaction-card"
        >

            <div className="transaction-header">

                <h3 className="transaction-category">
                    {transaction.category}
                </h3>

                <h3
                    className={
                        transaction.type === "income"
                            ? "transaction-amount income"
                            : "transaction-amount expense"
                    }
                >

                    {transaction.type === "income"
                        ? "+ "
                        : "- "}

                    ₹ {Number(
                        transaction.amount
                    ).toLocaleString()}

                </h3>

            </div>

            <div className="transaction-details">

                <p>
                    Date: {" "}
                    {
                        transaction.transaction_date
                            ?.split("T")[0]
                    }
                </p>

                {transaction.description && (

                    <p>
                        Description: {" "}
                        {transaction.description}
                    </p>

                )}

                <span
                    className={
                        transaction.type === "income"
                            ? "type-badge income-badge"
                            : "type-badge expense-badge"
                    }
                >
                    {transaction.type}
                </span>

            </div>

            <div className="action-buttons">

                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(
                            `/edit-transaction/${transaction.id}`
                        )
                    }
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() =>
                        deleteTransaction(
                            transaction.id
                        )
                    }
                >
                    Delete
                </button>

            </div>

        </div>

    );
}

export default TransactionCard;
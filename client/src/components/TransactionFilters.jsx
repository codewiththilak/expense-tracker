function TransactionFilters({

    searchTerm,
    setSearchTerm,

    filterType,
    setFilterType,

    filterCategory,
    setFilterCategory,

    transactions

}) {

    return (

        <div className="filter-container">

            <input
                type="text"
                className="filter-search"
                placeholder="Search category or description..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
            />

            <select
                className="filter-select"
                value={filterType}
                onChange={(e) =>
                    setFilterType(
                        e.target.value
                    )
                }
            >

                <option value="all">
                    All Transactions
                </option>

                <option value="income">
                    Income
                </option>

                <option value="expense">
                    Expense
                </option>

            </select>

            <select
                className="filter-select"
                value={filterCategory}
                onChange={(e) =>
                    setFilterCategory(
                        e.target.value
                    )
                }
            >

                <option value="all">
                    All Categories
                </option>

                {[...new Set(
                    transactions.map(
                        (t) => t.category
                    )
                )].map((category) => (

                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>

                ))}

            </select>

        </div>

    );
}

export default TransactionFilters;
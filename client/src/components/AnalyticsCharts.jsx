import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsCharts({ transactions }) {

    const totalIncome =
        transactions.reduce(
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

    const totalExpense =
        transactions.reduce(
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

    const barData = {

        labels: [
            "Income",
            "Expense"
        ],

        datasets: [
            {
                label: "Amount",

                data: [
                    totalIncome,
                    totalExpense
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }
        ]
    };

    const options = {

        responsive: true,

        plugins: {
            legend: {
                display: false
            },

            title: {
                display: true,
                text: "Income vs Expense"
            }
        }
    };


    return (

        <div className="analytics-section">
            <h2>
                Analytics
            </h2>

            <div className="chart-card">
                <Bar
                    data={barData}
                    options={options}
                />
            </div>

        </div>
    );
}

export default AnalyticsCharts;
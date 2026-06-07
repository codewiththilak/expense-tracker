import {
    Bar,
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsCharts({ transactions }) {


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



    const expenseTransactions = transactions.filter(
        (transaction) =>
            transaction.type === "expense"
    );

    const categoryTotals = {};

    expenseTransactions.forEach(
        (transaction) => {

            const normalizedCategory =
                transaction.category
                    .trim()
                    .charAt(0)
                    .toUpperCase() +
                transaction.category
                    .trim()
                    .slice(1)
                    .toLowerCase();

            categoryTotals[normalizedCategory] =
                (
                    categoryTotals[normalizedCategory] || 0
                ) +
                Number(transaction.amount);

        }
    );

    // Sort categories by amount descending

    const sortedCategories = Object.entries(
        categoryTotals
    ).sort(
        (a, b) => b[1] - a[1]
    );

    const pieLabels = sortedCategories.map(
        ([category]) => category
    );

    const pieValues = sortedCategories.map(
        ([, amount]) => amount
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
                ],

                borderRadius: 10
            }
        ]
    };

    const barOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            title: {
                display: true,
                text: "Income vs Expense",
                font: {
                    size: 16
                }
            }
        }
    };



    const pieData = {

        labels: pieLabels,

        datasets: [
            {
                data: pieValues,

                backgroundColor: [

                    "#4F46E5",
                    "#06B6D4",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                    "#14B8A6",
                    "#F97316",
                    "#6366F1",
                    "#84CC16"

                ],

                borderWidth: 2,
                borderColor: "#ffffff"
            }
        ]
    };

    const pieOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            title: {

                display: true,

                text: "Expense Breakdown",

                font: {
                    size: 16
                }
            },

            tooltip: {

                callbacks: {

                    label: function (context) {

                        const value = context.raw;

                        const total =
                            context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            );

                        const percentage =
                            (
                                value /
                                total
                            ) * 100;

                        return `${context.label}: ₹${value.toLocaleString()} (${percentage.toFixed(1)}%)`;
                    }
                }
            }
        }
    };

    return (

        <div className="analytics-section">

            <h2 className="section-title">
                Financial Insights
            </h2>

            <div className="charts-grid">

                <div className="chart-card">

                    <Bar
                        data={barData}
                        options={barOptions}
                    />

                </div>

                <div className="chart-card">

                    <Pie
                        data={pieData}
                        options={pieOptions}
                    />

                </div>

            </div>

        </div>

    );
}

export default AnalyticsCharts;
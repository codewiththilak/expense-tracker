import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <nav className="navbar">

            <h2 className="navbar-title"> Expense Tracker </h2>

            <div className="nav-links">
                <Link to="/dashboard">
                    Dashboard
                </Link>

                {" | "}

                <Link to="/add-transaction">
                    Add Transaction
                </Link>

                {" | "}

                <button onClick={logout} className="logout-btn">
                    Logout
                </button>

            </div>
        </nav>
    );
};

export default Navbar;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(
                "auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">
                <h1>Hola amigo</h1>
                
                <p>Sign in to manage your expenses</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <Link to="/register" className="register-link">
                    Create Account
                </Link>
            </div>
        </div>
    );
}

export default Login;
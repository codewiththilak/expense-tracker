import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", formData);

            alert("Registraction Successfull");

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                    <p className="auth-switch-text">
                        Already have an account?
                    </p>

                    <Link
                        to="/"
                        className="auth-switch-link"
                    >
                        Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register; 
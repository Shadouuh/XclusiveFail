import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";

export default function FormUser() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        nick: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        remember: false,
        nickOrEmail: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    useEffect(() => {
        const userLocal = window.localStorage.getItem("user");
        if (userLocal) {
            //aca se guardaria la cuenta
            
            navigate("/dashboard");
        }
    }, []);

    return (
        <>
            {loginForm ? (
                <Login 
                    toggleForm={() => setLoginForm(false)}
                    formData={formData}
                    handleChange={handleChange}
                />
            ) : (
                <Register 
                    toggleForm={() => setLoginForm(true)}
                    formData={formData}
                    handleChange={handleChange}
                />
            )}
        </>
    )
}
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLoginSuccess = (data) => {
        localStorage.setItem('user', JSON.stringify(data)); 
        navigate("/home");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('IsExisted.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    handleLoginSuccess(data); 
                } else {
                    setError(data.error);
                }
            } else {
                setError("Une erreur s'est produite lors de la connexion.");
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la connexion.");
        }
    };

    return (
        <div className="auth">
            <h1>Connexion</h1>
            <form action='IsExisted.php' method='POST' onSubmit={handleSubmit}>
                <label htmlFor="usern_">Username</label>
                <input type="text" id="usern_" name="username" value={username} onChange={handleUsernameChange} required />
                <label htmlFor="motdepasse">Mot de passe</label>
                <input type="password" id="motdepasse" name="password" value={password} onChange={handlePasswordChange} required />
                <div className="b">
                    <input type="submit" name="log" value="Connexion" />
                </div>
                <span>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></span>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Login;

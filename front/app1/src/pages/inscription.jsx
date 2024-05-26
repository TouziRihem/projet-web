import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../user_Data/UserContext';

function Inscription() {
    const [nom, setNom] = useState("");
    const [usern, setUsern] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useUser();
    //const { login } = useUser();
    const navigate = useNavigate();

    const handleNomChange = (e) => setNom(e.target.value);
    const handleUsernChange = (e) => setUsern(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePassChange = (e) => setPass(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("usern", usern);
        formData.append("email_", email);
        formData.append("pass", pass);

        try {
            const response = await fetch(e.target.action, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                //login({ nom, email, usern, pass });
                setUser({ nom, usern, email, id: data.id, pass });
                navigate("/home");
            } else if (data.error) {
                setError(data.error);
            }
        } catch (error) {
            console.error("Error submitting the form", error);
            setError("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="auth2">
            <h1>Inscription</h1>
            <form method="POST" action="Registre.php" onSubmit={handleSubmit}>
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={nom}
                    onChange={handleNomChange}
                    required
                />
                <label htmlFor="usern">Username:</label>
                <input
                    type="text"
                    id="prenom"
                    name="usern"
                    value={usern}
                    onChange={handleUsernChange}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email_"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label htmlFor="motdepasse">Mot de passe:</label>
                <input
                    type="password"
                    id="motdepasse"
                    name="pass"
                    value={pass}
                    onChange={handlePassChange}
                    required
                />
                <div className="b">
                    <input type="submit" name="sub" value="S'inscrire" />
                </div>
                <span>
                    Vous avez déjà un compte? <Link to="/login">Identifiez-vous</Link>
                </span>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Inscription;

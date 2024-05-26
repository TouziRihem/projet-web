import React, { useState } from "react";
import { useUser } from '../user_Data/UserContext';

const Write = () => {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!title || !category) {
            setError('Le titre et la catégorie sont obligatoires.');
            return;
        }
        if (!description && !image) {
            setError('Une description ou une image doit être fournie.');
            return;
        }
        if (!user) {
            setError('User is not logged in.');
            return;
        }


        
        const formData = new FormData();
        formData.append('titreP', title);
        formData.append('dsc', description);
        if (image) formData.append('imgP', image);
        formData.append('catP', category);
        formData.append('userId', user.id);

        try {
            const response = await fetch('../pages/AddPost.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                
                window.location.href = '/home'; 
            } else {
                setError(result.error || 'Une erreur s\'est produite lors de la création du publication.');
            }
        } catch (error) {
            setError('Une erreur s\'est produite lors de la création du publication.');
        }
    };

    return (
        <div className="writeP">
            <h1>Creation d'un post</h1>
            {error && <p className="error">{error}</p>}
            <form action="../pages/AddPost.php" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="title">Titre :</label>
                <input
                    type="text"
                    id="title"
                    name="titreP"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="descp">Description :</label>
                <textarea
                    name="dsc"
                    id="descp"
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="img">Image :</label>
                <div className="file">
                    <input
                    type="file"
                    id="img"
                    name="imgP"
                    accept="image/*"
                    onChange={handleImageChange}
                    
                /></div>
                
                <label>Catégorie :</label>
                <div className="choix">
                    <input type="radio" id="art" name="catP" value="Art" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="art">Art</label>
                    <input type="radio" id="Sc" name="catP" value="Sciences" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="Sc">Sciences</label>
                    <input type="radio" id="Technology" name="catP" value="Technology" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="Technology">Technology</label>
                    <input type="radio" id="Cinema" name="catP" value="Cinema" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="Cinema">Cinema</label>
                    <input type="radio" id="Design" name="catP" value="Design" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="Design">Design</label>
                    <input type="radio" id="Food" name="catP" value="Food" onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="Food">Food</label>
                </div>
                <div className="b">
                    <input type="submit" name="pub" value="Publier" />
                </div>
            </form>
        </div>
    );
};

export default Write;

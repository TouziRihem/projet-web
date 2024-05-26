import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Modify = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        titre: "",
        descp: "",
        image: "",
        cat: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`../pages/GetPost.php?postId=${postId}`);
                const data = await response.json();
                if (response.ok) {
                    setPost(data);
                } else {
                    console.error("Error fetching post:", data);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('../pages/UpdatePost.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...post, postId })
            });
            const data = await response.json();
            if (data.success) {
                navigate('/profile');
            } else {
                console.error("Error updating post:", data.error);
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="Posts">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="titre" value={post.titre} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="descp" value={post.descp} onChange={handleChange} required />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={post.image} onChange={handleChange} />
                </label>
                <label>
                    Category:
                    <select name="cat" value={post.cat} onChange={handleChange} required>
                        <option value="Art">Art</option>
                        <option value="Technology">Technology</option>
                        <option value="Sciences">Sciences</option>
                        <option value="Cinema">Cinema</option>
                        <option value="Design">Design</option>
                        <option value="Food">Food</option>
                    </select>
                </label>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default Modify;

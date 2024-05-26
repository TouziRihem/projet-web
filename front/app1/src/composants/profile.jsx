import React, { useState, useEffect } from "react";
import { useUser } from '../user_Data/UserContext';
import { Link } from "react-router-dom";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (user) {
                try {
                    const response = await fetch(`../pages/GetUserPosts.php?userId=${user.id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setPosts(data);
                    } else {
                        console.error("Error fetching user posts:", data);
                    }
                } catch (error) {
                    console.error("Error fetching user posts:", error);
                }
            }
        };

        fetchUserPosts();
    }, [user]);

    const handleDelete = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch('../pages/DeletePost.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId })
                });
                const data = await response.json();
                if (data.success) {
                    setPosts(posts.filter(post => post.idp !== postId));
                } else {
                    console.error("Error deleting post:", data.error);
                }
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <div className="Posts">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="Post" key={post.idp}>
                        <div className="images">
                            {post.image && <img src={post.image} alt="Post Image" />}
                        </div>
                        <div className="contenu">
                            <h2>{post.titre}</h2>
                            <p>{post.descp}</p>
                        </div>
                        <Link to={`/modify/${post.idp}`}><button>Modifier</button></Link>
                        <button onClick={() => handleDelete(post.idp)}>Supprimer</button>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default Profile;

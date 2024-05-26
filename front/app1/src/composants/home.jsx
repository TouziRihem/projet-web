import React, { useState, useEffect } from "react";
import { useUser } from '../user_Data/UserContext';
import { useLocation } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useUser();
    const location = useLocation();
    const category = new URLSearchParams(location.search).get("cat");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('../pages/GetPosts.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [category]);

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
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default Home;

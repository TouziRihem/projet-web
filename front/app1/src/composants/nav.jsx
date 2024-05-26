import React from "react";
import {Link} from "react-router-dom";
import Logo from '../imgs/logoApp.png';
import Logo2 from '../imgs/mypic.jpg';
import { useUser } from '../user_Data/UserContext';

function NavBar(){
    const { user } = useUser();
    return(
        <html>
            <div className="navB">
                <div className="logo">
                    <img src={Logo} alt="logo" className="logo-img"/>
                </div>
                <div className="links">
                    <Link to="/home/?cat='Art'">Arts</Link>
                    <Link to="/home/?cat='Technology'">technologies</Link>
                    <Link to="/home/?cat='Sciences'">sciences</Link>
                    <Link to="/home/?cat='Cinema'">Cinema</Link>
                    <Link to="/home/?cat='Design'">Design</Link>
                    <Link to="/home/?cat='Food'">Food</Link>
                </div>
                <div className="name_">
                <Link to="/profile"> <span>{user && <h1>{user.nom}</h1>}</span></Link>
                    
                    </div>
                <div className="logo2">
                    <img src={Logo2} alt="my pic" className="logo-img"/>
                </div>
                <div className="out">
                
                    <Link to="/login">Logout</Link>
                </div>
                <div className="write_">
                
                <Link to="/write">Write</Link>
                </div>
                
               
                
            </div>

        </html>
    );
}
export default NavBar;
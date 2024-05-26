import Login from './pages/login';
import Write from './composants/write';
import React from "react";

import Home from "./composants/home";
import   './style.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Inscription from "./pages/inscription";
import NavBar from './composants/nav';
import { UserProvider } from './user_Data/UserContext';
import Profile from './composants/profile';
import Modify from './composants/modify';
const Layout=({ children })=>(

  <>
  <NavBar/>
  { children }
  </>
);

const routes=createBrowserRouter([
  {path:"/home", 
  element:<Layout><Home /></Layout>},
  {path:"/modify/:postId", 
  element:<Layout><Modify /></Layout>},
  {
    path:"/login", 
  element:<Login/>},
  {path:"/", 
  element:<Inscription/>},
  {path:"/register",
  element:<Inscription/>},
  {path:"/profile", 
  element:<Layout><Profile /></Layout>},
  
  {path:"/write",
    element:<Layout><Write /></Layout>}
]);

//<RouterProvider router ={routes}/>
function App() {
  return (

    <UserProvider>
    <div className="App">
      <div className='container'>
      
      <RouterProvider router ={routes}/>
      </div>
     
    </div></UserProvider>
  );
}

export default App;

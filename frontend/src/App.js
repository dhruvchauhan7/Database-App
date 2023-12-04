import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from './pages/Products'
import AddReview from './pages/AddReview'
import "./style.scss"
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Functionality from "./pages/Functionality";
import GoodRatings from "./pages/GoodRatings";
import NoPoorReviews from "./pages/NoPoorReviews";
import PoorReviews from "./pages/PoorReviews";
import InitializeDatabase from "./pages/InitializeDatabase";
import TwoCategories from "./pages/TwoCategories";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/initialize_database",
        element: <InitializeDatabase />,
      },
      {
        path: "/products/:p_id/add-review",
        element: <AddReview />,
      },
      {
        path: "/mostitems",
        element: <Users />,
      },
      {
        path: "/two_categories",
        element: <TwoCategories />,
      },
      {
        path: "/good_ratings",
        element: <GoodRatings />,
      },
      {
        path: "/functionality",
        element: <Functionality />,
      },
      {
        path: "/no_poor_reviews",
        element: <NoPoorReviews />,
      },

      {
        path: "/poor_reviews",
        element: <PoorReviews />,
      },

    ]
  },
  {
    path: "/register",
    element: <Register />,
  },

]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;



// import React from 'react'
// import Login from './Login'
// import Signup from './Signup';
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home  from './Home'
// import './stylesheet.css';



// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path = '/' element = {<Login />}></Route>
//       <Route path = '/signup' element = {<Signup />}> </Route> 
//       <Route path = '/home' element = {<Home />}> </Route> 
//     </Routes>
//     </BrowserRouter>



//   );
// }

// export default App;

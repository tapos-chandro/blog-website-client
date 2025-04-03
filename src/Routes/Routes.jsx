import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import Wishlist from "../pages/Wishlist";
import Details from "../pages/Details";
import BlogUpdate from "../pages/BlogUpdate";
import Featured from "../pages/Featured";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <h1>Page Not Found</h1>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "add-blog",
                element: <PrivateRoute><AddBlog/></PrivateRoute>
            },
            {
                path: "all-blogs",
                element: <AllBlogs/>
            },
            {
                path: "featured",
                element: <PrivateRoute><Featured/></PrivateRoute>
            },
            {
                path: "wishlist",
                element: <PrivateRoute><Wishlist/></PrivateRoute>
            },
            {
                path: "details/:id",
                element: <PrivateRoute><Details/></PrivateRoute>
            },
            {
                path: "update/:id",
                element: <PrivateRoute><BlogUpdate/></PrivateRoute>
            },
        ]
    }
])

export default router;
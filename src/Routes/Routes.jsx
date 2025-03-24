import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";


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
                element: <AddBlog/>
            },
            {
                path: "all-blogs",
                element: <AllBlogs/>
            },
            {
                path: "featured-blogs",
                element: <FeaturedBlogs/>
            },
            {
                path: "wishlist",
                element: <Wishlist/>
            },
        ]
    }
])

export default router;
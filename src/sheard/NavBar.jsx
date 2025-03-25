import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../src/assets/smal-logo.png";

const NavBar = () => {
  // const { user, logout} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const { pathname } = useLocation();

  const naveLinks = (
    <>
      <NavLink
        to="/"
        className="text-primary-text-color font-medium hover:underline"
      >
        Home
      </NavLink>
      <NavLink
        to="/add-blog"
        className="text-primary-text-color font-medium hover:underline"
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/all-blogs"
        className="text-primary-text-color font-medium hover:underline"
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featured-blogs"
        className="text-primary-text-color font-medium hover:underline"
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className="text-primary-text-color font-medium hover:underline"
      >
        Wishlist
      </NavLink>
    </>
  );

  const loginRegisterBtn = (
    <>
      <Link
        to="/login"
        className={
          pathname === "/login"
            ? "bg-primary-color text-white px-5 py-1 rounded-full"
            : "bg-white border px-5 py-1 rounded-full border-primary-color text-primary-color"
        }
      >
        Login
      </Link>
      <Link
        to="/register"
        className={
          pathname === "/register"
            ? "bg-primary-color text-white px-5 py-1 rounded-full"
            : "bg-white border px-5 py-1 rounded-full border-primary-color text-primary-color"
        }
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="p-4  fixed top-0  z-50 w-full py-5 ">
      <div className="container mx-auto flex justify-between items-center border-1 border-gray-200 rounded-full px-5 py-2 ">
        {/* Logo */}
        <Link
          to="/"
          className="text-primary-color text-xl font-bold flex items-center gap-2"
        >
          <img src={logo} alt="" />
          Blogs
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden text-primary-color text-3xl focus:outline-none `}
        >
          {isOpen ? "X" : "☰"} {/* Open/Close Icon */}
        </button>

        {/* Navbar Links - Desktop */}
        <div className="hidden md:flex space-x-4">
          {naveLinks}
          {/* {user && (
          <>
            <NavLink to="/add-campaign" className="text-white hover:underline">Add New Campaign</NavLink>
            <NavLink to="/my-campaigns" className="text-white hover:underline">My Campaigns</NavLink>
            <NavLink to="/my-donations" className="text-white hover:underline">My Donations</NavLink>
          </>
        )} */}
        </div>

        {/* Authentication Section - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {loginRegisterBtn}
          {/* {!user ? (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg">Login</Link>
            <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded-lg">Register</Link>
          </>
        ) : (
          <div className="relative group flex ">
            {user.photoURL && <img
              src={user?.photoURL ? user.photoURL:<FaUser/> }
              className="w-10 h-10 rounded-full cursor-pointer"
            />}
            <div className="absolute hidden group-hover:block bg-white text-black px-4 py-2 rounded shadow-md top-12 left-0">
              <p>{user?.displayName || "User"}</p>
              <p>{user?.email}</p>
            </div>
            <button onClick={logout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Log out</button>
          </div>
        )} */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 mt-2 rounded text-center flex flex-col space-y-4">
          {naveLinks}
          {loginRegisterBtn}
          {/* {user && (
          <>
            <NavLink to="/add-campaign" className="block text-white py-2">Add New Campaign</NavLink>
            <NavLink to="/my-campaigns" className="block text-white py-2">My Campaigns</NavLink>
            <NavLink to="/my-donations" className="block text-white py-2">My Donations</NavLink>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="block bg-white text-blue-600 px-4 py-2 rounded-lg mt-2">Login</Link>
            <Link to="/register" className="block bg-blue-800 text-white px-4 py-2 rounded-lg mt-2">Register</Link>
          </>
        ) : (
          <div className="relative group  flex flex-col justify-center items-center   space-y-2">
           {user.photoURL &&  <img
              src={user?.photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />}
            <div className="absolute hidden group-hover:block bg-white text-black px-4 py-2 rounded shadow-md top-12 left-0">
              {user?.displayName}
            </div>
            <button onClick={logout} className=" bg-red-500 text-white  w-full py-2 rounded-lg">Log out</button>
          </div>
        )} */}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

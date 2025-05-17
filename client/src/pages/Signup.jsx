import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../utile/api";
import axios from "axios";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      if (file) {
        setValues({ ...values, [e.target.name]: file });
        console.log("File uploaded:", file);
      }
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  const nav=useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let a = await axios.post(`${apiUrl}/auth/register`, values);
    alert(a.data);
    nav("/");

    

  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Register.</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Full Name{" "}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 focus:border-black focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="xyz@gmail.com"
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 focus:border-black focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="•••••••••"
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 focus:border-black focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6 flex items-center justify-end">
            {/* <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  />
                  <label
                    for="remember_me"
                    className="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    {" "}
                    Remember me{" "}
                  </label>
                </div> */}
            {/* <Link className="text-sm"> Forgot your password? </Link> */}
          </div>
          <div className="mt-6">
            <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-600 focus:outline-none focus:border-black focus:ring focus:ring-blue-200 disabled:opacity-25 transition">
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to={"/login"} className="underline hover:text-blue-500">
              already have an account?{" "}
              <span className="font-medium"> Login </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

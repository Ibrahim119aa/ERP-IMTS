import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../utile/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
const Login = () => {
  const [LoadingData, setLoadingData] = useState(false);
  useEffect(() => {
    if (LoadingData) {
      nprogress.start();
    }
    else {
      nprogress.done();
    }

  }, [LoadingData])


  const [values, setValues] = useState({
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
  const navigator = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("values : ", values);
    setLoadingData(true);
    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, values,
        {
          withCredentials: true
        });
      if (data.success) {
        console.log(data.message);
        console.log(data.token)


        localStorage.setItem("token", data.token);
        const decodedToken = jwtDecode(data.token);
        toast.success(data.message);
        setTimeout(() => {
          navigator("/allStudents");
        }, 200)

      }
      else

      {
        toast.error(data.message);
      }

    }
    catch (err) {

    }
    finally {
      setLoadingData(false);
    }


  };
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form onSubmit={handleFormSubmit}>
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

          </div>
          <div className="mt-6">
            <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-600 focus:outline-none focus:border-black focus:ring focus:ring-blue-200 disabled:opacity-25 transition">
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to={"/signup"} className="underline hover:text-blue-500">
              Don't have an account?{" "}
              <span className="font-medium"> Sign up </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



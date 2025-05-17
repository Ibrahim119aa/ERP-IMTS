import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { apiUrl } from "../utile/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addExammode } from "../redux/itemSlice";
const AddExamMode = () => {

    const [values, setValues] = useState({
        name: "",

        created_by: "",
    });


    const token = localStorage.getItem("token");


    const getUserData = () => {
        if (token) {
            const decode = jwtDecode(token);
            console.log(decode);

            setValues(
                {
                    ...values,
                    created_by: decode.email
                }
            )
        }
    }
    useEffect(() => {
        getUserData();
        console.log(values);

    }, [])
    const handleInputChange = (e) => {
        if (e.target.name === "photo") {
            const file = e.target.files[0];
            if (file) {
                setValues({ ...values, [e.target.name]: file });
                console.log("File uploaded:", file);
            }
        } else setValues({ ...values, [e.target.name]: e.target.value });
    };
    const n = useNavigate();
const dispatch=useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("values : ", values);
        const token = localStorage.getItem("token");
        const decode = jwtDecode(token);
        console.log(decode.id.id);

        nprogress.start();
        try {
            
            let a=await dispatch(addExammode(values)).unwrap();
            nprogress.done();

            toast.success(a);
            n("/all-Exam-Mode");

        }
        catch (err) {

        }
        finally {
            nprogress.done();
        }




    };

    return (
        <div className="w-full flex-grow p-4">
            <ToastContainer position="top-right" autoClose={3000} />

            <h2 className="max-w-4xl mx-auto text-2xl font-semibold py-2">
                Add Exam Mode
            </h2>
            <div className="max-w-4xl mx-auto p-16 border border-gray-400 rounded-lg my-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Exam Mode"
                                required
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>




                        <div className="mb-6">
                            <label
                                htmlFor="created_by"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Created By
                            </label>
                            <input
                                type="text"
                                value={values.created_by}
                                disabled
                                id="createdBy"
                                name="created_by"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="created by"

                            />
                        </div>



                    </div>


                    <button
                        type="submit"
                        className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExamMode;

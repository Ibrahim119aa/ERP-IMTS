import { useState } from "react";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../utile/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addManager } from "../redux/itemSlice";
const AddManager = () => {
    const [values, setValues] = useState({
        user_name: "",
        password: "",
        full_name: "",
        email: "",
        phone: 0,
        photo: null,
        user_type: "",
        created_by: "",
        active: false,
        //updated_by: "",
        //deleted_by: "",
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
    const n = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            nprogress.start();
            const F = new FormData();


            F.append("image", values.photo);
            let a = await axios.post(`${apiUrl}/images/Save-Images`,
                F, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            values.photo = values.photo != ("" || null) ? values.photo.name : "";
            let b = await dispatch(addManager(values)).unwrap();

            toast.success(b);
            n("/allManagers");
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

            <div className="w-full -ml-16  flex-grow p-2">
                <h2 className="max-w-4xl mx-auto text-2xl font-semibold py-2">
                    Add Manager
                </h2>
                <div className="max-w-4xl mx-auto p-3 border border-gray-400 rounded-lg mt-2">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-6 mb-6 lg:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="full_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="enter fullname"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="user_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="enter username"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="xyz@gmail.com"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="123-456-6789"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            {/* <div>
                                    <label
                                        htmlFor="user_type"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        User Type
                                    </label>
                                    <select
                                        id="user_type"
                                        name="user_type"
                                        defaultValue=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <option value="" disabled>
                                            Select User Type
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div> */}
                            <div className="mb-6">
                                <label
                                    htmlFor="active"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Status
                                </label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center text-sm text-gray-900 ">
                                        <input
                                            type="radio"
                                            id="active"
                                            name="active"
                                            value={true}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        <span className="ml-2">Active</span>
                                    </label>
                                    <label className="flex items-center text-sm text-gray-900 ">
                                        <input
                                            type="radio"
                                            id="inactive"
                                            name="active"
                                            value={false}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        <span className="ml-2">Inactive</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Upload Photo
                                </label>
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                        {/* <div className="mb-6">
                                <label
                                    htmlFor="created_by"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Created By
                                </label>
                                <input
                                    type="text"
                                    id="createdBy"
                                    name="created_by"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="created by"
                                    required
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div> */}


                        <button
                            type="submit"
                            className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddManager;

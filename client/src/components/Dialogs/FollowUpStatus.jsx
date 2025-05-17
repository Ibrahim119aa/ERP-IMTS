import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

import { apiUrl } from "../../utile/api";

import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUpsStatusPopover = ({ trigger, id }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState({
        student_id: id,
        message: "",
        follow_date: "",
        status: "",
        created_by: "",
        created_at: "",
        last_status: "",
    });
    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(values);

        let a = await axios.post(`${apiUrl}/followup/add-followup`, values);
        alert("Your Response Successfully Recorded")

    };
    const getFollowStatus = async () => {
        let a = await axios.get(`${apiUrl}/followup/follow-ups/${id}`);
        console.log(a.data);
        setValues(
            {
                ...values,
                message: a.data.data.message,
                follow_date: a.data.data.follow_date,
                status: a.data.data.status,
                created_by: a.data.data.created_by,
                created_at: a.data.data.created_at,
                last_status: a.data.data.laststatus,
            }
        )
        if (a.data.length > 0) {

        }
    }
    useEffect(() => {
        getFollowStatus();

    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <h2 className="py-1 text-xl">Follow Up Status</h2>
                    </DialogTitle>
                    <DialogDescription>
                        <div>
                            <form >
                                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="student_id"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Student ID
                                        </label>
                                        <input
                                            type="text"
                                            id="student_id"
                                            name="student_id"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            value={id}
                                            disabled
                                            required
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>



                                    <div>
                                        <label
                                            htmlFor="last_status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Follow Date
                                        </label>
                                        <input
                                            type="text"
                                            id="last_status"
                                            name="follow_date"
                                            value={values.follow_date ? values.follow_date.split('T').length > 0 ? values.follow_date.split('T')[0] : '' : ''}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            required
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="last_status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Create At
                                        </label>
                                        <input
                                            type="text"
                                            id="last_status"
                                            name="follow_date"
                                            value={values.created_at ? values.created_at.split('T').length > 0 ? values.created_at.split('T')[0] : '' : ''}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            required
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="last_status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Last Status{" "}
                                        </label>
                                        <input
                                            type="text"
                                            id="last_status"
                                            name="last_status"
                                            value={values.last_status}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            required
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="last_status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Created By
                                        </label>
                                        <input
                                            type="text"
                                            id="last_status"
                                            name="created_by"
                                            value={values.created_by}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            required
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            type="text"
                                            id="message"
                                            name="message"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                                            placeholder=""
                                            required
                                            value={values.message}
                                            disabled
                                            onChange={(e) => handleInputChange(e)}
                                        ></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FollowUpsStatusPopover;

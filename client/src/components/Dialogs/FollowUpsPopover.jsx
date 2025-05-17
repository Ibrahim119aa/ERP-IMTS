import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../../utile/api";

import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUpsPopover = ({ trigger, id }) => {
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

  const token = localStorage.getItem("token")
  // const decodedToken = jwtDecode(token);


  const [userdata, setuserdata] = useState();

  const getUserData = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      setuserdata(decodedToken);
      setValues(
        {
          ...values,
          created_by: decodedToken.email
        }
      )

    }
    else {
      console.log("Dsf");

    }
  }
  useEffect(() => {
    getUserData();
  }, [])
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.id);


    values.created_by = decodedToken.id.id;



    let a = await axios.post(`${apiUrl}/followup/add-followup`, values);
    alert("Your Response Successfully Recorded")

    setIsOpen(false);

  };
  const [laststatus, setlaststatus] = useState([]);

  const getLastStatus = async () => {
    let a = await axios.get(`${apiUrl}/last-status/get-last-status`);
    setlaststatus(a.data);

  }
  useEffect(() => {
    const fetchData = async () => {
      await getLastStatus();
    }
    fetchData();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="py-1 text-xl">Create Follow Up</h2>
          </DialogTitle>
          <DialogDescription>
            <div>
              <form onSubmit={handleFormSubmit}>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  {/* <div>
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
                  </div> */}

                  <div>
                    <label
                      htmlFor="follow_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Follow Date
                    </label>
                    <input
                      type="date"
                      id="follow_date"
                      name="follow_date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                      placeholder=""
                      required
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                      placeholder=""
                      required
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div> */}


                  <div>
                    <label
                      htmlFor="last_status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Last Status{" "}
                    </label>
                    <select
                      id="user_type"
                      name="last_status"
                      defaultValue=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="" disabled>
                        Select Last Status
                      </option>
                      {
                        laststatus.map((v) =>
                        (
                          <option value={v.id}>{v.name}</option>

                        ))
                      }
                    </select>

                  </div>
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
                    rows={5}
                    required
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                </div>
                <div className="w-full mt-3">
                  <button
                    type="submit"
                    className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpsPopover;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../utile/api";

const CounselorsViewDetails = () => {
  const { id } = useParams();

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
  const [tableDate, settabledata] = useState([]);


  const getCounselorDetail = async () => {
    let a = await axios.get(`${apiUrl}/counsellor/get-single-counsellor?Id=${id}`);
    console.log(a.data);
    setValues(a.data.counsellor);
    setValues(a.data.counsellor[0]);
    settabledata(a.data.student);

  }

  useEffect(() => {
    getCounselorDetail();
  }, [id])
  const studentColumns = [
    {
      key: "id",
      header: "Student ID",
    },
    {
      key: "name",
      header: " Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone",
      header: "Phone",
    },
  ];



  return (
    <div className="w-full flex-grow p-4">

      <div className="w-full -ml-16  flex-grow p-2">
        <h2 className="max-w-4xl mx-auto text-2xl font-semibold py-2">
          Responsible Person Detail
        </h2>
        <div className="max-w-4xl mx-auto p-3 border border-gray-400 rounded-lg mt-2">
          <form >
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
                  value={values.full_name}
                  name="full_name"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter fullname"
                  required
                  disabled
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
                  value={values.user_name}
                  name="user_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter username"
                  required
                  disabled
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
                  value={values.email}
                  name="email"
                  disabled
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
                  disabled
                  // value={values.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div >
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
                      value="true"
                      checked={values.status === "true"}
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
                      checked={values.status === "false"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
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
                  value={values.phone}
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-456-6789"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  disabled

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
              {/* <div className="mb-6">
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
                      value={values.active}
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
                      value={values.active}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div> */}

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


            {/* <button
              type="submit"
              className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
            >
              Update
            </button> */}
          </form>
          <div className="w-full mt-3 p-3
                 flex justify-between items-center">
            <h2 className="my-2 font-medium text-xl">Assign Student</h2>
            <h2 className="my-2 font-medium text-xl">
              Total Student : <span className="text-indigo-500">{tableDate.length}</span>
            </h2>
          </div>
          <Table>
            <TableCaption>A list of your assigned students.</TableCaption>
            <TableHeader>
              <TableRow>
                {studentColumns.map((column, index) => (
                  <TableHead key={index} className="w-[100px]">
                    {column?.header}
                  </TableHead>
                ))}

                {/*  <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDate?.map((data, index) => (
                <TableRow key={index}>
                  {studentColumns.map((column, i) => (
                    <TableCell key={i} className="font-medium">
                      {data[column.key]}
                    </TableCell>
                  ))}

                  {/* <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>

    </div>
  );
};

export default CounselorsViewDetails;

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddProfile = () => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("values : ", values);
  };

  return (
    <div className="w-full flex-grow p-4">
      <h2 className="max-w-4xl mx-auto text-2xl font-semibold py-2">
        Add Profile
      </h2>
      <div className="max-w-4xl mx-auto p-16 border border-gray-400 rounded-lg my-4">
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter fullname"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="user_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter username"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="xyz@gmail.com"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-456-6789"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="user_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            </div>
            <div className="mb-6">
              <label
                htmlFor="active"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Status
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center text-sm text-gray-900 dark:text-gray-300">
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
                <label className="flex items-center text-sm text-gray-900 dark:text-gray-300">
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
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
              id="createdBy"
              name="created_by"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="created by"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="updated_by"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Updated By
            </label>
            <input
              type="text"
              id="updated_by"
              name="updated_by"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="updated by"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div> */}
          {/* <div className="mb-6">
            <label
              htmlFor="deleted_by"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Deleted By
            </label>
            <input
              type="text"
              id="deleted_by"
              name="deleted_by"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="deleted by"
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
  );
};

export default AddProfile;

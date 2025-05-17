/* export type Student = {
  id: string,
  full_name: string,
  user_name: string,
  email: string,
  status: true,
  phone: number,
}; */
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from "axios";
import { apiUrl } from "../../../utile/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const columns = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.photo}
          alt=""
          className="h-[45px] w-[45px] rounded-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user_name",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className="flex items-center gap-2">
          <ToastContainer position="top-right" autoClose={3000} />

          {/* <button
            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
            onClick={() => {
              // Handle view details logic here
              //navigate(`/viewProfile/${row.original.id}`);
              console.log("Viewing details for row:", row.original);
            }}
          >
            View Details
          </button> */}
          <i
            className="fa fa-trash text-red-500 cursor-pointer"
            onClick={async () => {

              try {
                nprogress.start();
                let a = await axios.delete(`${apiUrl}/manager/delete-manager/${row.original.id}`);
                toast.success(a.data);
                window.location.reload();

              }
              catch (err) {
console.log(err);
              }
              finally {
                nprogress.done();
              }
            }}
          >

          </i>
          <Button
            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
            onClick={() => navigate(`/manager-details/${row.original.id}`)}
          >
            View Details
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

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
import { Checkbox } from "../../ui/checkbox";
import axios from "axios";
import { apiUrl } from "../../../utile/api";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          /* ||
          (table.getIsSomePageRowsSelected() && "indeterminate") */
        }
        //onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        onCheckedChange={(value) => {
          const isChecked = !!value;
          // Select or deselect all rows across all pages
          table.getFilteredRowModel().rows.forEach((row) => {
            row.toggleSelected(isChecked);
          });
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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


         
          <i
            className="fa fa-trash text-red-500 cursor-pointer"
            onClick={async () => {

              try {
                nprogress.start();
                let a = await axios.delete(`${apiUrl}/counsellor/delete-counselor/${row.original.id}`);
                toast.success(a.data);
                window.location.reload();

              }
              catch (err) {

              }
              finally {
                nprogress.done();
              }
            }}
          >

          </i>
          <Button
            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
            onClick={() => {
              // Handle view details logic here
              navigate(`/Responsible-details/${row.original.id}`);
              console.log("Viewing details for row:", row.original);
            }}
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

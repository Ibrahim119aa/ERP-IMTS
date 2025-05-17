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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from "axios";
import { apiUrl } from "../../../utile/api";

export const columns = [

  {
    accessorKey: "id",
    header: "S No",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "created_by",
    header: "Added By",
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
            className="fa fa-trash text-red-700 cursor-pointer"
            onClick={async () => {

              nprogress.start();
              try {
                let a = await axios.delete(`${apiUrl}/last-status/delete-last-status/${row.original.id}`);
                toast.success(a.data);
                window.location.reload();


              }
              catch (err) {
                toast.error("Some issue occur");
              }
              finally {
                nprogress.done();

              }


            }}
          >

          </i>
          <i
            className="fa fa-edit text-red-700 cursor-pointer"
            onClick={async () => {

              nprogress.start();
              try {
                navigate(`/Last-Status/${row.original.id}`)


              }
              catch (err) {
                toast.error("Some issue occur");
              }
              finally {
                nprogress.done();

              }


            }}
          >

          </i>
        </div>
      );
    },
  }



];

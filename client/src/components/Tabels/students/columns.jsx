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
import { Checkbox } from "../../ui/checkbox";
import { useNavigate } from "react-router-dom";
import FollowUpsPopover from "../../Dialogs/FollowUpsPopover";

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
    accessorKey: "student_name",
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
    accessorKey: "student_id",
    header: "Student ID",
  },
  {
    accessorKey: "counselor_name",
    header: "Counsellor Name",
  },

  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },


  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
            onClick={() => {
              // Handle view details logic here
              navigate(`/viewProfile/${row.original.id}`);
              console.log("Viewing details for row:", row.original);
            }}
          >
            View Details
          </Button>
          {/* <button
            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
            onClick={() => {
              // Handle view details logic here
              navigate(`/viewProfile/${row.original.id}`);
              console.log("Viewing details for row:", row.original);
            }}
          >
            Follow-ups
          </button> */}
          <FollowUpsPopover
            trigger={
              <Button className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black">
                Follow Ups
              </Button>
            }
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

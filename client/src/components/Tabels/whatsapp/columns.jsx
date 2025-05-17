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

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "phone",
    header: "Mobile Number",
  },


  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "send_date",
    header: "Send Date",
  },
  {
    accessorKey: "send_time",
    header: "Send Time",
  },




];

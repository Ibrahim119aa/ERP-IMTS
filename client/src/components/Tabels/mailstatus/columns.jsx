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
    accessorKey: "sender",
    header: "Sender Mail",
  },
  {
    accessorKey: "email",
    header: "Receive Mail",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Send At",
  },




];

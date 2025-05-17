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
    accessorKey: "student_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name ",
  },
  {
    accessorKey: "follow_date",
    header: "Follow Date ",
  },
  {
    accessorKey: "follow_time",
    header: "Follow Time ",
  },


  {
    accessorKey: "message",
    header: "Message ",
  },
  {
    accessorKey: "created_by",
    header: "Added By ",
  },




];

import { DataTable } from "../components/Tabels/students/data-table";

import { useEffect, useState } from "react";
import { apiUrl } from "../utile/api";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';


const AllStudents = () => {

  const dispatch = useDispatch();



  let columns = localStorage.getItem("column");
  columns = JSON.parse(columns);
console.log(`This is cpppp`+columns);
  if (columns == null) {
    columns = useSelector((state) => state.counter.column);
  }


  // const column = [
  //   { id: 'student_id', label: 'Select', minWidth: 50 },

  //   { id: 'student_name', label: 'Full Name', minWidth: 200 },
  //   { id: 'counselor_name', label: 'Counsellor Name', minWidth: 200 },
  //   { id: 'responsable_person', label: 'Responsible Person', minWidth: 200 },

  //   { id: 'Email', label: 'Email', minWidth: 200 },
  //   { id: 'phone', label: 'Phone', minWidth: 200 },


  //   { id: 'action', label: 'Action', minWidth: 100 }
  // ];

  return (
    <div className="w-full h-full">
      <div className="container mx-auto pb-2 pt-1 px-2">



        <DataTable columns={columns} />
      </div>
    </div>
  );
};

export default AllStudents;

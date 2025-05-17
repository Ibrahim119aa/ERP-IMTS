import React, { useEffect, useState } from "react";
import { columns } from "../components/Tabels/counselors/columns";
import { DataTable } from "../components/Tabels/counselors/data-table";
import axios from "axios";
import { apiUrl } from "../utile/api";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from "react-redux";
import { getCounselor, getCounselorDetail } from "../redux/itemSlice";
const AllCounselors = () => {


  const [LoadinData, setLoadingData] = useState(false);

  const counsellors = useSelector(getCounselorDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (counsellors == undefined || counsellors.length == 0 || counsellors == null) {
        setLoadingData(true);
        await dispatch(getCounselor()).unwrap();
        setLoadingData(false);
      }
    }
    fetchData();
  }, [dispatch])

  console.log(counsellors)

  return (
    <div className="w-full h-full">
      <div className="container mx-auto pb-2 pt-1 px-2">
        {
          LoadinData ?
            (
              <div
                className="flex items-center  justify-center w-full "
                style={{ marginTop: "10rem" }}
              >
                <span className="flex items-center gap-2">
                  <ClipLoader color="#3498db" size={30} /> Loading...
                </span>
              </div>
            ) : <DataTable columns={columns} data={counsellors} />

        }
      </div>
    </div>
  );
};

export default AllCounselors;

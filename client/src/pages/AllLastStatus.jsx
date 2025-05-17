import React, { useEffect, useState } from "react";
import { columns } from "../components/Tabels/laststatus/columns";
import { DataTable } from "../components/Tabels/laststatus/data-table";
import axios from "axios";
import { apiUrl } from "../utile/api";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getLastStatus, getLastStatusDetail } from "../redux/itemSlice";
const AllLastStatus = () => {


    const dispatch = useDispatch();
    const manager = useSelector(getLastStatusDetail)
    const [LoadingData, setLoadingData] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if(manager==undefined || manager.length==0 || manager==null)
            {
                setLoadingData(true);
                await dispatch(getLastStatus()).unwrap();
                setLoadingData(false);
            }
        }
        fetchData();
    }, [dispatch])


    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto p-2">
            <div className="w-full h-full">
                <div className="container mx-auto pb-2 pt-1 px-2">
                    {
                        LoadingData ?
                            (
                                <div
                                    className="flex items-center  justify-center w-full "
                                    style={{ marginTop: "10rem" }}
                                >
                                    <span className="flex items-center gap-2">
                                        <ClipLoader color="#3498db" size={30} /> Loading...
                                    </span>
                                </div>
                            ) : <DataTable columns={columns} data={manager} />
                    }
                </div>
            </div>
        </div>
    );
};

export default AllLastStatus;

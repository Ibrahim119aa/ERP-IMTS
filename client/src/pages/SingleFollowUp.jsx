import React, { useEffect, useState } from "react";
import { columns } from "../components/Tabels/followup/columns";

import { DataTable } from "../components/Tabels/followup/data-table";
import axios from "axios";
import { apiUrl } from "../utile/api";
import { useParams } from "react-router-dom";

const SingleFollowUp = () => {

    const { Id } = useParams();
    let id = Id;


    const [followup, setfollowup] = useState([]);

    const getFollowStatus = async () => {
        let a = await axios.get(`${apiUrl}/followup/follow-ups/${id}`);
        console.log(a.data);
        setfollowup(a.data.data);

        

    }


    useEffect(() => {
        const fetchData = async () => {
            await getFollowStatus();
        }
        fetchData();
        console.log(followup);

    }, [])


    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto p-2">
            <div className="w-full h-full">
                <div className="container mx-auto pb-2 pt-1 px-2">
                    <DataTable columns={columns} data={followup} />
                </div>
            </div>
        </div>
    );
};

export default SingleFollowUp;

import React, { useEffect, useState } from "react";
import { columns } from "../components/Tabels/mailstatus/columns";


import { DataTable } from "../components/Tabels/mailstatus/data-table";
import axios from "axios";
import { apiUrl } from "../utile/api";
import { useParams } from "react-router-dom";

const SingleMailStatus = () => {

    const { Id } = useParams();
    let id = Id;
    const [maillist, setmaillist] = useState([]);
    const getMailStatus = async () => {
        let a = await axios.post(`${apiUrl}/communication/get-mail-status`,
            {
                email: id
            }
        );
        setmaillist(a.data);

    
    }
    useEffect(() => {
        getMailStatus();
    }, [])







    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto p-2">
            <div className="w-full h-full">
                <div className="container mx-auto pb-2 pt-1 px-2">
                    <DataTable columns={columns} data={maillist} />
                </div>
            </div>
        </div>
    );
};

export default SingleMailStatus;

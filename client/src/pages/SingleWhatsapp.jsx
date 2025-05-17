import React, { useEffect, useState } from "react";
import { columns } from "../components/Tabels/whatsapp/columns";


import { DataTable } from "../components/Tabels/whatsapp/data-table";
import axios from "axios";
import { apiUrl } from "../utile/api";
import { useParams } from "react-router-dom";

const SingleWhatsapp = () => {

    const { Id } = useParams();
    let id = Id;
    const [maillist, setmaillist] = useState([]);
    const getMailStatus = async () => {
        let a = await axios.get(`${apiUrl}/communication/get-whatsapp-status/${id}`
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

export default SingleWhatsapp;

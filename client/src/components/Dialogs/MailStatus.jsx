import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";


import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../utile/api";


const MailStatus = ({ trigger, id }) => {

    const [senderMail, setsendMail] = useState('');
    const [reciver, setreceive] = useState('');

    const [status, setstatus] = useState('');
    const [date, setdate] = useState('');

    const getMailStatus = async () => {
        let a = await axios.post(`${apiUrl}/communication/get-mail-status`,
            {
                email: id
            }
        )
        if (a.data.length > 0) {
            setsendMail(a.data[0].sender);
            setdate(a.data[0].created_at);
            setstatus(a.data[0].status);
            setreceive(a.data[0].email)

        }
    }
    useEffect(() => {
        getMailStatus();
    }, [])
    return (
        <Dialog >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <h2 className="py-1 text-xl">Track Mail Status</h2>
                    </DialogTitle>
                    <DialogDescription>
                        <div>

                           {
                            senderMail?
                            (
                                <div className="grid gap-2 mb-6 lg:grid-cols-1">

                                <span className="font-bold text-[#212529] text-[0.8rem]">
                                    Sender Mail {senderMail}
                                </span>
                                <span className="font-bold text-[#212529] text-[0.8rem]">
                                    Receiver Mail {reciver}
                                </span>
                                <span className="font-bold text-[#212529] text-[0.8rem]">
                                    Status {status}
                                </span>
                                <span className="font-bold text-[#212529] text-[0.8rem]">
                                    Send At {date}
                                </span>
                                <br />



                            </div>
                            ):
                            <div className="grid gap-2 justify-center align-item-center mb-6 lg:grid-cols-1">

                            <span className="font-bold text-[#212529] text-[0.8rem]">
                                Your does not Send any mail {id}
                            </span>
                           



                        </div>
                           }

                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MailStatus;

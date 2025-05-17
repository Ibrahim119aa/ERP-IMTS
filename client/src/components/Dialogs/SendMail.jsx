import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { apiUrl } from "../../utile/api";
import axios from "axios";

const SendMail = ({ trigger, selectedStudents }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ textField1: "", textField2: "" });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSelectorPopUpOpen, setIsSelectorPopUpOpen] = useState(false);
    const [selectorValue, setSelectorValue] = useState("");



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            console.log("Form submitted with values:", values);
            console.log("Selected Students:", selectedStudents);

            
            
            let a = await axios.post(`${apiUrl}/communication/bulk-mail`, {
                subject: values.textField1,
                message: values.textField2,
                recipients: selectedStudents
            });
            alert("Mail Successfully Send");

            setDetails(values);
            setIsPopoverOpen(false);
        } catch (err) {
            setError("Failed to submit details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col mx-auto items-center gap-4"
                >
                    {/* Text Field 1 */}
                    <input
                        type="text"
                        name="textField1"
                        placeholder="Enter Subject"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={values.textField1}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Text Field 2 */}
                    <textarea
                        type="text"
                        name="textField2"
                        placeholder="Enter Message"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={values.textField2}
                        onChange={handleInputChange}
                        required></textarea>



                    <Button
                        className="my-3 bg-indigo-500 text-white"
                        variant="outline"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default SendMail;

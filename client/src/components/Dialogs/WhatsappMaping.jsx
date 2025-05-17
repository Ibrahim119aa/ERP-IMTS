import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";
import axios from "axios";
import { apiUrl } from "../../utile/api";
import { toast } from "react-toastify";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';



const WhatsappMaping = ({ trigger, selectedStudents }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const [isSelectorPopUpOpen, setIsSelectorPopUpOpen] = useState(false);
    const [selectorValue, setSelectorValue] = useState("");

    useEffect(() => {
        if (loading) {
            nprogress.start();
        }
        else {
            nprogress.done();
        }

    }, [loading])
    const List = [
        {
            id: "name",
            value: "Student Name"
        },
        {
            id: "counselor_name",
            value: "Responsible Person"
        }
        ,
        {
            id: "phone",
            value: "Phone"
        }
        ,
        {
            id: "email",
            value: "Email"
        }
        ,
        {
            id: "admission_no",
            value: "Admission No"
        }
        ,
        {
            id: "responsable_person",
            value: "Responsable Person"
        }
        ,
        {
            id: "date_of_birth",
            value: "Date Of Birth"
        }
        ,
        {
            id: "university_name",
            value: "University Name"
        }
        ,
        {
            id: "course_name",
            value: "Course Name"
        }
        ,
        {
            id: "specialization_name",
            value: "Specialization Name"
        }
        ,
        {
            id: "manager_name",
            value: "Manager Name"
        }
        ,
        {
            id: "exam_mode",
            value: "Exam Mode"
        }
        ,
        {
            id: "session_from",
            value: "Session From"
        }
        ,
        {
            id: "session_to",
            value: "Session To"
        }
        ,








        {
            id: "status",
            value: "Status"
        }
        ,
        {
            id: "batch_change",
            value: "Batch Change"
        }
        ,
        {
            id: "last_exam_mode",
            value: "Last Exam Mode"
        }
        ,
        {
            id: "last_exam_given",
            value: "Last Exam Given"
        }
        ,
        {
            id: "last_exam_date",
            value: "Last Exam Date"
        }
        ,
        {
            id: "last_exam_fees",
            value: "Last Exam Fees"
        }
        ,
        {
            id: "admission_status",
            value: "Admission Status"
        }
        ,
        {
            id: "total_fees",
            value: "Total Fees"
        }
        ,
        {
            id: "total_paid",
            value: "Total Paid Fees"
        }
        ,
        {
            id: "pending_amount",
            value: "Remaning Fee"
        }

    ]
    const [fields, setFields] = useState([]);
    const [popupsOpen, setPopupsOpen] = useState([]);


    const handleFieldChange = (index, newValue) => {
        const updatedFields = [...fields];
        updatedFields[index] = newValue; // Update the specific field value
        setFields(updatedFields); // Save updated fields in state
    };

    const handleAddField = () => {
        setFields([...fields, ""]); // Add a new empty field
        setPopupsOpen([...popupsOpen, false]); // Add corresponding popover state
    };

    const togglePopup = (index, isOpen) => {
        const updatedPopups = [...popupsOpen];
        updatedPopups[index] = isOpen;
        setPopupsOpen(updatedPopups);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(fields);
        try {
            setLoading(true);
            setError(null);




            try {
                let a = await axios.post(`${apiUrl}/communication/whatapps-template-mapping`, {
                    template: selectorValue,
                    body: fields,
                    
                });

                toast.success(a.data);

            }
            catch (err) {

            }
            finally {
                setLoading(false);
            }
            setDetails(values);
            setIsPopoverOpen(false);
        } catch (err) {
            setError("Failed to submit details. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const [dataList, setdatalist] = useState([]);
    const getCounsellor = async () => {
        let a = await axios.get(`${apiUrl}/communication/get-template-list`);
        console.log(a.data);

        setdatalist(a.data.results.templates);


    }
    const getTemplateData = async (name) => {
        let a = await axios.post(`${apiUrl}/communication/get-template-list`,
            {
                name: name
            });
        if (a.data) {
            console.log(a.data);
            setFields(JSON.parse(a.data[0].value));

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await getCounsellor();
        }
        fetchData();
        console.log(dataList);

    }, [])





    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col mx-auto items-center"
                >
                    <h3 className="font-bold mb-2">Template Mapping</h3>
                    <Popover
                        open={isSelectorPopUpOpen}
                        onOpenChange={setIsSelectorPopUpOpen}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[220px] justify-between"
                            >
                                {selectorValue
                                    ? dataList.find(
                                        (framework) => framework.name.toString() === selectorValue
                                    )?.name
                                    : "Select Template..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search counselors..." />
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {dataList.map((framework) => (
                                            <CommandItem
                                                key={framework.name}
                                                value={`${framework.name}`}
                                                onSelect={(currentValue) => {
                                                    setSelectorValue(
                                                        currentValue === selectorValue ? "" : currentValue
                                                    );
                                                    getTemplateData(currentValue);
                                                    setIsSelectorPopUpOpen(false);
                                                }}
                                            >
                                                {framework.name}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectorValue === framework.name
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>

                        </PopoverContent>
                    </Popover>
                    <div className="mt-7 ">

                        {fields.map((field, index) => (
                            <div key={index} className="mb-4 mt-2">
                                <div className="flex gap-3">
                                    <div> Value {index + 1}</div>
                                    <div>
                                        <Popover
                                            open={popupsOpen[index]}
                                            onOpenChange={(isOpen) => togglePopup(index, isOpen)}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={popupsOpen[index]}
                                                    className="w-full justify-between"
                                                >
                                                    {field || "Select Value..."}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search..." />
                                                    <CommandList className="max-h-60 overflow-y-auto">
                                                        <CommandEmpty>No options found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {List.map((item) => (
                                                                <CommandItem
                                                                    key={item.id}
                                                                    value={item.id}
                                                                    onSelect={() => {
                                                                        handleFieldChange(index, item.id);
                                                                        togglePopup(index, false);
                                                                    }}
                                                                >
                                                                    {item.value}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            field === item.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>
                    <div className="flex">


                        <Button
                            className="my-3 bg-indigo-500 text-white"
                            variant="outline"
                            type="button"
                            onClick={handleAddField}
                        >
                            {" "}
                            Apply Mapping
                        </Button>
                        <Button
                            className="my-3 bg-indigo-500 text-white"
                            variant="outline"
                            type="submit"
                        >
                            {" "}
                            Submit
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default WhatsappMaping;

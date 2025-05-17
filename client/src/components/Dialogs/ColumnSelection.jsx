import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "../ui/dialog";

import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addColumn } from "../../redux/itemSlice";

const initialColumns = [
    { id: "student_id", label: "Select", minWidth: 50 },
    { id: "student_name", label: "Full Name", minWidth: 200 },
    { id: "counselor_name", label: "Counsellor Name", minWidth: 200 },
    { id: "responsable_person", label: "Responsible Person", minWidth: 200 },
    { id: "Email", label: "Email", minWidth: 200 },
    { id: "phone", label: "Phone", minWidth: 200 },
    { id: "action", label: "Action", minWidth: 100 },
    { id: "actions", label: "Detail", minWidth: 100 },
    { id: "actionss", label: "Status", minWidth: 100 },
];

const optionalColumns = [
    { id: "admission_no", label: "Admission No", minWidth: 150 },
    { id: "enrollment_no", label: "Enrollment No", minWidth: 150 },
    { id: "alternate_phone", label: "Alternate Phone", minWidth: 150 },
    { id: "alternate_email", label: "Alternate Email", minWidth: 150 },
    { id: "date_of_birth", label: "Date Of Birth", minWidth: 170 },
    { id: "university_name", label: "University", minWidth: 130 },
    { id: "course_name", label: "Course", minWidth: 130 },
    { id: "specialization_name", label: "Specialization", minWidth: 180 },
    { id: "exam_mode", label: "Exam Mode", minWidth: 150 },
    { id: "session_from", label: "Session From", minWidth: 150 },
    { id: "session_to", label: "Session To", minWidth: 150 },
    { id: "manager_name", label: "Manager Name", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "last_batch_change", label: "Batch Change", minWidth: 150 },
    { id: "last_exam_mode", label: "Last Exam Mode", minWidth: 150 },
    { id: "last_exam_given", label: "Last Exam Given", minWidth: 150 },
    { id: "last_exam_date", label: "Last Exam Date", minWidth: 150 },
    { id: "last_exam_fees", label: "Last Exam Fees", minWidth: 150 },
    { id: "admission_status", label: "Admission Status", minWidth: 150 },
    { id: "balance", label: "Balance", minWidth: 120 },
];

const ColumnSelection = ({ trigger, id }) => {
    const [columns, setColumns] = useState(initialColumns);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedColumns = localStorage.getItem("column");
        if (storedColumns) {
            setColumns(JSON.parse(storedColumns));
        }
    }, []);

    const handleCheckboxChange = (column) => {
        setColumns((prev) => {
            const exists = prev.some((col) => col.id === column.id);
            if (exists) {
                return prev.filter((col) => col.id !== column.id);
            } else {
                const updatedColumns = [...prev];
                updatedColumns.splice(3, 0, column); // Insert the column at the 3rd position
                return updatedColumns;
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addColumn(columns));
        localStorage.setItem("column", JSON.stringify(columns));
        alert("Columns updated successfully");
        location.reload();
        
        setIsOpen(false);

    };

    const isChecked = (column) => columns.some((col) => col.id === column.id);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Additional Columns</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-2 mb-6 lg:grid-cols-3">
                                {optionalColumns.map((column) => (
                                    <FormControlLabel
                                        key={column.id}
                                        control={
                                            <Checkbox
                                                checked={isChecked(column)}
                                                onChange={() => handleCheckboxChange(column)}
                                            />
                                        }
                                        label={column.label}
                                    />
                                ))}
                            </div>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ColumnSelection;

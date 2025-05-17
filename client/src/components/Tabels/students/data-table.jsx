import { useEffect, useState } from "react";
import { Upload, Mail, Handshake, MessageCircleMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import FollowUpsPopover from "../../Dialogs/FollowUpsPopover";
import FollowUpsStatusPopover from "../../Dialogs/FollowUpStatus";
import { apiUrl } from "../../../utile/api";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import ColumnSelection from "../../Dialogs/ColumnSelection";
import MailStatus from "../../Dialogs/MailStatus";

import AsssignStudentsCounselor from "../../Dialogs/AsssignStudentsCounselor";
import SendMail from "../../Dialogs/SendMail";
import axios from "axios";
import { Table } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Select, FormControl, InputLabel, ListItemText } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import * as XLSX from 'xlsx';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { FormControlLabel } from "@mui/material";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendWhatsapp from "../../Dialogs/SendWhatsapp";
import { Refresh } from "@mui/icons-material";
import { ClipLoader } from 'react-spinners';
import WhatsappMaping from "../../Dialogs/WhatsappMaping";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, getStudentDetail } from "../../../redux/itemSlice";
import nprogress from "nprogress";

export function DataTable({ data1, columns }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [formData, setFormData] = useState(
    {
      full_name: "",
      enrollment_number: "",
      counselor_name: [],
      phone_number: "",
      admissiondate: "",
      alternate_phone: "",
      email: "",
      session_to: "",
      session_from: "",
      alternate_email: "",

      university: [],
      course: [],
      specialization: [],
      responsible_person: [],
      manager: [],
      exammode: [],
      admissionconfirmation: [],
      admissionbatch: [],
      lastexammode: [],
      status: [],
      mode: "",
      follow_up: "",
      follow_up_custom_date: "",
      payment1: "",
      payment2: "",
      limit: 10,
      page: 1,
    }
  )
  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    formData.limit = event.target.value;
    setLoadingData(true);
    await dispatch(getStudent(formData)).unwrap();
    setLoadingData(false);


  };

  const downloadFormat = () => {
    const fileUrl = "/pdc_formate_main.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "pdc_formate_main.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
  const [courselist, setcourselist] = useState([]);
  const [lastexammodelist, setexammodelist] = useState([]);

  const getLastExamModelist = async () => {
    let a = await axios.get(`${apiUrl}/exam-mode/get-exam-mode`);
    setexammodelist(a.data);
  }
  const getCourse = async () => {


    let a = await axios.get(`${apiUrl}/course/get-course`);
    setcourselist(a.data);

  }
  const handleInputChange = async (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];


    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(`${apiUrl}/import-csv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success(response.data);
        location.reload();

      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${apiUrl}/import-csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data); // Handle success message
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tocChecked, setTocChecked] = useState(false);
  const [rollNumber, setRollNumber] = useState('');

  const handleRollChange = (event) => setRollNumber(event.target.value);
  const [isLoadingData, setLoadingData] = useState(false);


  const [universitylist, setuniversitylist] = useState([]);

  const getUniversity = async () => {
    let a = await axios.get(`${apiUrl}/university/get-university`);
    setuniversitylist(a.data);

  }

  const [specializationlist, setspecializationlist] = useState([]);

  const getSpecialization = async () => {
    let a = await axios.get(`${apiUrl}/specialization/get-specialization`);
    setspecializationlist(a.data);

  }
  const [responsiblelist, setresponsiblelist] = useState([]);

  const getResponsiblePerson = async () => {
    let a = await axios.get(`${apiUrl}/counsellor/get-counsellor`);
    setresponsiblelist(a.data);



  }
  const [managerlist, setmanagerlist] = useState([]);

  const getManagerPerson = async () => {
    let a = await axios.get(`${apiUrl}/manager/get-manager`);
    setmanagerlist(a.data);



  }

  const [counselorlist, setcounselorlist] = useState([]);

  const getCounselor = async () => {
    let a = await axios.get(`${apiUrl}/counsellor/get-counsellor-by-name`);
    setcounselorlist(a.data);




  }
  const dispatch = useDispatch();

  const std = useSelector(getStudentDetail);
  // const subjectList =(std==null || std==undefined || std==[] || std.length==0 )?([] && setLoadingData(true)):(std.data && setLoadingData(false));   

  const subjectList = (std == undefined || std.length == 0) ? [] : std.data;



  const totalSubjects = (std == undefined || std.length == 0) ? [] : std.pagination.total;



  useEffect(() => {
    Promise.all([
      getUniversity(),
      getCourse(),
      getSpecialization(),
      getResponsiblePerson(),
      getManagerPerson(),
      getCounselor(),
      getLastExamModelist()
    ]).then(() => {
      setSelectedRows([]);
    })
  }, [])
  const studentFilter = async (e) => {
    e.preventDefault();
    nprogress.start();


    await dispatch(getStudent(formData)).unwrap();
    nprogress.done();
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (std == undefined || std.length == 0) {
          setLoadingData(true);

          await dispatch(getStudent(formData)).unwrap();
          setLoadingData(false);
        }
        else {

        }
      }
      catch (err) {

      }
      finally {
        setLoadingData(false);
      }
    }
    fetchData();

  }, [dispatch]);



  const handleChangePage = async (event, newPage) => {
    setPage(newPage);


    formData.page = newPage;
    setLoadingData(true);
    await dispatch(getStudent(formData)).unwrap();
    setLoadingData(false);

  };

  const SendLink = async () => {
    if (selectedRows.length == 0) {
      alert("Select Atleast One Student");
    }
    else {
      let a = await axios.post(`${apiUrl}/communication/send-payment-link`, {

        recipients: selectedRows
      });
      alert("Link Successfully Send to Student")
    }



  }
  const handleApprovePayment = async () => {

    if (formData.payment1 != "" && formData.payment2 != "") {


      let a = await axios.post(`${apiUrl}/payment/get-payment-between-two-date`,
        {
          startdate: formData.payment1,
          enddate: formData.payment2
        }
      );
      if (a.data) {

        toast.success(a.data);


      }
    }
    else {
      toast.error("Please Select Starting and Ending Date");
    }
  }
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected student_ids

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id) // Remove if already selected
        : [...prevSelected, id] // Add if not selected
    );
  };
  
  const handleSelectAll = () => {
    console.log(subjectList);
    let a=subjectList.map((row) => row.student_id);
    console.log("This is select all");
    console.log(a);

    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === subjectList.length ? [] : subjectList.map((row) => row.student_id)
    );
  };
  

  const navigate = useNavigate();


  const followlist = [
    {
      id: "Current",
      name: "Today"
    },
    {
      id: "Pending",
      name: "Up Coming "
    },
    {
      id: "Due",
      name: "Over Due"
    }
  ]
  const exammodelist = [
    {
      id: "1",
      name: "Annual"
    },
    {
      id: "2",
      name: "Semester "
    }

  ]
  const statuslist = [
    {
      id: "None",
      name: "None"
    },
    {
      id: "Process",
      name: "Process "
    }

  ]
  const admissionbatchlist = [
    {
      id: "3",
      name: "APR"
    },
    {
      id: "4",
      name: "DEC "
    }
    ,
    {
      id: "5",
      name: "JAN "
    }
    ,
    {
      id: "6",
      name: "JUL "
    },
    {
      id: "7",
      name: "JUN "
    }
    ,
    {
      id: "8",
      name: "MAR "
    }
    ,
    {
      id: "9",
      name: "MAY "
    }
    ,
    {
      id: "10",
      name: "OCT "
    }

  ]
  const admissionconfirmationlist = [
    {
      id: "6",
      name: "SENT"
    },
    {
      id: "4",
      name: "RECEIVED "
    }

  ]
  const modelist = [
    {
      id: "NEW",
      name: "NEW"
    },
    {
      id: "RR",
      name: "RR "
    }
    ,
    {
      id: "BACK",
      name: "BACK "
    }
  ]
  const convertToExcel = async () => {



    formData.limit = 50000;
    nprogress.start();
    const response = await axios.post(`${apiUrl}/student-excel`,
      {
        data: formData,
        Id: selectedRows
      });
    nprogress.done();


    const subjectData = response.data.data || [];




    const ws = XLSX.utils.json_to_sheet(subjectData);


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });


    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    const fileName = 'student.xlsx';
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName);



  };

  const [isLoading, setIsLoading] = useState(false);

  const refreshPanel = async () => {
    setIsLoading(true);
    try {
      let obj = await axios.get(`https://login.imtsinstitute.com/get-All-Record-For-New-ERP`);



      let response = await axios.post(`${apiUrl}/reload`,
        {
          Obj: JSON.stringify(obj.data)
        }
      );

      dispatch(getStudent(formData));
      await getUniversity();
      await getCourse();
      await getSpecialization();
      await getResponsiblePerson();
      await getManagerPerson();
      await getCounselor();
      toast.success("Data successfully refreshed!");


      setIsDisabled(true);



      setTimeout(() => {
        setIsDisabled(false);
      }, 600000);

    } catch (error) {
      console.error("Error 11 refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (

    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full mt-1 flex flex-wrap gap-2">
        <SendMail
          trigger={
            <Button variant="outline" className="bg-teal-500 text-white">
              <Mail />
              Bulk Email
            </Button>
          }
          selectedStudents={selectedRows}
        />
        <AsssignStudentsCounselor
          trigger={
            <Button variant="outline" className="bg-teal-500 text-white">
              <Handshake />
              Assign Students to Responsible Person
            </Button>
          }
          selectedStudents={selectedRows}
        />
        <Button onClick={SendLink} variant="outline" className="bg-teal-500 text-white">

          Send Payment Link
        </Button>
        <WhatsappMaping
          trigger={
            <Button variant="outline" className="bg-teal-500 text-white">
              <MessageCircleMore />
              WhatsApp Template Mapping
            </Button>
          }
          selectedStudents={selectedRows}
        />
        <SendWhatsapp
          trigger={
            <Button variant="outline" className="bg-teal-500 text-white">
              <MessageCircleMore />
              Bulk WhatsApp SMS
            </Button>
          }
          selectedStudents={selectedRows}
        />

        <Button
          variant="outline"
          className="bg-teal-500 text-white"
          onClick={() => document.getElementById('excel-import').click()}
        >

          <input type="file" style={{ display: "none" }}
            accept=".xlsx,.csv, .xls" id='excel-import' className='d-none' onChange={handleFileChange} />

          <Upload />
          Bulk Import
        </Button>
        <Button
          variant="outline"
          className="bg-teal-500  text-white"
          onClick={convertToExcel}
        >



          Export
        </Button>

        <Button
          variant="outline"
          className="bg-teal-500  text-white"
          onClick={downloadFormat}
        >



          Download Format
        </Button>
        <Button
          variant="outline"
          disabled={isDisabled}
          className="bg-teal-500  text-white"
          onClick={refreshPanel}

        >
          <Refresh />



          Refresh
        </Button>
        <Button
          variant="outline"
          className="bg-teal-500  text-white"
          onClick={handleSelectAll}
        >



          Select All
        </Button>
      </div>

      <div className="w-full">
        <div className="mt-2">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h4 className="text-[#212529] font-semibold text-[1.2rem]">Filter</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                onSubmit={studentFilter}
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Student Name" value={formData.full_name} name="full_name" onChange={handleInputChange} variant="outlined" />
                <TextField id="outlined-basic" label="Admission Number" value={formData.enrollment_number} name="enrollment_number" onChange={handleInputChange} variant="outlined" />

                <FormControl >
                  <InputLabel InputLabelProps={{
                    shrink: true,
                  }} id="counselor-select-label">Select Counselor</InputLabel>
                  <Select

                    labelId="counselor-select-label"
                    id="outlined-select-counselor"
                    multiple
                    value={formData.counselor_name || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'counselor_name', value: event.target.value },
                      })
                    }
                    renderValue={(selected) => selected.join(', ')} // Display selected items as a comma-separated string
                  >
                    {counselorlist.map((option) => (
                      <MenuItem key={option.id} value={option.full_name}>
                        <Checkbox
                          checked={formData.counselor_name?.indexOf(option.full_name) > -1}
                        />
                        <ListItemText primary={option.full_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Phone Number" value={formData.phone_number} name="phone_number" onChange={handleInputChange} variant="outlined" />
                {/* <TextField id="outlined-basic" label="Alternate Phone Number " value={formData.alternate_phone} name="alternate_phone" onChange={handleInputChange} variant="outlined" /> */}
                <TextField id="outlined-basic" label="Email " value={formData.email} name="email" onChange={handleInputChange} variant="outlined" />
                <TextField id="outlined-basic" label="Session to " value={formData.session_to} name="session_to" onChange={handleInputChange} variant="outlined" />
                <TextField id="outlined-basic" label="Session From " value={formData.session_from} name="session_from" onChange={handleInputChange} variant="outlined" />
                {/* <TextField id="outlined-basic" label="Alternate Email " value={formData.alternate_email} name="alternate_email" onChange={handleInputChange} variant="outlined" />*/}

                <FormControl>
                  <InputLabel
                    id="university-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select University
                  </InputLabel>
                  <Select
                    labelId="university-select-label"
                    id="outlined-select-university"
                    multiple
                    value={formData.university || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'university', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            universitylist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {universitylist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.university?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    id="course-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Course
                  </InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="outlined-select-course"
                    multiple
                    value={formData.course || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'course', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            courselist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {courselist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.course?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="specialization-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Specialization
                  </InputLabel>
                  <Select
                    labelId="specialization-select-label"
                    id="outlined-select-specialization"
                    multiple
                    value={formData.specialization || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'specialization', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            specializationlist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {specializationlist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.specialization?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <FormControl>
                  <InputLabel
                    id="responsable-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Responsible Person
                  </InputLabel>
                  <Select
                    labelId="responsable-select-label"
                    id="outlined-select-responsable"
                    multiple
                    value={formData.responsible_person || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'responsible_person', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            responsiblelist.find((option) => option.id === id)?.full_name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {responsiblelist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.responsible_person?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.full_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="manager-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Manager
                  </InputLabel>
                  <Select
                    labelId="manager-select-label"
                    id="outlined-select-manager"
                    multiple
                    value={formData.manager || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'manager', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            managerlist.find((option) => option.id === id)?.full_name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {managerlist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.manager?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.full_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="outlined-select-currency"
                  select
                  value={formData.follow_up} name="follow_up" onChange={handleInputChange}
                  label=" Follow Up Status"
                  defaultValue="Follow Up Status"
                >
                  {followlist.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <FormControl>
                  <InputLabel
                    id="exammode-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Exam Mode
                  </InputLabel>
                  <Select
                    labelId="exammode-select-label"
                    id="outlined-select-exammode"
                    multiple
                    value={formData.exammode || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'exammode', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            exammodelist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {exammodelist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.exammode?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="admissionconfirmation-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Admission Confirmation
                  </InputLabel>
                  <Select
                    labelId="admissionconfirmation-select-label"
                    id="outlined-select-admissionconfirmation"
                    multiple
                    value={formData.admissionconfirmation || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'admissionconfirmation', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            admissionconfirmationlist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {admissionconfirmationlist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.admissionconfirmation?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="admissionbatch-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Admission Batch
                  </InputLabel>
                  <Select
                    labelId="admissionbatch-select-label"
                    id="outlined-select-admissionbatch"
                    multiple
                    value={formData.admissionbatch || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'admissionbatch', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            admissionbatchlist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {admissionbatchlist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.admissionbatch?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  type="date"
                  id="outlined-basic"
                  label="Admission Date"
                  value={formData.admissiondate}
                  name="admissiondate"
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl>
                  <InputLabel
                    id="lastexammode-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Last Exam Mode
                  </InputLabel>
                  <Select
                    labelId="lastexammode-select-label"
                    id="outlined-select-lastexammode"
                    multiple
                    value={formData.lastexammode || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'lastexammode', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            lastexammodelist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {lastexammodelist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.lastexammode?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="status-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Status
                  </InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="outlined-select-status"
                    multiple
                    value={formData.status || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'status', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            statuslist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {statuslist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.statuslist?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    id="mode-select-label"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    Select Mode
                  </InputLabel>
                  <Select
                    labelId="mode-select-label"
                    id="outlined-select-mode"
                    multiple
                    value={formData.mode || []} // Ensure it's an array
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'mode', value: event.target.value },
                      })
                    }
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            modelist.find((option) => option.id === id)?.name || id
                        )
                        .join(', ') // Display selected university names
                    }
                  >
                    {modelist.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox
                          checked={formData.modelist?.indexOf(option.id) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  type="date"
                  id="outlined-basic"
                  label="Follow Up With Custom Date"
                  value={formData.follow_up_custom_date}
                  name="follow_up_custom_date"
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  type="date"
                  id="outlined-basic"
                  label="Starting Date for  Approved Payment"
                  value={formData.payment1}
                  name="payment1"
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  type="date"
                  id="outlined-basic"
                  label="End Date for  Approved Payment"
                  value={formData.payment2}
                  name="payment2"
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <Button className="bg-[#14B8A6] my-5 text-white" variant="contained" color="success">
                  Submit
                </Button>
                <Button onClick={handleApprovePayment} className="bg-[#14B8A6] my-5 text-white" variant="contained" color="success">
                  See Approve Fee
                </Button>
                <Button onClick={() => setFormData({
                  full_name: "",
                  enrollment_number: "",
                  counselor_name: "",
                  phone_number: "",
                  alternate_phone: "",
                  email: "",
                  session_to: "",
                  session_from: "",
                  alternate_email: "",
                  university: "",
                  course: "",
                  specialization: "",
                  responsible_person: "",
                  manager: "",
                  follow_up: "",
                  follow_up_custom_date: "",
                  payment1: "",
                  payment2: "",
                  limit: 10,
                  page: 1,
                })} className="bg-[#14B8A6] my-5 text-white" variant="contained" color="success">
                  Clear
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>


        </div>
      </div>





      <div className="rounded-md mt-2 border">

        <Paper style={{ width: '100%' }}>
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: '#f5f5f5', // Light gray background for headers
                        fontWeight: 'bold',
                        borderBottom: '2px solid #ddd' // Bottom border for header cells
                      }}
                    >
                      {
                        column.label == "Select" ?
                          (
                            <ColumnSelection

                              trigger={
                                <span className="flex gap-1 cursor-pointer">
                                  <i class="fa fa-cog" aria-hidden="true"></i>
                                  <span className="-mt-1">
                                    {column.label}
                                  </span>
                                </span>
                              }
                              selectedStudents={selectedRows}
                            />

                          ) : column.label
                      }

                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {
                isLoading ?
                  (
                    <div
                      className="flex items-center  justify-center w-full "
                      style={{ marginLeft: "21rem" }}
                    >
                      <span className="flex items-center gap-2">
                        <ClipLoader color="#3498db" size={30} /> Refreshing...
                      </span>
                    </div>

                  ) :
                  isLoadingData ?
                    (
                      <div
                        className="flex items-center  justify-center w-full "
                        style={{ marginLeft: "21rem" }}
                      >
                        <span className="flex items-center gap-2">
                          <ClipLoader color="#3498db" size={30} /> Loading...
                        </span>
                      </div>
                    )
                    : <TableBody>
                      {subjectList.length > 0 ? (
                        subjectList.map((row) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                            style={{ cursor: 'pointer' }}
                          >

                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  style={{
                                    borderBottom: '1px solid #ddd',
                                    padding: '8px',
                                  }}
                                >
                                  {
                                    column.id === 'action' ? (
                                      <>

                                        <div className="flex items-center justify-center gap-2">
                                          <Button
                                            className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
                                            onClick={() => {

                                              navigate(`/viewProfile/${row.student_id}`);

                                            }}
                                          >
                                            View Details
                                          </Button>




                                        </div>
                                      </>
                                    ) :
                                      column.id === 'actionss' ? (
                                        <>

                                          <div className="flex items-center justify-center gap-2">

                                            <Button
                                              className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
                                              onClick={() => {

                                                navigate(`/Single-Mail-Status/${row.student_id}`);

                                              }}
                                            >
                                              Mail
                                            </Button>
                                            <Button
                                              className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
                                              onClick={() => {

                                                navigate(`/Single-Whatapp-Status/${row.student_id}`);

                                              }}
                                            >
                                              Whatsapp
                                            </Button>


                                          </div>
                                        </>
                                      )
                                        :
                                        column.id === 'actions' ? (
                                          <>

                                            <div className="flex items-center justify-center gap-2">





                                              <FollowUpsPopover
                                                trigger={
                                                  <Button className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black">
                                                    Follow Ups
                                                  </Button>
                                                }
                                                id={row.student_id}
                                              />

                                              <Button
                                                className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
                                                onClick={() => {

                                                  navigate(`/Follow-Up/${row.student_id}`);

                                                }}
                                              >
                                                Follow Ups Status
                                              </Button>
                                            </div>
                                          </>
                                        )
                                          :
                                          column.id == "student_id" ?
                                            (
                                              <>
                                                <input
                                                  type="checkbox"
                                                  checked={selectedRows.includes(value)} 
                                                  onChange={() => handleCheckboxChange(value)}
                                                />
                                              </>
                                            )
                                            : (
                                              value
                                            )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length + 1} align="center">
                            No data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
              }
            </Table>
            {/* { label: 'All', value: totalSubjects - 1 } */}
          </TableContainer>
          {!tocChecked && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
              component="div"
              count={totalSubjects}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>

      </div>


      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}

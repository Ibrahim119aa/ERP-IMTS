import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Pencil } from "lucide-react";
import { Separator } from "../components/ui/separator";
import axios from 'axios'
import { apiUrl } from "../utile/api"
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ClipboardIcon } from '@heroicons/react/outline';
import FollowUpsPopover from "../components/Dialogs/FollowUpsPopover";
const ViewStudentDetails = () => {


  const navigate = useNavigate();
  const [examModelist, setexamModelist] = useState([]);
  const getExamMode = async () => {
    let a = await axios.get(`${apiUrl}/exam-mode/get-exam-mode`);
    setexamModelist(a.data);

  }
  const batchchanelist = [
    {
      id: 0,
      name: "0"
    },
    {
      id: 1,
      name: "1"
    },
    {
      id: 2,
      name: "2"
    }
    ,
    {
      id: 3,
      name: "3"
    },
    {
      id: 4,
      name: "4"
    }
    ,
    {
      id: 5,
      name: "5"
    },
    {
      id: 6,
      name: "6"
    }
    ,
    {
      id: 7,
      name: "7"
    }
    ,
    {
      id: 8,
      name: "8"
    },
    {
      id: 9,
      name: "9"
    }
    ,
    {
      id: 10,
      name: "10"
    }

  ]
  const [batchfee, setbatchfee] = useState(
    {
      batch: "",
      payableassignment_fees: "",
      batch_change: "",
      totalfee: "",
      pendingfee: "",
      assignment_fees: "",
      totalfeewithassignment1: "",
      totalfeewithassignment: "",
      pendingfeewithassignment: ""

    }
  );


  const CheckFee = async () => {
    let a = await axios.post(`${apiUrl}/get-student-fee-with-batch`,
      feeData
    );
    if (a.data) {
      toast.success(a.data);

    }

  }
  const [formData, setformData] = useState(
    {
      mode: "",
      admission_batch: "",
      batch_changing: "",
      admission_status: "",
      admission_status_confirm: "Approved",
      alternate_email: "",
      paymenturl: "",
      total_amount: "",
      alternate_phone: "",
      balancewithasignment: "",
      assignment_fees: "",
      admission_no: "",
      balance: "",
      batch_change: "",
      batch_title: "",
      counselor_name: "",
      course_name: "",
      date_of_birth: "",
      email: "",
      enrollment_no: "",
      exam_mode: "",

      last_exam_remark: "",
      phone: "",
      session_from: "",
      session_to: "",
      specialization_name: "",
      student_name: "",
      total_amount: "",
      university_name: "",
      student_id: "",
      user_id: "",
      status: "",
      admission_status: "",
      totalamountwithassignment: "",
      last_exam_mode: "",
      last_exam_given: "",
      last_exam_date: "",
      last_exam_fees: "",
      detail: {}
    }
  )
  const { id } = useParams();

  const [jsonprevious, setjsonprevious] = useState({});


  const getSingleStudent = async () => {
    let a = await axios.get(`${apiUrl}/students/${id}`);
    console.log("THis is data")
    console.log(a.data);
    const timestamp = Date.now() + Math.random();
    const hash = Math.random().toString(36).substring(2) + timestamp.toString(36).substring(2);

    const randIndex = Math.floor(Math.random() * (hash.length - 3)); // Random starting index
    const randomSubstring = hash.substring(randIndex, randIndex + 3);

    // let b = await axios.get(`${apiUrl}/payment/calculate-balance/${id}`);
    // console.log(b.data);
    console.log(a.data.data);
    setformData(
      {
        mode: a.data.data.mode,
        batch_changing: a.data.data.batch_changing,
        student_id: a.data.data.student_id,
        paymenturl: `https://login.imtsinstitute.com/auth/auto/${randomSubstring}${a.data.data.paymenturl}`,
        admission_status: a.data.data.admission_status,
        alternate_email: a.data.data.alternate_email,
        alternate_phone: a.data.data.alternate_phone,
        assignment_fees: a.data.data.assignment_fees,
        // total_amount: b.data.totalFees,
        // balancewithasignment: `${b.data.pendingAmount - a.data.data.last_exam_fees + a.data.data.balancewithasignment}`,
        // totalamountwithassignment: `${b.data.totalFees + a.data.data.assignment_fees}`,

        admission_status: a.data.data.admission_status,
        batch_change: a.data.data.batch_change,
        admission_batch: a.data.data.admission_batch,
        batch_title: a.data.data.batch_title,
        counselor_name: a.data.data.counselor_name,
        course_name: a.data.data.course_name,
        date_of_birth: a.data.data.date_of_birth,
        // date_of_birth: (a.data.data.date_of_birth!="" || a.data.data.date_of_birth!=null )?a.data.data.date_of_birth.split("T")[0]:null,
        // date_of_birth: (a.data.data.date_of_birth==null || a.date_of_birth=="" || a.data.data.date_of_birth=='')?"":a.data.data.date_of_birth.split("T")[0],
        email: a.data.data.email,
        admission_no: a.data.data.admission_no,
        enrollment_no: a.data.data.enrollment_no,
        exam_mode: a.data.data.exam_mode,
        last_exam_remark: a.data.data.admission_date,
        phone: a.data.data.phone,
        session_from: a.data.data.session_from,
        session_to: a.data.data.session_to,
        specialization_name: a.data.data.specialization_name,
        student_name: a.data.data.student_name,
        // balance: `${b.data.pendingAmount - a.data.data.last_exam_fees}`,
        university_name: a.data.data.university_name,
        user_id: a.data.data.user_id,
        last_exam_mode: a.data.data.last_exam_mode,
        status: a.data.data.status,
        last_exam_given: a.data.data.last_exam_mode,
        last_exam_date: a.data.data.last_exam_date,
        last_exam_fees: a.data.data.last_exam_fees,
      }
    )
    if (a.data.data.batch_change == null || a.data.data.batch_change == "") {

      alert("jlkl");

      console.log("This is batch change if");
      await getFeeBatchWise();
    }
    else {
      console.log("This is batch change else");
      setbatchfee(
        {
          ...batchfee,
          batch_change: a.data.data.batch_change
        }
      )
      await getFeeBatchWiseWithBatchChangeByDefault(a.data.data.batch_change);
      // await getFeeBatchWise();
    }
    setValues(
      {
        status: a.data.data.status,
        batch_change: a.data.data.batch_change,
        last_exam_mode: a.data.data.last_exam_mode,
        last_exam_given: a.data.data.last_exam_give,
        last_exam_date: a.data.data.last_exam_date,
        last_exam_fees: a.data.data.last_exam_fees,
      }
    )
    console.log(a.data.data.moredetail);

    if (a.data && a.data.data && a.data.data.moredetail) {
      try {
        setJsonData(JSON.parse(a.data.data.moredetail));
      } catch (error) {
        console.error("Error parsing morerdetail:", error);

      }
    } else {
      console.log("moredetail is not available or is empty");
    }



  }

  const [batchlist, setbatchlist] = useState([]);
  const getBatchList = async (elligblebatch) => {





    let a = await axios.post(`${apiUrl}/get-student-batch`,

      {
        Id: id,
        batchId: elligblebatch
      }
    );
    console.log("This is data ");

    console.log(a.data);
    if (a.data) {

      setbatchlist(a.data);
    }
  }


  useEffect(() => {
    const fetchData = async () => {

      await getSingleStudent();

      await getExamMode();


    }
    fetchData();
  }, [id])
  useEffect(() => {
    console.log("Updated formData:", formData);

    console.log(jsonData);
    console.log(batchfee)

  }, [formData, batchfee]);
  const [isEditing, setIsEditing] = useState(false);

  const [values, setValues] = useState({
    status: "",
    batch_change: "",
    last_exam_mode: "",
    last_exam_given: "",
    last_exam_date: "",
    last_exam_fees: 0,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      if (file) {
        setValues({ ...values, [e.target.name]: file });
        setformData({ ...formData, [e.target.name]: file });
        console.log("File uploaded:", file);
      }
    } else
      setValues({ ...values, [e.target.name]: e.target.value });
    setformData({ ...formData, [e.target.name]: e.target.value });

  };

  const [fields, setFields] = useState([]); // Stores dynamic fields as {key, value}
  const [jsonData, setJsonData] = useState({}); // Stores the final JSON object


  const handleAddField = () => {


    setFields([...fields, { key: "", value: "" }]);

  };

  const [exambatch, setexambatch] = useState([]);

  const getExamBatch = async () => {
    let a = await axios.get(`${apiUrl}/exam/get-Exam-Batch`);
    setexambatch(a.data);
  }
  useEffect(() => {
    const fetchData = async () => {
      await getExamBatch();
    }
    fetchData();
  }, [])
  const [feeData, setfeeData] = useState(
    {
      batch_change: "",
      session_from: "",
      session_to: "",
      exam_batch: ""
    }
  );
  const handleFeeData = (e) => {
    const { name, value } = e.target;
    setfeeData(
      {
        ...feeData,
        [e.target.name]: e.target.value
      }
    )
  }
  const handleFieldChange = (index, type, newValue, source) => {
    if (source === "jsonData") {
      // Updating jsonData
      const updatedJsonData = { ...jsonData };
      const keys = Object.keys(jsonData);
      const currentKey = keys[index];

      if (type === "key") {
        // If editing key, change the key in jsonData
        const { [currentKey]: oldValue, ...rest } = updatedJsonData;
        updatedJsonData[newValue] = oldValue; // Add new key with the same value
        delete updatedJsonData[currentKey]; // Remove old key
      } else if (type === "value") {
        updatedJsonData[currentKey] = newValue; // Update the value for the key
      }

      setJsonData(updatedJsonData);
    } else if (source === "fields") {
      // Updating fields (this part is already working)
      const updatedFields = [...fields];
      updatedFields[index][type] = newValue;
      setFields(updatedFields);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const finalJson = { ...jsonData };
    for (const field of fields) {
      if (!field.key || !field.value) {
        alert("Please complete all key-value fields before submitting.");
        return;
      }
      finalJson[field.key] = field.value;
    }


    setJsonData(finalJson);
    console.log("Final JSON Data:", finalJson);
    formData.detail = finalJson;
    console.log(jsonData);




    console.log(formData);

    let a = await axios.put(`${apiUrl}/students/${id}`, formData);

    toast.success("Data Successfully Updated")

  };


  const getFeeBatchWise = async () => {



    console.log(`This is Assignment Fees ${formData.assignment_fees}`);
    let response = await axios.post(`${apiUrl}/get-Elligible-student-batch`,
      {
        Id: id
      }
    );
    if (response.data.length > 0) {
      await getBatchList(response.data[0].batchId);
      console.log(response.data[0].batchno)
      let optionId = response.data[0].batchno;
      let amount = response.data[0].amount;
      let assignfee = response.data[0].assignmentfees;





      setbatchfee(
        {
          ...batchfee,
          batch: response.data[0].title,
          totalfee: amount,



        }
      )
      let a = await axios.post(`${apiUrl}/get-total-paid-fee`,
        {
          Id: id
        }
      );
      if (a.data) {
        console.log("This is data")
        console.log(a.data)

        setbatchfee(
          {
            ...batchfee,
            batch: response.data[0].title,
            assignment_fees: assignfee,
            totalfee: amount,
            totalfeewithassignment1: amount + assignfee,
            pendingfeewithassignment: ((amount + assignfee) - (a.data[0].totalPaid + formData.last_exam_fees)),
            pendingfee: (amount - (a.data[0].totalPaid + formData.last_exam_fees))
          }
        )
      }

    }


  }
  const getFeeBatchWiseWithBatchChange = async (batchId, key) => {
    let amount = 0;
    let x = await axios.post(`${apiUrl}/get-fee`,
      {
        studentId: id,
        batchId: batchId
      }
    )
    console.log("This is batch wise fee");
    console.log(x.data);

    if (x.data) {
      let arr = x.data;
      console.log(`Batch Id ${batchId}`)
      for (let i = 0; i < arr.length; i++) {

        console.log("This is atch")
        setbatchfee(
          {
            ...batchfee,
            batch_change: batchId,
            assignment_fees: arr[i].assignmentFee,
            payableassignment_fees: arr[i].remainingAssignmentFee,
            totalfee: arr[i].totalFee,
            pendingfee: arr[i].remainingFee - formData.last_exam_fees
          }
        )

      }
    }
    // setformData(
    //   {
    //     ...formData,
    //     batch_change: batchId
    //   }
    // )

    // setbatchfee({
    //   ...batchfee,
    //   batch_change: batchId
    // })

    // for (let i = 0; i < key; i++) {

    //   amount += batchlist[i].total_amount
    // }
    // setbatchfee(
    //   {
    //     ...batchfee,
    //     batch_change: batchId,
    //     totalfee: amount
    //   }
    // )
    // let a = await axios.post(`${apiUrl}/get-total-paid-fee`,
    //   {
    //     Id: id
    //   }
    // );
    // if (a.data) {
    //   setbatchfee(
    //     {
    //       ...batchfee,
    //       batch_change: batchId,
    //       assignment_fees: x.data[0].helping_charges,
    //       totalfee: amount,
    //       totalfeewithassignment1: amount + x.data[0].helping_charges,
    //       pendingfeewithassignment: ((amount + x.data[0].helping_charges) - (a.data[0].totalPaid + formData.last_exam_fees)),
    //       pendingfee: (amount - (a.data[0].totalPaid + formData.last_exam_fees))
    //     }
    //   )

    // }




  }
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.paymenturl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    });
  };
  const getFeeBatchWiseWithBatchChangeByDefault = async (batchId) => {


    console.log(`This is Assignment Fees ${formData.assignment_fees}`);
    let response = await axios.post(`${apiUrl}/get-Elligible-student-batch-by-Id`,
      {
        Id: id,
        batchId: batchId
      }
    );
    console.log("THis is")
    console.log(response.data)
    if (response.data.length > 0) {
      await getBatchList(response.data[0].batchId);
      console.log(response.data[0].batchno)

      let amount = response.data[0].amount;
      let assignfee = response.data[0].assignmentfees;
      let a = await axios.post(`${apiUrl}/get-total-paid-fee`,
        {
          Id: id
        }
      );
      if (a.data) {


        setbatchfee(
          {
            ...batchfee,
            batch_change: batchId,
            assignment_fees: assignfee,
            totalfee: amount,
            totalfeewithassignment1: amount + assignfee,
            pendingfeewithassignment: ((amount + assignfee) - (a.data[0].totalPaid + formData.last_exam_fees)),
            pendingfee: (amount - (a.data[0].totalPaid + formData.last_exam_fees))
          }
        )
      }

    }
  }
  return (
    <div className="w-full flex-grow p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {isEditing ? (
        <h2 className="max-w-4xl  text-2xl font-semibold py-2 flex items-center gap-4 text-indigo-500">
          Update Details{" "}
        </h2>
      ) : (
        <h2 className="max-w-4xl  text-2xl font-semibold py-2 flex items-center gap-4">
          Profile Details{" "}
          <Pencil
            className="cursor-pointer text-blue-600 hover:-rotate-6 hover:scale-110"
            onClick={() => setIsEditing(true)}
          />
        </h2>
      )}
      <div className="max-w-5xl  p-8 border border-gray-400 rounded-lg my-2">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="student_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Student ID
              </label>
              <input
                type="text"
                id="student_id"
                name="student_id"
                value={`${formData.student_id}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                placeholder="enter fullname"
                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="session_to"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admission No{" "}
              </label>
              <input
                type="text"
                id="session_to"
                name="enrollment_no"
                value={formData.admission_no}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="session_to"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Enrollment No{" "}
              </label>
              <input
                type="text"
                id="session_to"
                name="enrollment_no"
                value={formData.enrollment_no}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="student_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Student Name
              </label>
              <input
                type="text"
                id="full_name"
                name="student_name"
                value={`${formData.student_name}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                placeholder="enter fullname"
                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone
              </label>
              <input
                type="text"
                id="full_name"
                name="phone"
                value={`${formData.phone}`}

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                placeholder="enter fullname"
                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Alternate   Phone
              </label>
              <input
                type="text"
                id="full_name"
                name="alternate_phone"
                value={`${formData.alternate_phone}`}

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                placeholder="enter fullname"
                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="counselor_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="text"
                id="counselor_name"
                value={`${formData.email}`}

                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="counselor_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Alternate Email
              </label>
              <input
                type="text"
                id="counselor_name"
                value={`${formData.alternate_email}`}

                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="counselor_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Counselor Name
              </label>
              <input
                type="text"
                id="counselor_name"
                value={`${formData.counselor_name}`}

                name="counselor_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Date Of Birth
              </label>
              <input
                type="test"
                id="email"
                name="email"
                value={formData.date_of_birth}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                University Name
              </label>
              <input
                type="email"
                id="email"
                name="university_name"
                value={formData.university_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Course Name
              </label>
              <input
                type="email"
                id="email"
                name="course_name"
                value={formData.course_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Specialization Name
              </label>
              <input
                type="email"
                id="email"
                name="specialization_name"
                value={formData.specialization_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Exam Mode
              </label>
              <input
                type="email"
                id="email"
                name="exam_mode"
                value={formData.exam_mode}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admission Confirmation
              </label>
              <input
                type="email"
                id="email"
                name="admission_status"
                value={formData.admission_status}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admission Status
              </label>
              <input
                type="email"
                id="email"
                name="admission_status"
                value={formData.admission_status_confirm}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Select Batch Change
              </label>
              <select
                type="text"
                id="email"
                name="batch_changing"
                value={formData.batch_changing}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                onChange={handleInputChange}
              // onChange={handleFeeData}
              >
                <option value="" >
                  Select Batch Change
                </option>

                {
                  batchchanelist.map((e, v) =>
                  (
                    <option value={e.id} key={v}>
                      {e.name}
                    </option>
                  ))
                }

              </select>
            </div>


            {/* <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Batch
              </label>
              <input
                type="email"
                id="email"
                name="batch_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                value={formData.batch_title}
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div> */}
            <div>
              <label
                htmlFor="session_from"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Session From
              </label>
              <input
                type="number"
                id="session_from"
                value={formData.session_from}
                name="session_from"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="session_to"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Session to{" "}
              </label>
              <input
                type="number"
                id="session_to"
                name="session_to"
                value={formData.session_to}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                //onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>



            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admission Date
              </label>
              <input
                type="test"
                id="email"
                name="balance"
                value={formData.last_exam_remark}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admission Batch
              </label>
              <input
                type="text"
                id="email"
                name="balance"
                value={formData.admission_batch}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                required
                // onChange={(e) => handleInputChange(e)}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="assignment_fees"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Select Eligible Batch
              </label>
              <select
                type="text"
                id="email"
                name="batch_change"
                value={batchfee.batch_change}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                onChange={(e) => getFeeBatchWiseWithBatchChange(e.target.value, e.target.selectedIndex)}
              >
                <option value="" >
                  Select Batch
                </option>
                {
                  batchlist.map((b, i) => (
                    <option value={b.id} >
                      {b.weight + 1}
                    </option>

                  ))
                }
              </select>
            </div>
          </div>

          <Separator className="my-4 bg-indigo-500" />


          <div className="grid gap-6 mb-6 lg:grid-cols-3">


            {/* <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Eligible   Batch
              </label>


              <input
                type="text"
                id="total_amount"
                name="batch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                value={batchfee.batch}
                required
                disabled
              />
            </div> */}
            <div>
              <label
                htmlFor="total_amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Total Course Fees
              </label>
              <input
                type="number"
                id="total_amount"
                name="totalfee"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                value={batchfee.totalfee}
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="balance"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Total Course Payable Fees
              </label>
              <input
                type="number"
                id="balance"
                name="pendingfee"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                value={batchfee.pendingfee}
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="total_amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Total  Assignment Fee
              </label>
              <input
                type="text"
                id="total_amount"
                name="assignment_fees"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                value={batchfee.assignment_fees}
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="total_amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Total Payable   Assignment Fee
              </label>
              <input
                type="text"
                id="total_amount"
                name="payableassignment_fees"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"

                value={batchfee.payableassignment_fees}
                required
                disabled
              />
            </div>
            <div>
              <FollowUpsPopover
                trigger={
                  <Button className=" rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black">
                    Follow Ups
                  </Button>
                }
                id={id}
              />
              <Button
                className="ml-4 mt-7 rounded-md bg-indigo-500 text-white px-4 py-1 shadow-md hover:bg-white hover:text-black"
                onClick={() => {

                  navigate(`/Follow-Up/${id}`);

                }}
              >
                Follow Ups Status
              </Button>
            </div>

          </div>

          <Separator className="my-4 bg-indigo-500" />
          <div className="grid grid-cols-1">
            <div>
              <label
                htmlFor="status"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"} dark:text-gray-300`}
              >
                Payment URL
              </label>
              <div className="flex items-center space-x-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={formData.paymenturl}
                  className={`block text-[10px] mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"} dark:text-gray-300`}
                >
                  {formData.paymenturl}
                </a>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="text-gray-500 hover:text-indigo-500"
                  aria-label="Copy URL"
                >
                  <ClipboardIcon className="w-5 h-5" />
                </button>
              </div>
              {copySuccess && (
                <span className="text-sm text-green-500 mt-2">URL copied to clipboard!</span>
              )}
            </div>
          </div>
          <Separator className="my-4 bg-indigo-500" />

          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  }  dark:text-gray-300`}
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                defaultValue=""
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}

                onChange={(e) => handleInputChange(e)}

              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="None">None</option>
                <option value="Process">Process</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="last_exam_mode"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  }  dark:text-gray-300`}
              >
                Last Exam Mode{" "}
              </label>
              <select
                id="last_exam_mode"
                value={formData.last_exam_mode}
                name="last_exam_mode"
                defaultValue=""
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}

                onChange={(e) => handleInputChange(e)}

              >
                <option value="" disabled>
                  Select Exam Mode
                </option>
                {
                  examModelist.map((e, i) =>
                  (
                    <option value={e.name}>{e.name}</option>

                  ))
                }
              </select>
            </div>
            <div>
              <label
                htmlFor="last_exam_given"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  } dark:text-gray-300`}
              >
                Last Exam Given:
              </label>
              <select
                id="last_exam_given"
                name="last_exam_given"
                value={formData.last_exam_given}
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}
                onChange={(e) => handleInputChange(e)}
              >
                {/* Generate Options Dynamically */}
                {Array.from({ length: (2050 - 1960 + 1) }, (_, yearOffset) => {
                  const year = 1960 + yearOffset;
                  return (
                    Array.from(
                      [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ],
                      (month) => (
                        <option key={`${month}-${year}`} value={`${month} ${year}`}>
                          {`${month} ${year}`}
                        </option>
                      )
                    )
                  );
                })}
              </select>
            </div>

            {/* <div>
              <label
                htmlFor="last_exam_date"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  }  dark:text-gray-300`}
              >
                Last Exam Date
              </label>
              <input
                type="date"
                id="last_exam_date"
                name="last_exam_date"
                value={formData.last_exam_date}
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}
                placeholder=""

                onChange={(e) => handleInputChange(e)}

              />
            </div> */}
            <div>
              <label
                htmlFor="last_exam_fees"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  }  dark:text-gray-300`}
              >
                Last Exam Fees{" "}
              </label>
              <input
                type="number"
                id="last_exam_fees"
                value={formData.last_exam_fees}
                name="last_exam_fees"
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}


                onChange={(e) => handleInputChange(e)}

              />

            </div>
            <div>
              <label
                htmlFor="last_exam_mode"
                className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"
                  }  dark:text-gray-300`}
              >
                Mode{" "}
              </label>
              <select
                id="last_exam_mode"
                value={formData.mode}
                name="mode"
                defaultValue=""
                className={`bg-gray-50 border ${isEditing ? "border-indigo-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200`}

                onChange={(e) => handleInputChange(e)}

              >
                <option value="" disabled>
                  Select  Mode
                </option>
                <option value="NEW">NEW</option>
                <option value="RR">RR</option>
                <option value="BACK">BACK</option>
              </select>
            </div>
            <br />

            {jsonData &&
              Object.entries(jsonData).map(([key, value], index) => (
                <div key={index}>
                  <label
                    htmlFor={`key-${index}`}
                    className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"} dark:text-gray-300`}
                  >
                    {key}
                  </label>
                  <input
                    type="hidden"
                    id={`key-${index}`}
                    value={key}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => handleFieldChange(index, "key", e.target.value, "jsonData")}
                  />
                  <input
                    type="text"
                    id={`value-${index}`}
                    value={value}
                    name={key}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => handleFieldChange(index, "value", e.target.value, "jsonData")}
                  />
                </div>
              ))}

            <br />

            {fields.map((field, index) => (
              <div key={index} className="mb-4">
                <div>
                  <label
                    htmlFor={`key-${index}`}
                    className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"} dark:text-gray-300`}
                  >
                    Field Name
                  </label>
                  <input
                    type="text"
                    id={`key-${index}`}
                    value={field.key}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => handleFieldChange(index, "key", e.target.value, "fields")}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor={`value-${index}`}
                    className={`block mb-2 text-sm font-medium ${isEditing ? "text-indigo-500" : "text-gray-900"} dark:text-gray-300`}
                  >
                    Field Value
                  </label>
                  <input
                    type="text"
                    id={`value-${index}`}
                    value={field.value}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => handleFieldChange(index, "value", e.target.value, "fields")}
                  />
                </div>
              </div>
            ))}

            <br />

            <div className="mt-7 ">
              <button
                onClick={handleAddField}
                className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
              >
                Add new Field
              </button>
              <button
                type="submit"
                className="text-white ml-3 bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
              >
                Update
              </button>
            </div>
          </div>
          {isEditing && (
            <button
              type="submit"
              className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ViewStudentDetails;

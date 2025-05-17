
const axios = require('axios');
const db = require('../config/database');

const clearUserSessions = () => {
    console.log("Clearing user sessions...");
    userSessions = {}; // Reset the object
};

let userSessions = {};


const handleStudentQuery = async (req, res) => {

// setInterval(clearUserSessions, 20 * 60 * 1000);

const response = req.body;

console.log(response);
    

const phone = response?.data?.customer?.phone_number;
const countryCode = response?.data?.customer?.country_code;


const from = `${countryCode}${phone}`;
const message = req.body?.data?.message?.message?.trim();

const user = userSessions[from];
//  delete userSessions[from]; 
if (!user && message!="" ) {
  userSessions[from] = { step: 1, name: "", dob: "" };
  
  await sendMessages(
    "8700119609",
    "Please enter your email",
    "+91",
    "abcd",
    "Message"
  );

//   await sendMessages(
//     "3353908569",
//     "Please enter your email.",
//     "+92",
//     "abcd",
//     "Message"
//   );
} 


else if (user?.step === 1) {
  userSessions[from].name = message.trim(); 
  userSessions[from].step = 2; 
  
  
//   await sendMessages(
//     "8700119609",
//     "Please enter your date of birth.",
//     "+91",
//     "abcd",
//     "Message"
//   );
  
  await sendMessages(
    "8700119609",
    "Please enter your date of birth.",
    "+91",
    "abcd",
    "Message"
  );
}

else if (user?.step === 2 && user?.dob=='') {
  userSessions[from].dob = message.trim(); 
  userSessions[from].step = 3; 
  
  console.log("THis is message")
  console.log(userSessions[from]);
  
  await sendMessages(
    "8700119609",
    "Please enter your date of birth.",
    "+91",
    "whatsappdetails",
    "template"
  );
 
 


}

else if(user?.step === 3 &&  userSessions[from].dob!="")
{
       
       let results=await db.query(`
       SELECT 
         
        
         s.name ,
         
        
         s.email,
       
         s.admission_no,
     
         
       
         univ.name as university_name,
         c.name as course_name,
         spec.name as specialization_name,
        
         sb.title as batch_title,
       
         s.enrollment_no,
         sp.uid,

       
        
      
       
		
			scc.exam_mode_assignment_amount as assignment_fees,
     (sfs.total_amount+scc.exam_mode_assignment_amount) as totalamountwithassignment,
     sfs.total_amount,  
     ((sfs.total_amount+scc.exam_mode_assignment_amount) - COALESCE(sfs.installment_amount, 0)) as balancewithasignment,
      (sfs.total_amount - COALESCE(sfs.installment_amount, 0)) as balancewithoutasignment,
         COALESCE(sb.weight, 0) as batch_change,
         ses.remark as last_exam_remark
      FROM imts_erp_student s
      LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id

      LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
      LEFT JOIN imts_erp_course c ON s.course_id = c.id
      LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
      LEFT JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
      LEFT JOIN imts_erp_student_batch sb ON s.id = sb.student_id
      LEFT JOIN imts_erp_student_exam_sitting ses ON s.id = ses.student_id
      LEFT JOIN imts_erp_student_fee_structure sfs ON s.id = sfs.student_id
      LEFT JOIN imts_erp_student_counselor_commitment scc  ON s.id = scc.student_id
      
      WHERE s.email=?
       `,[userSessions[from].name]);
   
       
       
       if(message=="Full Name")
       {
          
          await sendMessages("8700119609", `Your Full Name is: ${results[0].name}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       else if(message=="Admission No")
       {
           
             await sendMessages("8700119609", `Your Admission No is: ${results[0].admission_no}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
         else if(message=="Enrollment No")
       {
           
           if(results[0].enrollment_no!='' && results[0].enrollment_no!=null)
           {
                 await sendMessages("8700119609", `Your Enrollment No is: ${results[0].enrollment_no}`, "+91",
          "abcd",
    "Message");
           }
           else
           {
                 await sendMessages("8700119609", `Your Enrollment No is Not Available`, "+91",
          "abcd",
    "Message");
           }
           
           
    //  delete userSessions[from]; 
       }
       
        else if(message=="Batch")
       {
           
await sendMessages("8700119609", `Your Batch is: ${results[0].batch_title}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       
       
       
        else if(message=="University")
       {
           
await sendMessages("8700119609", `Your University is: ${results[0].university_name}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       
               else if(message=="Course")
       {
           
await sendMessages("8700119609", `Your Course is: ${results[0].course_name}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       
          else if(message=="Specialization")
       {
           
await sendMessages("8700119609", `Your Specialization is: ${results[0].specialization_name}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
           else if(message=="Session")
       {
           
await sendMessages("8700119609", `Your Session is: ${results[0].session_from} - ${results[0].session_to}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       
        else if(message=="Assignment Fee")
       {
           
if(results[0].assignment_fees!='' && results[0].assignment_fees!=null)
{
    await sendMessages("8700119609", `Your Assignment Fee is: ${results[0].assignment_fees}`, "+91",
          "abcd",
    "Message");
}
else

{
    await sendMessages("8700119609", `Your Assignment is Not Available`, "+91",
          "abcd",
    "Message");
}
    //  delete userSessions[from]; 
       }
        else if(message=="Balance")
       {
           
await sendMessages("8700119609", `Your Balance is: ${results[0].total_amount}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       
         else if(message=="Payment URL")
       {
           
           const timestamp = Date.now() + Math.random();
  const hash = Math.random().toString(36).substring(2) + timestamp.toString(36).substring(2);

  const randIndex = Math.floor(Math.random() * (hash.length - 3)); 
  const randomSubstring = hash.substring(randIndex, randIndex + 3);
  
  
  
await sendMessages("8700119609", `Your Payment URL is: https://login.imtsinstitute.com/auth/auto/${randomSubstring}${results[0].uid}`, "+91",
          "abcd",
    "Message");
    //  delete userSessions[from]; 
       }
       else
       {
        //   delete userSessions[from]; 
       }
}

console.log("Updated user session:", userSessions[from]);

    //  await sendMessages("3353908569", "What is your name?", "+92");
    // const response = req.body;

    // console.log(response);

    // const phone = response?.data?.customer?.phone_number;
    // const countrycode = response?.data?.customer?.country_code;

    // const from = `${countrycode}${phone}`; 
    // const message = req.body?.data?.message?.message;
    
    
    //   const user = userSessions[from]; 

  
    // if (!user) 
    // {
      
    //  userSessions[from] = { step: 1, name: "", dob: "" };
    //  await sendMessages("3353908569", "Hi How are you", "+92","abcd","Message");
     
    //  await sendMessages("3353908569", "Please Enter Your Email", "+92","abcd","Message");
     
       
    // }
    // else
    // {
    //     console.log("dsfsdf");
        
    // }
    
    // if(user.step === 1) {
    //     userSessions[from].name = message.trim();
    //     userSessions[from].step = 2;
    // await sendMessages("3353908569", "Please Enter Your Date of Birth", "+92","abcd","Message");
     
    // }
    // console.log(user);
    
    
    // const user = userSessions[from]; 

  
    // if (!user) {
    //     const cleanString = (str) => str.replace(/\s+/g, ' ').trim();
    //     if (message && cleanString(message).toLowerCase().includes("enrollment number")) {
    //         userSessions[from] = { step: 1, name: "", dob: "" };
    //        
    //         return res.sendStatus(200);
    //     } else {
    //         return res.sendStatus(200);
    //     }
    // }

    
   // else if (user.step === 2) {
    //     userSessions[from].dob = message.trim();
    //     userSessions[from].step = 3;

    //     const { name, dob } = userSessions[from];
    //     db.query(
    //         "SELECT enrollment_number FROM students WHERE name = ? AND dob = ?",
    //         [name, dob],
    //         async (err, results) => {
    //             if (err) {
    //                 console.error(err);
    //                 await sendMessages(phone, "Sorry, an error occurred. Please try again later.", countrycode);
    //             } else if (results.length > 0) {
    //                 await sendMessages(phone, `Your enrollment number is: ${results[0].enrollment_number}`, countrycode);
    //             } else {
    //                 await sendMessages(phone, "No record found. Please check your details and try again.", countrycode);
    //             }
    //             delete userSessions[from];
    //         }
    //     );
    // }
    res.sendStatus(200);
}


const sendMessages = async (phone, message, countrycode,template,type) => {
    try {
     
if(type=="Message")
{
        const response = await axios.post("https://api.interakt.ai/v1/public/message/",
            {
                countryCode: countrycode,
                phoneNumber: phone,
                callbackData: "some_callback_data",
                type: "Text",
                data: {
                    message: message
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic TTltVVJKMldaUkU2NnNZbDYxSE1ZcmowREMzMkYtZkdzZHViQnpHbkw2MDo=`
                }
            }
        );
        console.log(`Message sent: ${response.data}`);
}
else
{
         const response = await axios.post(
      "https://api.interakt.ai/v1/public/message/",
      {
        countryCode: "+91",
        phoneNumber: "8700119609", 
        type: "Template",
        template: {
          name: template, 
          languageCode: "en",
          bodyValues: ["John Doe", "12345","12345","12345","12345","12345"]
        },
      },
      {
        headers: {
          Authorization: `Basic TTltVVJKMldaUkU2NnNZbDYxSE1ZcmowREMzMkYtZkdzZHViQnpHbkw2MDo=`, 
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Message sent successfully:", response.data);
}
    
        
        
    } catch (err) {
        console.error("Error sending message:", err);
    }
};

// Function to check message status
const checkMessageStatus = async (messageId) => {
    try {
        const response = await axios.get(
            `https://api.interakt.ai/v1/public/message/${messageId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic TTltVVJKMldaUkU2NnNZbDYxSE1ZcmowREMzMkYtZkdzZHViQnpHbkw2MDo=`
                }
            }
        );
        const status = response.data.status; // Check the status of the message
        console.log(`Message status: ${status}`);
        return status;
    } catch (err) {
        console.error("Error checking message status:", err);
    }
};

module.exports = { handleStudentQuery, checkMessageStatus };

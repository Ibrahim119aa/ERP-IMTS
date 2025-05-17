const { sendWhatsAppMessage } = require("../services/whatsappService");
const { sendEmail: sendEmailService } = require("../services/emailService");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const db = require("../config/database");

const axios = require("axios");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const db = require("../config/database");
const INTERAKT_API_URL = "https://api.interakt.ai/v1/public/message/";
const API_KEY = process.env.INTERAKT_API_KEY;


const getWhatsappStatus = async (req, res) => {
  const { id } = req.params;


  let r = await db.query("select id,phone,status,DATE_FORMAT(created_at, '%d %b %Y') AS send_date,DATE_FORMAT(created_at, '%l %p') AS send_time from imts_erp_student_whatsapp where student_id=?", [id]);

  res.send(r);

}
function generateRandomSubstring() {
  const timestamp = Date.now() + Math.random();
  const hash = Math.random().toString(36).substring(2) + timestamp.toString(36).substring(2);

  const randIndex = Math.floor(Math.random() * (hash.length - 3)); // Random starting index
  const randomSubstring = hash.substring(randIndex, randIndex + 3);

  return randomSubstring;
}

const sendPaymentLink = async (req, res) => {

  const { recipients } = req.body;


  try {
    const { recipients } = req.body;






    const randomCode = generateRandomSubstring();
    const emails = await Promise.all(
      recipients.map(async (email) => {
        const result = await db.query(`select t1.email,t2.uid from imts_erp_student t1 left join imts_erp_student_personal t2 on t2.student_id=t1.id where t1.id=${email}`);
        return {
          to: "ibrahimmemon1709@gmail.com",
          from: process.env.SENDER_EMAIL,
          subject: "Your Payment Link",
          text: `Payment Link`,
          html: `<p>Your Payment Link here: <a href="https://login.imtsinstitute.com/auth/auto/${randomCode}${result[0].uid}">https://login.imtsinstitute.com/auth/auto/${randomCode}${result[0].uid}</a></p>`,
        };
      })
    );

    const sendPromises = emails.map((email) => sgMail.send(email));

    const responses = await Promise.all(sendPromises);

    console.log("Emails sent successfully:", responses);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully!",
    });
  }
  catch (error) {
    console.error(
      "Error sending emails:",
      error.response?.body || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to send emails.",
      details: error.response?.body || error.message,
    });
  }
}
const getMailStatus = async (req, res) => {
  let a = `select * from imts_erp_mail_status where email=?`;
  let b = [req.body.email];
  let c = await db.query(a, b);

  res.send(c);

}
const mailStatus = async (req, res) => {

  const events = req.body;

  events.forEach((event) => {
    console.log("Event received:", event);

    if (event.event === "open") {
      console.log(`Email opened by: ${event.email}`);
      // Update your database to mark the email as "seen"
      // Example:
      // updateEmailStatus(event.email, "seen");


      db.query("update imts_erp_mail_status set status=? where email=?", ["Seen", event.email]);

    }

    if (event.event === "delivered") {
      console.log(`Email delivered to: ${event.email}`);
      // Update your database to mark the email as "delivered"
    }
  });

  res.status(200).send("Webhook received");


}

const sendWhatsApp = async (req, res) => {
  const { phoneNumber, message } = req.body;
  try {
    await sendWhatsAppMessage(phoneNumber, message);
    res.status(200).json({ message: "WhatsApp message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send WhatsApp message", error });
  }
};

const sendEmail = async (req, res) => {
  const { toEmail, subject, body } = req.body;
  try {
    await sendEmailService(toEmail, subject, body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
};

const sendBulkMAil = async (req, res) => {
  try {
    const { subject, message, recipients } = req.body;

    if (!subject || !message || !recipients || !Array.isArray(recipients)) {
      return res.status(400).json({ error: "Invalid payload!" });
    }



    const emails = await Promise.all(
      recipients.map(async (email) => {
        const result = await db.query(`select email from imts_erp_student where id=${email}`);
        // const t=await db.query('insert into imts_erp_mail_status(email,status) values(?,?)',[result[0]?.email,'delivered']);
        const t = await db.query('insert into imts_erp_mail_status(email,status,sender) values(?,?,?)', [result[0]?.email, 'delivered', process.env.SENDER_EMAIL]);

        return {
          //   to:result[0]?.email, 
          to: "ibrahimmemon1709@gmail.com",
          from: process.env.SENDER_EMAIL,
          subject: subject,
          text: message,
          html: `<p>${message}</p>`,
        };
      })
    );


    const sendPromises = emails.map((email) => sgMail.send(email));

    const responses = await Promise.all(sendPromises);

    console.log("Emails sent successfully:", responses);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error) {
    console.error(
      "Error sending emails:",
      error.response?.body || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to send emails.",
      details: error.response?.body || error.message,
    });
  }
};

const singleWhatsapp = async (req, res) => {
  const { countryCode, fullPhoneNumber, callbackData, type, template } =
    req.body;

  if (
    !countryCode ||
    !fullPhoneNumber ||
    !callbackData ||
    !type ||
    !template ||
    !template.name ||
    !template.languageCode ||
    !template.bodyValues
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields in the request body" });
  }

  try {
    const response = await axios.post(
      "https://api.interakt.ai/v1/public/message/",
      req.body,
      {
        headers: {
          Authorization: `${process.env.AUTHORIZATION}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "Request processed successfully",
      externalApiResponse: response.data,
    });
  } catch (error) {
    console.error(
      "Error making the API call:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Failed to make the API call",
      details: error.response ? error.response.data : error.message,
    });
  }
};

const bulkWhatsApp = async (req, res) => {
 

  const { recipients, template, body } = req.body;

console.log(template);
console.log(body);


  let users = [];

  let userlist = [];


  // let bodyValue=[];
  for (let i = 0; i < recipients.length; i++) {
    let bodyValue = [];

    let a = await db.query(`
    SELECT 
   
    COALESCE(u.full_name, '') as counselor_name,
    s.name as student_name,
    s.phone,
    s.email,
    
    s.batch_changing,
    s.admission_no,
    rp.full_name as responsable_person,
    s.alternate_email,
    sp.date_of_birth,
    s.alternate_phone,
    univ.name as university_name,
    c.name as course_name,
    spec.name as specialization_name,
    m.full_name as manager_name,
    s.exam_mode,
    s.session_from,
    s.session_to,
    s.status,
    s.batch_change,
    s.last_exam_mode,
    s.last_exam_given,
    s.last_exam_date,
    s.last_exam_fees,
    acs.name as admission_status,
    COALESCE((
        SELECT SUM(total_amount) 
        FROM imts_erp_student_fee_structure 
        WHERE student_id = s.id
    ), 0) as total_fees,
    COALESCE((
        SELECT SUM(pay) 
        FROM imts_erp_student_payment 
        WHERE student_id = s.id
    ), 0) as total_paid,
    COALESCE((
        SELECT SUM(total_amount) 
        FROM imts_erp_student_fee_structure 
        WHERE student_id = s.id
    ), 0) - COALESCE((
        SELECT SUM(pay) 
        FROM imts_erp_student_payment 
        WHERE student_id = s.id
    ), 0) as pending_amount
FROM imts_erp_student as s
 LEFT JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
LEFT JOIN imts_erp_user u ON u.id = s.created_by
LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
LEFT JOIN imts_erp_course c ON s.course_id = c.id
LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
LEFT JOIN imts_erp_counsellor rp ON rp.id = s.responsable_person_id
LEFT JOIN imts_erp_manager m ON m.id = rp.manager_id
    where s.id=?`, [recipients[i]]);

    for (let j = 0; j < body.length; j++) {
      console.log(`This is ${body[j]}: ` + a[0][body[j]]);
      bodyValue.push((a[0][body[j]] == null || a[0][body[j]] == "") ? "Not Found" : a[0][body[j]])
    }
    let obj = {
      phone: a[0].phone,
      id: recipients[i],
      Body: bodyValue
    };

    users.push(obj);
  }

  console.log(users);

  for (let i = 0; i < users.length; i++) {
    let obj = {};
    if (users[i].phone.length == 10) {
      object = {
        phone: users[i].phone,
        code: "+91",
        id: users[i].id,
        Body: users[i].Body
      }
    };
    if (users[i].phone.length == 13) {
      object = {
        phone: users[i].phone.substring(3, 13),
        code: users[i].phone.substring(0, 3),
        id: users[i].id,
        Body: users[i].Body
      }
    };
    if (users[i].phone.length == 12) {
      object = {
        phone: users[i].phone.substring(3, 13),
        code: `+${users[i].phone.substring(0, 3)}`,
        id: users[i].id,
        Body: users[i].Body
      }
    };

    userlist.push(object);

  }

  console.log(userlist);


  for (let i = 0; i < userlist.length; i++) {
    // sendMessages(userlist[i].phone,userlist[i].code,template,userlist[i].id)
// await    sendMessages("3353908569", "+92", template, userlist[i].id, userlist[i].Body)
try {
        await sendMessages(
            userlist[i].phone, 
            userlist[i].code, 
            template, 
            userlist[i].id, 
            userlist[i].Body
        );
        console.log(`Message sent successfully for user ID: ${userlist[i].id}`);
    } catch (error) {
        console.error(`Failed to send message for user ID: ${userlist[i].id}. Error: ${error.message}`);
    }
  }

  res.status(200).json({
    success: true,
    message: "Bulk messages sent!",

  });

};
const getTemplateData=async(req,res)=>
{
  const {name}=req.body;
  let a=`select value from imts_erp_templatedata where name=? order by id desc limit 1`;
  let b=[name];
  let c=await db.query(a,b);
  res.send(c);

}

const sendMessages = async (phone, countrycode, template, id, Body) => {
  try {

    const response = await axios.post(
      "https://api.interakt.ai/v1/public/message/",
      {
        countryCode: countrycode,
        phoneNumber: phone,
        type: "Template",
        template: {
          name: template,
          languageCode: "en",
          bodyValues: Body
        },
      },
      {
        headers: {
          Authorization: `Basic TTltVVJKMldaUkU2NnNZbDYxSE1ZcmowREMzMkYtZkdzZHViQnpHbkw2MDo=`,
          "Content-Type": "application/json",
        },
      }
    );


    let a = `insert into imts_erp_student_whatsapp(student_id,messageid,phone,status) values(?,?,?,?)`;

    let b = [id, response.data.id, `${countrycode}${phone}`,"Sent"];

    let c = await db.query(a, b);
    console.log(response.data);


    console.log("Message sent successfully:", response.data.id);





  } catch (err) {
    console.log("Error sending message:", err);
  }
};


const checkMessageStatus = async (messageId, phone, student_id) => {
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

    let a = `insert into imts_erp_student_whatsapp_status(phone,student,status) values(?,?,?)`;
    let b = [phone, student_id, response.data.status];
    let c = await db.query(a, b);

    const status = response.data.status;

    console.log(`Message status: ${status}`);
    return status;
  } catch (err) {
    console.error("Error checking message status:", err);
  }
};

const sendBulkWhatsApp = async (req, res) => {
  const { templates, recipients } = req.body;

  try {
    const results = [];
    const errors = [];

    // Template parameters validation map
    const templateParams = {
      'boost_conversion': 1,  // expects 1 parameter
      'copy_of_10_oct': 2    // expects 2 parameters
    };

    for (const recipient of recipients) {
      for (const template of templates) {
        try {
          // Validate template parameters count
          const expectedParams = templateParams[template.templateId] || 0;
          const providedParams = template.placeholders?.body?.length || 0;

          if (providedParams !== expectedParams) {
            throw new Error(`Template ${template.templateId} expects ${expectedParams} parameters but received ${providedParams}`);
          }

          const messageData = {
            countryCode: "+91",
            fullPhoneNumber: `91${recipient.phoneNumber}`,
            callbackData: "Bulk message",
            type: "Template",
            template: {
              name: template.templateId,
              languageCode: template.languageCode || "en",
              bodyValues: template.placeholders?.body?.slice(0, expectedParams) || []
            }
          };

          const response = await axios.post(INTERAKT_API_URL, messageData, {
            headers: {
              'Authorization': process.env.AUTHORIZATION,
              'Content-Type': 'application/json'
            }
          });

          results.push({
            phoneNumber: recipient.phoneNumber,
            templateId: template.templateId,
            status: 'success',
            response: response.data
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
          errors.push({
            phoneNumber: recipient.phoneNumber,
            templateId: template.templateId,
            error: error.response?.data?.message || error.message
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      summary: {
        totalAttempted: recipients.length * templates.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error("Bulk send fatal error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
const getTemplateList = async (req, res) => {
  try {
    const response = await axios.get("https://api.interakt.ai/v1/public/track/organization/templates", {
      headers: {
        Authorization: `Basic {{TTltVVJKMldaUkU2NnNZbDYxSE1ZcmowREMzMkYtZkdzZHViQnpHbkw2MDo=}}`,
        'Content-Type': 'application/json',
      },
    });
    return res.send(response.data);
  } catch (error) {
    console.error('Error fetching templates:', error.response?.data || error.message);
  }
}


const addWhatsappTemplateMapping = async (req, res) => {
  const { template, body } = req.body;
  const bb = `insert into imts_erp_templatedata(name,value) values(?,?)`;
  let cc = [template, JSON.stringify(body)];
  let dd = await db.query(bb, cc);

  return res.send("Mapping Successfully Add");

}
const getMessageStatus=async(req,res)=>
{
    console.log("Pr 1");
    console.log(req.body);
    
    const messageId=req.body?.data?.message.id;
    const status=req.body?.data?.message.message_status;
   const phone=req.body?.data?.customer?.phone_number;
   const phonecode=req.body?.data?.customer?.country_code;
   const phoneNumber=`${phonecode}${phone}`;
   
    console.log(messageId);
   
   
   let a=`update imts_erp_student_whatsapp set status=? where phone=? and messageid=?`;
   let b=[status,phoneNumber,messageId];
   let c=await db.query(a,b);
   
    //  let messageStatus='';
    // let a=`select messageid,phone,student_id from imts_erp_student_whatsapp where messageid=?`;
    // let b=[messageId];
    // let c=await db.query(a,b);
    
    // console.log(c);
    
    // if(c.length>0)
    // {
       
    //     if(status.trim()=='Delivered')
    //     {
    //         messageStatus='Delivered';
            
    //         let p=await db.query(`select id from imts_erp_student_whatsapp_status where student=${c[0].student_id}`);
    //       if(p.length>0)
    //       {
    //           let g=`update imts_erp_student_whatsapp_status set status=? where student=?`;
    //           let h=[messageStatus,c[0].student_id];
    //           let i=await db.query(g,h);
    //       }
    //       else
    //       {
    //           let d=`insert into imts_erp_student_whatsapp_status(phone,student,status) values(?,?,?)`;
    //           let ee=[c[0].phone,c[0].student_id,messageStatus];
    //           let ff=await db.query(d,ee);
               
    //       }
    //         console.log("This is Delivered");
            
    //     }
    //     else if(status.trim()=='Read')
    //     {
    //         messageStatus='Seen';
    //              let p=await db.query(`select id from imts_erp_student_whatsapp_status where student=${c[0].student_id}`);
        
    //         if(p.length>0)
    //       {
    //           let g=`update imts_erp_student_whatsapp_status set status=? where student=?`;
    //           let h=[messageStatus,c[0].student_id];
    //           let i=await db.query(g,h);
    //       }
    //       else
    //       {
    //           let d=`insert into imts_erp_student_whatsapp_status(phone,student,status) values(?,?,?)`;
    //           let ee=[c[0].phone,c[0].student_id,messageStatus];
    //           let ff=await db.query(d,ee);
               
    //       }
    //     }
    // }
    // else
    // {
        
    // }
 console.log(`This is`+req.body?.data?.message?.message_status);
 return  res.status(200).send("sdfsdf")

}
module.exports = {
  sendWhatsApp,
  getMessageStatus,
  addWhatsappTemplateMapping,
  sendEmail,
  getTemplateList,
  sendBulkMAil,
  bulkWhatsApp,
  singleWhatsapp,
  getTemplateData,
  sendBulkWhatsApp,
  mailStatus,
  getMailStatus,
  sendPaymentLink,
  getWhatsappStatus
};

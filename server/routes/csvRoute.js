const multer = require("multer");
const path = require("path");
const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const csv = require("fast-csv");
const db = require("../config/database");

const routess = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

function convertXlsxToCsv(xlsxFilePath, csvFilePath) {
  const workbook = XLSX.readFile(xlsxFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const csvData = XLSX.utils.sheet_to_csv(worksheet);
  fs.writeFileSync(csvFilePath, csvData);
  console.log("XLSX file converted to CSV:", csvFilePath);
  return csvFilePath;
}


const uploadCsv = async (filePath) => {
  const stream = fs.createReadStream(filePath);
  const csvDataColl = [];
  let headers = [];
  console.log("This is for upload");

  const fileStream = csv
    .parse({ headers: true }) // Enable parsing with headers
    .on("headers", (csvHeaders) => {
      headers = csvHeaders.map((header) => header.trim()); // Capture the header row
      console.log(`Headers: ${headers.join(", ")}`);
    })
    .on("data", (row) => {
      const rowData = headers.map((header) => row[header] || null); // Ensure columns align
      if (rowData.length === headers.length) {
        csvDataColl.push(row);
      } else {
        console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
      }
    })
    .on("end", async () => {
      if (!csvDataColl.length) {
        console.log("No valid data rows to process.");
        return;
      }

      console.log(`Processing ${csvDataColl.length} rows`);

      try {
        for (const row of csvDataColl) {
          const admissionNo = row["admission_no"];
          const batchTitle = row["batch_title"];
          const batchFee = row["batch_fee"];
          const batchChange = row["eligible_batch"];
          console.log(`This is my eligible batch ${batchChange}`);

          let batchChanges = '';

          if (batchChange && batchChange.trim() !== "") {
            const batchChangeInt = parseInt(batchChange, 10);
            if (!isNaN(batchChangeInt)) {
              batchChanges = batchChangeInt - 1;
              console.log("Updated Batch Change:", batchChanges);
            } else {
              console.error("Invalid batchChange value, not a number");
            }
          } else {
            console.log("batchChange is empty or undefined");
          }

          if (!admissionNo) {
            console.warn(`Skipping row with missing admission_no: ${JSON.stringify(row)}`);
            continue;
          }

          console.log(`Batch Title: ${batchTitle}, Batch Fee: ${batchFee}`);

          const validHeaders = headers.filter((header) =>
            row[header] !== null && row[header] !== ""
          );


          const updateFields = validHeaders
            .filter((header) => !["admission_no", "batch_title", "batch_fee", "eligible_batch"].includes(header))
            .map((header) => `${header} = ?`)
            .join(", ");

          const updateQuery = `
            UPDATE imts_erp_student
            SET ${updateFields}
            WHERE admission_no = ?
          `;

          const updateValues = validHeaders
            .filter((header) => !["admission_no", "batch_title", "batch_fee", "eligible_batch"].includes(header))
            .map((header) => row[header] || null);

          updateValues.push(admissionNo);

          if(updateFields.length>0)
          {
            await db.query(updateQuery, updateValues);
          }

          console.log(`Updated record for admission_no: ${admissionNo}`);
          console.log(batchChanges.toString() != null && batchChanges.toString() != "" && batchChanges.toString() != '');

          if (batchChanges.toString() != null && batchChanges.toString() != "" && batchChanges.toString() != '') {
            let updateFeeStructureQuery = `
        UPDATE imts_erp_student_fee_structure 
        SET total_amount = ? 
        WHERE student_id = (
            SELECT id FROM imts_erp_student WHERE imts_erp_student.admission_no = ?
        ) 
        AND student_batch_id = (
            SELECT id FROM imts_erp_student_batch 
            WHERE imts_erp_student_batch.student_id = (
                SELECT id FROM imts_erp_student WHERE admission_no = ?
            ) 
            AND imts_erp_student_batch.title = ?
        );
      `;

            let feeStructureParams = [batchFee, admissionNo, admissionNo, batchTitle];

            await db.query(updateFeeStructureQuery, feeStructureParams);


            let updateBatchChangeQuery = `
        UPDATE imts_erp_student 
        SET batch_change = (
            SELECT id FROM imts_erp_student_batch 
            WHERE student_id = (
                SELECT id FROM imts_erp_student WHERE admission_no = ?
            ) 
            AND weight = ?
        ) 
        WHERE admission_no = ?;
      `;

            let batchChangeParams = [admissionNo.trim(), batchChanges, admissionNo.trim()];

            await db.query(updateBatchChangeQuery, batchChangeParams);
            console.log("This is memon boy");

          }
          else {
            console.log("This is ibrahim")
          }

        }

        console.log("All rows processed successfully!");
      } catch (error) {
        console.error("Error during data update:", error.message);
        throw error;
      }
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error.message);
    });

  stream.pipe(fileStream);
};


// Example of a sanitizeData function to clean/validate data (if needed)
function sanitizeData(row) {
  return row.map((value) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
}


routess.post("/import-csv", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedFilePath = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    req.file.filename
  );

  console.log("Uploaded file path:", uploadedFilePath);

  try {
    if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      req.file.mimetype === "application/vnd.ms-excel"
    ) {
      const csvFilePath = uploadedFilePath.replace(".xlsx", ".csv");
      convertXlsxToCsv(uploadedFilePath, csvFilePath);
      await uploadCsv(csvFilePath);
      res.status(200).send("XLSX file successfully uploaded and processed.");
    } else if (req.file.mimetype === "text/csv") {
      await uploadCsv(uploadedFilePath);
      res.status(200).send("CSV file successfully uploaded and processed.");
    } else {
      res.status(400).send("Invalid file type. Only CSV and XLSX are allowed.");
    }
  } catch (error) {
    console.error("Error during file upload and processing:", error.message);
    res.status(500).send("Error during file processing.");
  }
});

module.exports = routess;

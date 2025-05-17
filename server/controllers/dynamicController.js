const connection = require("../config/database");
const axios = require("axios");

async function fetchAndStoreData(response) {
    try {

        const records = response;
         
        const std=response.student;

        let university = records.university;

        for (const record of university) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const values = Object.values(record);

            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');

            const updateValues = [...Object.values(record), ...Object.values(record)];

            const upsertQuery = `
        INSERT INTO imts_erp_university (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, updateValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id ${record.id} upserted successfully.`);
                }
            });
        }

        let course = records.course;

        for (const record of course) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const values = Object.values(record);

            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');

            const upsertValues = [...Object.values(record), ...Object.values(record)]; 
        
            const upsertQuery = `
        INSERT INTO imts_erp_course (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id ${record.id} upserted successfully.`);
                }
            });
        }

        let specialization = records.specialization;

        for (const record of specialization) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const values = Object.values(record);

            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');

            const upsertValues = [...Object.values(record), ...Object.values(record)]; 

          
            const upsertQuery = `
                INSERT INTO imts_erp_specialization (${columns})
                VALUES (${placeholders})
                ON DUPLICATE KEY UPDATE ${updateSet}
            `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id ${record.id} upserted successfully.`);
                }
            });
        }

        let admission_confirmation = records.admission_confimation;

        for (const record of admission_confirmation) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const values = Object.values(record);

            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');

            const upsertValues = [...Object.values(record), ...Object.values(record)];

           
            const upsertQuery = `
                INSERT INTO imts_erp_admission_confirmation_status (${columns})
                VALUES (${placeholders})
                ON DUPLICATE KEY UPDATE ${updateSet}
            `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id ${record.id} upserted successfully.`);
                }
            });
        }

        let student_batch = records.student_batch;

        for (const record of student_batch) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

         
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_student_batch (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with 11111 id ${record.id} upserted successfully.`);
                }
            });
        }

        let student_exam_sitting = records.student_exam_sitting;

        for (const record of student_exam_sitting) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

       
            const upsertValues = [...values, ...values];

            const upsertQuery = `
                INSERT INTO imts_erp_student_exam_sitting (${columns})
                VALUES (${placeholders})
                ON DUPLICATE KEY UPDATE ${updateSet}
            `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id 2222 ${record.id} upserted successfully.`);
                }
            });
        }

        let student_fee_structure = records.student_fee_structure;

        for (const record of student_fee_structure) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

         
            const upsertValues = [...values, ...values]; 

            const upsertQuery = `
                INSERT INTO imts_erp_student_fee_structure (${columns})
                VALUES (${placeholders})
                ON DUPLICATE KEY UPDATE ${updateSet}
            `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id 3333 ${record.id} upserted successfully.`);
                }
            });
        }

        let users = records.users;

        for (const record of users) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

          
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_user (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with id ${record.id} upserted successfully.`);
                }
            });
        }



        let student = records.student;

        for (const record of std) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

         
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_student (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.log('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with  444 id ${record.phone}  successfully. updated`);
                }
            });
        }


        let student_personal = records.student_personal;

        for (const record of student_personal) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

          
            const upsertValues = [...values, ...values]; 

            const upsertQuery = `
        INSERT INTO imts_erp_student_personal (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with 555 id ${record.id} upserted successfully.`);
                }
            });
        }


        let student_fee = records.student_fee;

        for (const record of student_fee) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

            const upsertValues = [...values, ...values]; 

            const upsertQuery = `
                INSERT INTO imts_erp_student_payment (${columns})
                VALUES (${placeholders})
                ON DUPLICATE KEY UPDATE ${updateSet}
            `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record Ith Payment  with 666 id ${record.id} upserted successfully.`);
                }
            });
        }


        let assignment_fee = records.assignment_fee;

        for (const record of assignment_fee) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

         
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_student_counselor_commitment (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with 777 id ${record.id} upserted successfully.`);
                }
            });
        }


        let exam_batch = records.exam_batch;

        for (const record of exam_batch) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

            
            const upsertValues = [...values, ...values]; 

            const upsertQuery = `
        INSERT INTO imts_erp_exam_batch (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with 888 id ${record.id} upserted successfully.`);
                }
            });
        }


        let follow_pdc = records.follow_pdc;

        for (const record of follow_pdc) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

           
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_student_assigned_follow_pdc (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with This is for pdc id ${record.id} upserted successfully.`);
                }
            });
        }
        
        
         let student_assignment = records.student_assignment;

        for (const record of student_assignment) {
            const columns = Object.keys(record).join(', ');
            const placeholders = Object.keys(record).map(() => '?').join(', ');
            const updateSet = Object.keys(record)
                .map((key) => `${key} = ?`)
                .join(', ');
            const values = Object.values(record);

           
            const upsertValues = [...values, ...values];

            const upsertQuery = `
        INSERT INTO imts_erp_student_fee_immediate_charges (${columns})
        VALUES (${placeholders})
        ON DUPLICATE KEY UPDATE ${updateSet}
    `;

            connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
                if (upsertError) {
                    console.error('Error upserting data:', upsertError);
                } else {
                    console.log(`Record with This is for assignment id ${record.id} upserted successfully.`);
                }
            });
        }


    //     let student_followup = records.student_followup;

    //     for (const record of student_followup) {
    //         const columns = Object.keys(record).join(', ');
    //         const placeholders = Object.keys(record).map(() => '?').join(', ');
    //         const updateSet = Object.keys(record)
    //             .map((key) => `${key} = ?`)
    //             .join(', ');
    //         const values = Object.values(record);

       
    //         const upsertValues = [...values, ...values];

    //         const upsertQuery = `
    //     INSERT INTO imts_erp_student_followup (${columns})
    //     VALUES (${placeholders})
    //     ON DUPLICATE KEY UPDATE ${updateSet}
    // `;

    //         connection.query(upsertQuery, upsertValues, (upsertError, upsertResults) => {
    //             if (upsertError) {
    //                 console.error('Error upserting data:', upsertError);
    //             } else {
    //                 console.log(`Record with 00000 id ${record.id} upserted successfully.`);
    //             }
    //         });
    //     }


    } catch (error) {
        console.log('Error fetching data from the API:', error);
    } finally {
        console.log("THis is finally");


    }
}
module.exports = { fetchAndStoreData };
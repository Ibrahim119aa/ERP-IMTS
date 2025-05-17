const bcrypt = require("bcryptjs");

const db = require("../config/database");

exports.addProfile = async (req, res) => {
  const {
    user_name,
    password,
    full_name,
    email,
    phone,
    user_type,
    created_by,
    active,
    updated_by,
    deleted_by,
  } = req.body;


  let photoPath = null;
  if (req.file) {
    photoPath = req.file.path;
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    // const uid = uuidv4();
    const uid = "SAdasd";


    const query = `
      INSERT INTO imts_erp_users (user_name, password, full_name, uid, email, phone, photo, user_type, created_by, active, updated_by, deleted_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    await db.query(query, [
      user_name,
      hashedPassword,
      full_name,
      uid,
      email,
      phone,
      photoPath,
      user_type,
      created_by,
      active,
      updated_by,
      deleted_by,
    ]);


    res.status(201).json({ message: "Profile created successfully" });
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Error creating profile: " + err.message });
  }
};


exports.viewProfile = async (req, res) => {
  const { id } = req.params;

  const queryStr = `
      SELECT * FROM imts_erp_users WHERE id = ?
    `;

  try {

    const result = await db.query(queryStr, [id]);


    if (result.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }


    return res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);

    return res.status(500).json({ message: "Error fetching profile: " + err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const {
    user_name,
    password,
    full_name,
    email,
    phone,
    user_type,
    created_by,
    active,
    updated_by,
    deleted_by,
  } = updatedData;

  let photoPath = null;


  if (req.file) {
    photoPath = req.file.path;
  }

  try {

    const updates = [
      user_name,
      full_name,
      email,
      phone,
      photoPath,
      user_type,
      updated_by,
      created_by,
      deleted_by,
      active,
    ];

    let query = `
        UPDATE imts_erp_users
        SET user_name = ?, full_name = ?, email = ?, phone = ?, photo = ?, user_type = ?, updated_by = ?, created_by = ?, deleted_by = ?, active = ?, updated_at = NOW()
        WHERE id = ?
      `;


    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = query.replace('SET ', `SET password = ?, `);
      updates.unshift(hashedPassword);
    }


    const result = await db.query(query, [...updates, id]);


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }


    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ message: "Error updating profile: " + err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, new_password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(new_password, 10);


    const query = "UPDATE imts_erp_users SET password = ?, updated_at = NOW() WHERE email = ?";

    const result = await db.query(query, [hashedPassword, email]);


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Email not found" });
    }


    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(500).json({ message: "Error resetting password: " + err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const query = `
        SELECT 
          id,
          full_name,
          email,
          role,
          phone
        FROM imts_erp_user
        WHERE deleted_at IS NULL;
      `;

    // Remove array destructuring to get all results
    const results = await db.query(query);
    const users = results; // Get all users from first element

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
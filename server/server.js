const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
  const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require('node-cron');
const PORT = process.env.PORT || 5000;
// dotenv.config();
const { fetchAndStoreData } = require('./controllers/dynamicController');
require("./config/database");
const studentRoutes = require("./routes/studentRoutes");
const csvRoute = require('./routes/csvRoute')
const profileRoutes = require('./routes/profileRoutes')
const followupRoute = require('./routes/followUpRoute')
const paymentRoute = require('./routes/paymentRoutes')
const communcationRoute = require('./routes/communicationRoutes')
const auth = require('./routes/authRoute')
const counsellorRoute = require('./routes/counsellorRoute');
const multer = require("multer");
const managerRoute = require('./routes/manageRoute');
const universityRouter = require("./routes/universityRouite");
const courseRouter = require("./routes/courseRoute");
const specializationRouter = require("./routes/specializationRoute");
const lastStatusRouter=require('./routes/lastStatusRoute');
const examRoute=require('./routes/examRoute');
const examModeRouter=require('./routes/examModeRoute');

const chatbotRoutes = require('./routes/chatbotRoutes');

cron.schedule('0 0 * * *', async () => {
  fetchAndStoreData();
});

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const logFile = fs.createWriteStream("./app.log", { flags: "a" });

// Function to log data
const log = (message) => {
    if (typeof message === "object") {
        logFile.write(`${new Date().toISOString()} ${JSON.stringify(message, null, 2)}\n`);
    } else {
        logFile.write(`${new Date().toISOString()} ${message}\n`);
    }
};

// Redirect `console.log` to log both to console and the log file
console.log = (...args) => {
    const message = args.map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
    ).join(" ");
    logFile.write(`${new Date().toISOString()} ${message}\n`);
    process.stdout.write(`${message}\n`);
};

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.get("/api", (req, res) => {
  res.send("API is running");
});






app.use('/api/exam', examRoute)
app.use("/api/exam-mode",examModeRouter);
app.use('/api/last-status', lastStatusRouter)
app.use('/api', csvRoute)
app.post("/api/reload", async (req, res) => {
  const { Data } = req.body.Obj;



  await fetchAndStoreData(JSON.parse(req.body.Obj));



  res.send("dsfsdf");


})

app.get("/api/refresh", async (req, res) => {
    try
    {
    let obj = await axios.get(`https://login.imtsinstitute.com/get-All-Record-For-New-ERP`);
  await fetchAndStoreData(obj);        
    }
    catch(e)
    {
        console.log(e)
        
    }

console.log("This is refr111esh");
// console.log(obj);
res.send("SDFsdf");



})
app.use('/api/auth', auth)
app.use("/api", studentRoutes);
app.use('/api/profile', profileRoutes)
app.use("/api/counsellor", counsellorRoute);
app.use("/api/manager", managerRoute);
app.use("/api/university", universityRouter);
app.use("/api/course", courseRouter);
app.use("/api/specialization", specializationRouter);
app.use('/api/chatboot', chatbotRoutes);

app.use('/api/followup', followupRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/communication', communcationRoute)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage: storage });;



app.use('/api/image', express.static(path.join(__dirname, 'public/uploads')));

app.post("/api/images/Save-Images", upload.array("image", 10), async (req, res) => {
  console.log("Memion");

  res.json(
    {
      Status: true
    }
  );

})




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

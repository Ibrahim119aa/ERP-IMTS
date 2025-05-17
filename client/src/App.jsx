import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddManager from "./pages/AddManager";
import AllManager from "./pages/AllManager";
import AllStudents from "./pages/AllStudents";
import MainLayout from "./components/layouts/MainLayout";
import AddProfile from "./pages/AddProfile";
import NotFound from "./pages/NotFound";
import SingleFollowUp from "./pages/SingleFollowUp";
import AllCounselors from "./pages/AllCounselors";
import CounselorsViewDetails from "./pages/CounselorsViewDetails";
import ViewStudentDetails from "./pages/ViewStudentDetails";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import AddCounsellor from "./pages/AddCounsellor";
import ManagerViewDetails from "./pages/ManagerViewDetail";
import AddLastStatus from "./pages/AddLastStatus";
import AllLastStatus from "./pages/AllLastStatus";
import SingleMailStatus from "./pages/SingleMailStatus";
import SingleWhatsapp from "./pages/SingleWhatsapp";
import './App.css';
import AddExamMode from "./pages/AddExamMode";
import AllExamMode from "./pages/AllExamMode";
import SingleLastStatus from "./pages/SingleLastStatus";
import SingleExamMode from "./pages/SingleExamMode";
function App() {
  return (
    <Router >
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/addProfile"
          element={
            <MainLayout>
              <AddProfile />
            </MainLayout>
          }
        />
         <Route
          path="/Add-Exam-Mode"
          element={
            <MainLayout>
              <AddExamMode />
            </MainLayout>
          }
        />
        <Route
          path="/allStudents"
          element={
            <MainLayout>
              <AllStudents />
            </MainLayout>
          }
        />

        <Route
          path="/Follow-Up/:Id"
          element={
            <MainLayout>
              <SingleFollowUp />
            </MainLayout>
          }
        />
        <Route
          path="/Single-Mail-Status/:Id"
          element={
            <MainLayout>
              <SingleMailStatus />
            </MainLayout>
          }
        />
         <Route
          path="/Single-Whatapp-Status/:Id"
          element={
            <MainLayout>
              <SingleWhatsapp />
            </MainLayout>
          }
        />
        <Route
          path="/addManager"
          element={
            <MainLayout>
              <AddManager />
            </MainLayout>
          }
        />

        <Route
          path="/addResponsible"
          element={
            <MainLayout>
              <AddCounsellor />
            </MainLayout>
          }
        />
        <Route
          path="/allResponsible"
          element={
            <MainLayout>
              <AllCounselors />
            </MainLayout>
          }
        />
         <Route
          path="/all-Exam-Mode"
          element={
            <MainLayout>
              <AllExamMode />
            </MainLayout>
          }
        />

        <Route
          path="/allStudents"
          element={
            <MainLayout>
              <AllStudents />
            </MainLayout>
          }
        />
        <Route
          path="/allManagers"
          element={
            <MainLayout>
              <AllManager />
            </MainLayout>
          }
        />
        <Route
          path="/viewProfile/:id"
          element={
            <MainLayout>
              <ViewStudentDetails />
            </MainLayout>
          }
        />
        <Route
          path="/Responsible-details/:id"
          element={
            <MainLayout>
              <CounselorsViewDetails />
            </MainLayout>
          }
        />

        <Route
          path="/Add-Last-Status"
          element={
            <MainLayout>
              <AddLastStatus />
            </MainLayout>
          }
        />
         <Route
          path="/Last-Status/:Id"
          element={
            <MainLayout>
              <SingleLastStatus />
            </MainLayout>
          }
        />
         <Route
          path="/Single-Exam-Mode/:Id"
          element={
            <MainLayout>
              <SingleExamMode />
            </MainLayout>
          }
        />
        <Route
          path="/All-Last-Status"
          element={
            <MainLayout>
              <AllLastStatus />
            </MainLayout>
          }
        />

        <Route
          path="/manager-details/:id"
          element={
            <MainLayout>
              <ManagerViewDetails />
            </MainLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

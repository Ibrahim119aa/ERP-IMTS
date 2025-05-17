import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { allStudentsAtom } from "../states/studentState";
import conf from "../../config/index";
//import axios from "axios";

const useStudent = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [allStudent, setAllStudent] = useRecoilState(allStudentsAtom);

  console.log(`apiBaseUrl : ${conf.apiBaseUrl}`);

  const fetchAllStudents = async () => {
    /* setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        // url: `${conf.apiBaseUrl}api/refreshs`,
        //url: `32ae-2405-201-6815-1098-d4a8-5d12-9b78-504.ngrok-free.app/api/refreshs`,
        url: `https://32ae-2405-201-6815-1098-d4a8-5d12-9b78-504.ngrok-free.app/api/refreshs`,
      });
      if (res) {
        console.log("res :", res);
        setLoading(false);
        setAllStudent(res);
      } else {
        throw new Error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error while fetching All Students:", error);
    } finally {
      setLoading(false);
    } */
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}refreshs`,
      });
      if (res) {
        setLoading(false);
        setAllStudent(res);
      }
    } catch (error) {
      console.error("Error while fetching Student List:", error);
    } finally {
      setLoading(false);
    }
  };

  /* const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${conf.apiBaseUrl}api/refresh`);
      console.log("API Response:", response.data); 
      setAllStudent(response.data); 
    } catch (error) {
      console.error("Failed to fetch students:", error.message);
      // Handle error: log detailed error info if available
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      }
      setAllStudent([]); 
    } finally {
      setLoading(false); 
    }
  }; */

  return {
    loading,
    fetchAllStudents,
    allStudent,
  };
};
export default useStudent;

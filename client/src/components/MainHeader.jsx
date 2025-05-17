import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const MainHeader = () => {

  const navigator = useNavigate();

  let token = localStorage.getItem("token");
  const CheckLogin = () => {
    if (token) {
      let a = jwtDecode(token);
      console.log(a);

    }
    else {
      navigator("/");

    }
  }
  useEffect(() => {
    CheckLogin();

  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("column");

    navigator("/");
  }
  return (
    <div className="bg-white h-[60px] w-full flex items-center shadow-md z-10">
      <SidebarTrigger />

      <div className="absolute right-3">
        <Button
          variant="outline"
          className="bg-teal-500 text-white"
          onClick={handleLogout}
        >
          {" "}

          Logout
        </Button>
      </div>


    </div>
  );
};

export default MainHeader;

import { Users, SquareUserRound, UsersRound } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainSidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  const [sidebarLinks, setsidebarlinks] = useState([]);


  let token = localStorage.getItem("token");
  const [user, setuser] = useState([]);
  const CheckLogin = () => {
    if (token) {
      let a = jwtDecode(token);
      setuser(a);
     


      if (a.role == 1) {
        setsidebarlinks([
          {
            title: "Students",
            url: "/allStudents",
            icon: SquareUserRound,
          },
          {
            title: "Responsible",
            url: "/allResponsible",
            icon: UsersRound,
          },

          {
            title: "Managers",
            url: "/allManagers",
            icon: Users,
          },
          {
            title: "Last Status",
            url: "/All-Last-Status",
            icon: Users,
          },
          {
            title: "Last Exam Mode",
            url: "/all-Exam-Mode",
            icon: Users,
          },

        ]);
      }
      else if (a.role == 2) {
        setsidebarlinks([
          {
            title: "Students",
            url: "/allStudents",
            icon: SquareUserRound,
          },
          {
            title: "Responsible",
            url: "/allResponsible",
            icon: UsersRound,
          },




        ]);
      }
      else if (a.role == 3) {
        setsidebarlinks([
          {
            title: "Students",
            url: "/allStudents",
            icon: SquareUserRound,
          },
         

          {
            title: "Managers",
            url: "/allManagers",
            icon: Users,
          },


        ]);
      }

    }
    else {
      navigator("/");

    }
  }



  useEffect(() => {
    CheckLogin();

  }, [])






  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu>
          {sidebarLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={`flex items-center gap-4 p-3 rounded-md transition-all duration-200 group ${activeTab === item.url
                    ? "bg-indigo-500 text-white shadow-md"
                    : "hover:shadow-md hover:!bg-[#ea4576]"
                    }`}
                >
                  <item.icon
                    className={`transition-transform duration-300 ${activeTab === item.url
                      ? "scale-125"
                      : "group-hover:scale-110 group-hover:rotate-6"
                      }`}
                  />
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default MainSidebar;

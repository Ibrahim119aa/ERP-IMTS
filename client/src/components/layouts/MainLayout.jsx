import MainHeader from "../MainHeader";
import MainSidebar from "../MainSidebar";
import { SidebarProvider } from "../ui/sidebar";

const MainLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <MainSidebar />
      {/* <div className="flex flex-col w-full"> */}

      <main className="flex flex-col w-full h-screen overflow-hidden">
        <MainHeader />
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto p-2">
          {children}
        </div>
      </main>
      {/* </div> */}
    </SidebarProvider>
  );
};

export default MainLayout;

import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="overflow-y-auto bg-[#FBFBFB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
